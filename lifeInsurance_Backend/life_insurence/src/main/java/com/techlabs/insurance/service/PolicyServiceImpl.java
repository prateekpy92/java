package com.techlabs.insurance.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.paypal.base.rest.PayPalRESTException;
import com.techlabs.insurance.dto.AccountDto;
import com.techlabs.insurance.dto.CustomerGetDto;
import com.techlabs.insurance.dto.DocumentDto;
import com.techlabs.insurance.dto.GetPolicyDto;
import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.dto.PaymentDto;
import com.techlabs.insurance.dto.PaymentStatus;
import com.techlabs.insurance.dto.PolicyClaimDto;
import com.techlabs.insurance.dto.PostPolicyDto;
import com.techlabs.insurance.entity.Agent;
import com.techlabs.insurance.entity.Claim;
import com.techlabs.insurance.entity.ClaimStatus;
import com.techlabs.insurance.entity.Commission;
import com.techlabs.insurance.entity.CommissionType;
import com.techlabs.insurance.entity.Customer;
import com.techlabs.insurance.entity.DocumentStatus;
import com.techlabs.insurance.entity.InsurancePolicy;
import com.techlabs.insurance.entity.InsuranceScheme;
import com.techlabs.insurance.entity.Login;
import com.techlabs.insurance.entity.Nominee;
import com.techlabs.insurance.entity.Payment;
import com.techlabs.insurance.entity.PaymentType;
import com.techlabs.insurance.entity.PolicyStatus;
import com.techlabs.insurance.entity.PremiumType;
import com.techlabs.insurance.entity.SubmittedDocument;
import com.techlabs.insurance.entity.UserDetails;
import com.techlabs.insurance.exception.InsuranceException;
import com.techlabs.insurance.mapper.PolicyMapper;
import com.techlabs.insurance.repository.AgentRepository;
import com.techlabs.insurance.repository.CustomerRepository;
import com.techlabs.insurance.repository.InsuranceSchemeRepository;
import com.techlabs.insurance.repository.PaymentRepository;
import com.techlabs.insurance.repository.PolicyRepository;
import com.techlabs.insurance.repository.UserDetailsRepository;

@Service
public class PolicyServiceImpl implements PolicyService {

		@Autowired
		private CustomerRepository customerRepository;
		@Autowired
		private InsuranceSchemeRepository insuranceSchemeRepository;
		@Autowired
		private CustomerService customerService;
		@Autowired
		private AgentRepository agentRepository;
		@Autowired
		private PaymentRepository paymentRepository;
		@Autowired
		private PolicyRepository policyRepository;

		 @Autowired
		    private PaypalService paypalService; 
		 
		@Override
		public Message savePolicy(PostPolicyDto postPolicyDto) {
			
			Customer customerDb=null;
			List<Customer>log = customerRepository.findAll();
			for(Customer lg:log)
			{
				if(postPolicyDto.getUsername().equals(lg.getLogin().getUsername()))
				{
					customerDb= lg ;
				}
			}


			if (customerDb==null) {
				
				throw new InsuranceException("Customer Not Found");
			}

			Optional<InsuranceScheme> insuranceSchemeDb = insuranceSchemeRepository.findById(postPolicyDto.getSchemeId());

			if (!insuranceSchemeDb.isPresent()) {
				throw new InsuranceException("Scheme Not Found");
			}

			InsuranceScheme insuranceScheme = insuranceSchemeDb.get();

			Agent agent = null;

			if (postPolicyDto.getAgentId() != 0) {

				Optional<Agent> agentDb = agentRepository.findById(postPolicyDto.getAgentId());

				if (agentDb.isPresent()) {
					agent = agentDb.get();
					agent.setTotalCommission(agent.getTotalCommission()+(postPolicyDto.getInvestMent()*insuranceScheme.getSchemeDetail().getRegistrationCommRatio())/100);
				}

			}
			

			InsurancePolicy insurancePolicy = new InsurancePolicy();
			
			int premiumTime=0;

			if (postPolicyDto.getPremiumType() == 12) {
				insurancePolicy.setPremiumType(PremiumType.MONTHLY);
				premiumTime=1;
			} else if (postPolicyDto.getPremiumType() == 2) {
				insurancePolicy.setPremiumType(PremiumType.HALF_YEARLY);
				premiumTime=6;
			} else if (postPolicyDto.getPremiumType() == 4) {
				insurancePolicy.setPremiumType(PremiumType.QUARTERLY);
				premiumTime=3;
			} else if (postPolicyDto.getPremiumType() == 1) {
				insurancePolicy.setPremiumType(PremiumType.YEARLY);
				premiumTime=12;
			} else {
				throw new InsuranceException("Premium type not matched");
			}

			double premiumAmount = (postPolicyDto.getInvestMent())
					/ (postPolicyDto.getDuration() * postPolicyDto.getPremiumType());
			insurancePolicy.setPremiumAmount(premiumAmount);

			double sumAssured = postPolicyDto.getInvestMent()
					+ (postPolicyDto.getInvestMent() * insuranceScheme.getSchemeDetail().getProfitRatio()) / 100;
			insurancePolicy.setSumAssured(sumAssured);


			Calendar calendar = Calendar.getInstance();
			calendar.add(Calendar.YEAR, postPolicyDto.getDuration());

			Date maturityDate = calendar.getTime();
			

			insurancePolicy.setMaturityDate(maturityDate);

			insurancePolicy.setInsuranceScheme(insuranceScheme);

			insurancePolicy.setAgent(agent);

			List<Nominee> nominees = new ArrayList<>();

			for (int i = 0; i < postPolicyDto.getNominees().size(); i++) {

				Nominee nominee = new Nominee();
				nominee.setNomineeName(postPolicyDto.getNominees().get(i).getNomineeName());
				nominee.setRelationship(postPolicyDto.getNominees().get(i).getNomineeRelation());
				nominees.add(nominee);

			}

			insurancePolicy.setNominees(nominees);

			List<Payment> paylist = new ArrayList<>();
			double payments = Math.ceil(postPolicyDto.getInvestMent() / premiumAmount);
			Calendar cal = Calendar.getInstance();
			for (int i = 0; i < payments; i++) {
				Payment payment = new Payment();
				
				double roundedamount = Math.round(premiumAmount * 100.0) / 100.0;
				payment.setAmount(roundedamount);
				if (i != 0) {
					cal.add(Calendar.MONTH, premiumTime);
					Date d = cal.getTime();
					payment.setPaymentDate(d);
				}
				else {
					cal.add(Calendar.MONTH, 0);
					Date d = cal.getTime();
					payment.setPaymentDate(d);
				}
				paylist.add(payment);
			}
			
			insurancePolicy.setPayments(paylist);
			insurancePolicy.setStatus(PolicyStatus.PENDING);
			
			Set<SubmittedDocument>documents=new HashSet();
			insurancePolicy.setStatus(PolicyStatus.PENDING);
			for(DocumentDto documentDto: postPolicyDto.getDocs()) {
				SubmittedDocument document= new SubmittedDocument();
				document.setDocumentName(documentDto.getDocumentName());
				document.setDocumentImage(documentDto.getDocumentImage());
				document.setDocumentStatus(DocumentStatus.PENDING);
				documents.add(document);
				
			}
			
			insurancePolicy.setSubmittedDocuments(documents);
			
			customerDb.getPolicies().add(insurancePolicy);
			
			customerRepository.save(customerDb);

			return new Message(HttpStatus.OK,"Policy successfully added to "+customerDb.getUserDetails().getFirstName());
		}

		@Override
		public List<GetPolicyDto> getPolices(String username) {
			
			CustomerGetDto customerGetDto = customerService.getcustomerByUsername(username);

			Optional<Customer> customerDb = customerRepository.findById(customerGetDto.getId());

			Customer customer = new Customer();

			if (customerDb.isPresent()) {
				customer = customerDb.get();
			} else {
				throw new InsuranceException("Customer Not Found");
			}
			
			List<InsurancePolicy>policies=customer.getPolicies();
			
			List<GetPolicyDto>policyList=new ArrayList<>();
			
			for(InsurancePolicy insurancePolicy:policies) {
				
				GetPolicyDto getPolicyDto=new GetPolicyDto();
				
				getPolicyDto.setDocuments(insurancePolicy.getSubmittedDocuments());
				getPolicyDto.setPayments(insurancePolicy.getPayments());
				getPolicyDto.setNominees(insurancePolicy.getNominees());
				getPolicyDto.setInvestmentAmount(insurancePolicy.getPremiumAmount()*insurancePolicy.getPayments().size());
				getPolicyDto.setIssueDate(insurancePolicy.getIssueDate());
				getPolicyDto.setMaturityDate(insurancePolicy.getMaturityDate());
				getPolicyDto.setPolicyId(insurancePolicy.getPolicyNo());
				getPolicyDto.setPolicyStatus(insurancePolicy.getStatus());
				getPolicyDto.setPremiumAmount(insurancePolicy.getPremiumAmount());
				getPolicyDto.setProfitAmount(insurancePolicy.getSumAssured()-getPolicyDto.getInvestmentAmount());
				getPolicyDto.setPremiumType(insurancePolicy.getPremiumType());
				getPolicyDto.setScheme(insurancePolicy.getInsuranceScheme());
				getPolicyDto.setSumAssured(insurancePolicy.getSumAssured());
				
				policyList.add(getPolicyDto);
			}
			
			return policyList;
		}

//		@Override
//		public Message payment(PaymentDto paymentDto) {
//			CustomerGetDto customerPostDto = customerService.getcustomerByUsername(paymentDto.getUsername());
//
//			Optional<Customer> customerDb = customerRepository.findById(customerPostDto.getId());
//
//			Customer customer = new Customer();
//
//			if (customerDb.isPresent()) {
//				customer = customerDb.get();
//			} else {
//				throw new InsuranceException("Customer Not Found");
//			}
//
//			List<InsurancePolicy> policies = customer.getPolicies();
//
//			InsurancePolicy insurancePolicy = null;
//
//			for (InsurancePolicy insurance : policies) {
//				if (insurance.getPolicyNo() == paymentDto.getPolicyId()) {
//					insurancePolicy = insurance;
//				}
//			}
//
//			if (insurancePolicy == null) {
//				throw new InsuranceException("Policy not found");
//			}
//
//			if (insurancePolicy.getStatus() != PolicyStatus.ACTIVE) {
//				throw new InsuranceException("Policy is not active");
//			}
//
//			List<Payment> payments = insurancePolicy.getPayments();
//
//			Payment paymentDb = null;
//
//			for (Payment payment : payments) {
//				
//				System.out.println(payment);
//
//				if (payment.getPaymentId() == paymentDto.getPaymentId()) {
//					paymentDb = payment;
//				}
//
//			}
//			if(paymentDb.getAmount()!=paymentDto.getAmount()) {
//				System.out.println(paymentDb.getAmount());
//				System.out.println(paymentDto.getAmount());
//				throw new InsuranceException("Payment Not Matched");
//			}
//			if (paymentDb == null) {
//				throw new InsuranceException("Payment Not Found");
//			}
//			if (paymentDb.getPaymentStatus().equals(PaymentStatus.PAID)) {
//				throw new InsuranceException("Premium already paid!");
//			}
//            
//			paymentDb.setAmount(paymentDto.getAmount());
//			paymentDb.setCardNumber(paymentDto.getCardNumber());
//			paymentDb.setCvv(paymentDto.getCvv());
//			paymentDb.setExpiry(paymentDto.getExpiry());
//			paymentDb.setPaymentStatus(PaymentStatus.PAID);
//			paymentDb.setPaymentType(PaymentType.valueOf(paymentDto.getPaymentType()));
//			double total = Math.round(paymentDb.getTotalPayment()* 100.0) / 100.0;
//			double premium = Math.round(paymentDto.getAmount()* 100.0) / 100.0;
//			paymentDb.setTotalPayment(total+premium);
//	
//
//			Agent agent = insurancePolicy.getAgent();
//
//			double commition = insurancePolicy.getInsuranceScheme().getSchemeDetail().getInstallmentCommRatio();
//
//			if (agent != null) {
//				Commission commission=new Commission();
//				commission.setAmount((paymentDto.getAmount()*commition)/100);
//				commission.setCommisionType(CommissionType.INSTALMENT.toString());
//				double a = Math.round(agent.getTotalCommission()* 100.0) / 100.0;
//				double b = Math.round(commission.getAmount()* 100.0) / 100.0;
//				agent.setTotalCommission(a+b);
//				agent.getCommissions().add(commission);
//			}
//               insurancePolicy.setAgent(agent);
//		       policyRepository.save(insurancePolicy);
//
//			return new Message(HttpStatus.OK, "payment success");
//		}
//
//		

		@Override
		public List<GetPolicyDto> getPendingPolices() {
			List<InsurancePolicy> policies = policyRepository.findAll();

			List<GetPolicyDto> policyList = new ArrayList<>();

			for (InsurancePolicy insurancePolicy : policies) {

				if (insurancePolicy.getStatus() != PolicyStatus.PENDING) {
					continue;
				}

				GetPolicyDto getPolicyDto = new GetPolicyDto();

				getPolicyDto.setDocuments(insurancePolicy.getSubmittedDocuments());
				getPolicyDto.setPayments(insurancePolicy.getPayments());
				getPolicyDto.setNominees(insurancePolicy.getNominees());
				getPolicyDto.setInvestmentAmount(insurancePolicy.getPremiumAmount() * insurancePolicy.getPayments().size());
				getPolicyDto.setIssueDate(insurancePolicy.getIssueDate());
				getPolicyDto.setMaturityDate(insurancePolicy.getMaturityDate());
				getPolicyDto.setPolicyId(insurancePolicy.getPolicyNo());
				getPolicyDto.setPolicyStatus(insurancePolicy.getStatus());
				getPolicyDto.setPremiumAmount(insurancePolicy.getPremiumAmount());
				getPolicyDto.setProfitAmount(insurancePolicy.getSumAssured() - getPolicyDto.getInvestmentAmount());
				getPolicyDto.setPremiumType(insurancePolicy.getPremiumType());
				getPolicyDto.setScheme(insurancePolicy.getInsuranceScheme());
				getPolicyDto.setSumAssured(insurancePolicy.getSumAssured());

				policyList.add(getPolicyDto);
				
			}
			if(policyList.isEmpty())
				throw new InsuranceException("No policy pending!");
			return policyList;
		}

		@Override
		public List<Payment> getpayments(Long policyId) {
			Optional<InsurancePolicy> policy = policyRepository.findById(policyId);
			if(!policy.isPresent())
			{
				throw new InsuranceException("policy not exists!");
			}
			InsurancePolicy p = policy.get();
			
			return p.getPayments();
		}

		@Override
		public Message aproovPolicy(Long policyId) {
			Optional<InsurancePolicy>policy = policyRepository.findById(policyId);
			
			if(!policy.isPresent())
			{
				throw new InsuranceException("Policy not founded!");
			}
			InsurancePolicy p =policy.get();
			
			if(p.getStatus().equals(PolicyStatus.ACTIVE))
			{
				throw new InsuranceException("policy Already aprooved!");
			}
			Set<SubmittedDocument>docs = p.getSubmittedDocuments();
			for(SubmittedDocument d:docs)
			{
				d.setDocumentStatus(DocumentStatus.APPROVED);
			}
			p.setSubmittedDocuments(docs);
			p.setStatus(PolicyStatus.ACTIVE);
			policyRepository.save(p);
			
			
			Message msg = new Message();
			msg.setStatus(HttpStatus.OK);
			msg.setMessage("Policy Aprooved!");
			
			return msg;
		}

		@Override
		public Message rejectPolicy(Long policyId) {
        Optional<InsurancePolicy>policy = policyRepository.findById(policyId);
			
			if(!policy.isPresent())
			{
				throw new InsuranceException("Policy not founded!");
			}
			InsurancePolicy p =policy.get();
			
			if(p.getStatus().equals(PolicyStatus.REJECT))
			{
				throw new InsuranceException("Policy Already Rejected!");
			}
			Set<SubmittedDocument>docs = p.getSubmittedDocuments();
			for(SubmittedDocument d:docs)
			{
				d.setDocumentStatus(DocumentStatus.APPROVED);
			}
			p.setSubmittedDocuments(docs);
			p.setStatus(PolicyStatus.REJECT);
			policyRepository.save(p);
			
			
			Message msg = new Message();
			msg.setStatus(HttpStatus.OK);
			msg.setMessage("Policy Rejected!");
			
			return msg;
		}

		@Override
		public Message policyClaim(PolicyClaimDto policyClaimDto) {
			Optional<InsurancePolicy> insurancePolicyDb=policyRepository.findById(policyClaimDto.getPolicyId());
			
			InsurancePolicy insurancePolicy=null;
			
			if(insurancePolicyDb.isPresent()) {
				insurancePolicy=insurancePolicyDb.get();
			}
			
			if(insurancePolicy==null) {
				throw new InsuranceException("policy not found");
			}
			
			if(insurancePolicy.getStatus()==PolicyStatus.PENDING) {
				throw new InsuranceException("policy not Active");
			}
			
			
			List<Payment>payments=insurancePolicy.getPayments();
			
			double amount=0;
			boolean flag=false;
			
			for(Payment payment:payments) {
				if(payment.getPaymentStatus()==PaymentStatus.PAID) {
					amount+=payment.getAmount();
				}
				else {
					flag=true;
				}
			}
			
			if(insurancePolicy.getSumAssured()<policyClaimDto.getClaimAmount()) {
				throw new InsuranceException("Claim amount must be less than paid amounts");
			}
			
			if(flag) {
				insurancePolicy.setStatus(PolicyStatus.DROP);
				}
			
			if(!flag) {
				insurancePolicy.setStatus(PolicyStatus.COMPLETE);
			}
			
			Claim claim=new Claim();
			
			if(flag)
			claim.setClaimAmount(amount);
			else {
				claim.setClaimAmount(insurancePolicy.getSumAssured());
			}
			claim.setStatus(ClaimStatus.PENDING.toString());
			claim.setBankAccountNumber(policyClaimDto.getBankAccountNumber());
			claim.setBankName(policyClaimDto.getBankName());
			claim.setBranchName(policyClaimDto.getBranchName());
			claim.setIfscCode(policyClaimDto.getIfscCode());
			
			insurancePolicy.setClaims(claim);
			
			policyRepository.save(insurancePolicy);
		
			
			return new Message(HttpStatus.OK,"Policy Claimed");
    	
	}

		@Override
		public Page<AccountDto> getAllAccounts(Pageable pageable) {
			List<Customer>customers = customerRepository.findAll();
			
			List<AccountDto>ac=new ArrayList<>();
			
			for(Customer ct:customers)
			{
				if(ct.getPolicies().size()!=0)
				{
					for(InsurancePolicy p:ct.getPolicies())
					{
						ac.add(PolicyMapper.policyToAccountDto(p,ct));
					}
				}
			}

		        int start = (int) pageable.getOffset();
		        int end = Math.min((start + pageable.getPageSize()), ac.size());
		        Page<AccountDto> allPolicies = new PageImpl<>(ac.subList(start, end), pageable, ac.size());

		        return allPolicies;
		}

		
		@Override
		 public Page<Customer> getCustomersByAgentId(long agentId, Pageable pageable) {
		   
		    Optional<Agent> agentOptional = agentRepository.findById(agentId);
		    
		    if (!agentOptional.isPresent()) {
		        throw new InsuranceException("Agent not found");
		    }

		    Agent agent = agentOptional.get();

		  
		    List<Customer> customers = customerRepository.findAll();

		    
		    List<Customer> customersWithPolicies = new ArrayList<>();
		    for (Customer customer : customers) {
		        List<InsurancePolicy> policies = customer.getPolicies();
		        for (InsurancePolicy policy : policies) {
		            if (policy.getAgent() != null && policy.getAgent().getAgentId() == agentId) {
		                customersWithPolicies.add(customer);
		                break; 
		            }
		        }
		    }

		    return customerRepository.findByPoliciesAgentAgentId(agentId, pageable);
		}
//	    @Autowired
//	    private UserDetailsRepository userDetailsRepository;
//
//
//		@Override
//	    public Page<Customer> getCustomersByAgentUsername(String agentUsername, Pageable pageable) {
//	        // Find the login by username
//	        Login login = loginRepository.findByUsername(agentUsername);
//
//	        if (login == null) {
//	            throw new InsuranceException("Login not found for username: " + agentUsername);
//	        }
//
//	        // Find UserDetails using the login information
//	        UserDetails userDetails = userDetailsRepository.findById(login.getAgentId())
//	                .orElseThrow(() -> new InsuranceException("UserDetails not found for login id: " + login.getId()));
//
//	        // Find the agent using UserDetails
//	        Agent agent = agentRepository.findByUserDetailsId(userDetails.getId());
//
//	        if (agent == null) {
//	            throw new InsuranceException("Agent not found for UserDetails id: " + userDetails.getId());
//	        }
//
//	        // Get customers with policies assigned to the given agent
//	        List<Customer> customersWithPolicies = customerRepository.findCustomersByAgentId(agent.getAgentId());
//
//	        // Convert the list to a Page
//	        int start = (int) pageable.getOffset();
//	        int end = Math.min((start + pageable.getPageSize()), customersWithPolicies.size());
//	        Page<Customer> customerPage = new PageImpl<>(customersWithPolicies.subList(start, end), pageable, customersWithPolicies.size());
//
//	        return customerPage;
//	    }

		@Override
		public Page<Customer> getCustomersByAgentUsername(String agentUsername, Pageable pageable) {
			// TODO Auto-generated method stub
			return null;
		}
		@Override
		public Message withdrawPolicy(Long policyId) {
		    Optional<InsurancePolicy> optionalPolicy = policyRepository.findById(policyId);

		    if (!optionalPolicy.isPresent()) {
		        throw new InsuranceException("Policy not found.");
		    }

		    InsurancePolicy insurancePolicy = optionalPolicy.get();

		    if (insurancePolicy.getStatus() != PolicyStatus.ACTIVE) {
		        throw new InsuranceException("Policy cannot be withdrawn because it is not active.");
		    }

		    insurancePolicy.setStatus(PolicyStatus.WITHDRAWN);

		    try {
		        policyRepository.save(insurancePolicy);
		    } catch (Exception e) {
		        throw new InsuranceException("Error updating policy status: " + e.getMessage(), e);
		    }

		    return new Message(HttpStatus.OK, "Policy successfully withdrawn.");
		}
		
		
//		@Override
//		public Message payment(PaymentDto paymentDto) {
//		    // Retrieve customer and policy
//		    CustomerGetDto customerPostDto = customerService.getcustomerByUsername(paymentDto.getUsername());
//		    Optional<Customer> customerDb = customerRepository.findById(customerPostDto.getId());
//
//		    Customer customer = customerDb.orElseThrow(() -> new InsuranceException("Customer Not Found"));
//
//		    InsurancePolicy insurancePolicy = customer.getPolicies().stream()
//		        .filter(policy -> policy.getPolicyNo() == paymentDto.getPolicyId())
//		        .findFirst()
//		        .orElseThrow(() -> new InsuranceException("Policy not found"));
//
//		    if (insurancePolicy.getStatus() != PolicyStatus.ACTIVE) {
//		        throw new InsuranceException("Policy is not active");
//		    }
//
//		    Payment paymentDb = insurancePolicy.getPayments().stream()
//		        .filter(payment -> payment.getPaymentId().equals(paymentDto.getPaymentId()))
//		        .findFirst()
//		        .orElseThrow(() -> new InsuranceException("Payment Not Found"));
//
//		    if (paymentDb.getPaymentStatus().equals(PaymentStatus.PAID)) {
//		        throw new InsuranceException("Premium already paid!");
//		    }
//
//		    // Integrate with PayPal
//		    try {
//		        // Execute payment using PayPal service
//		        com.paypal.api.payments.Payment paypalPayment = paypalService.executePayment(paymentDto.getPaymentId(), paymentDto.getPayerId());
//
//		        // Assuming the status is available in the PayPal Payment object
//		        String paymentStatus = paypalPayment.getState(); // This may vary, consult the PayPal API response structure
//
//		        if ("approved".equalsIgnoreCase(paymentStatus)) {
//		            // Update your local payment entity
//		            paymentDb.setAmount(paymentDto.getAmount());
//		            paymentDb.setCardNumber(paymentDto.getCardNumber());
//		            paymentDb.setCvv(paymentDto.getCvv());
//		            paymentDb.setExpiry(paymentDto.getExpiry());
//		            paymentDb.setPaymentStatus(PaymentStatus.PAID);
//
//		            double total = Math.round(paymentDb.getTotalPayment() * 100.0) / 100.0;
//		            double premium = Math.round(paymentDto.getAmount() * 100.0) / 100.0;
//		            paymentDb.setTotalPayment(total + premium);
//
//		            Agent agent = insurancePolicy.getAgent();
//		            double commissionRate = insurancePolicy.getInsuranceScheme().getSchemeDetail().getInstallmentCommRatio();
//
//		            if (agent != null) {
//		                Commission commission = new Commission();
//		                commission.setAmount((paymentDto.getAmount() * commissionRate) / 100);
//		                commission.setCommisionType(CommissionType.INSTALMENT.toString());
//		                
//		                double updatedCommission = Math.round(agent.getTotalCommission() * 100.0) / 100.0;
//		                double newCommission = Math.round(commission.getAmount() * 100.0) / 100.0;
//		                agent.setTotalCommission(updatedCommission + newCommission);
//		                agent.getCommissions().add(commission);
//		            }
//
//		            insurancePolicy.setAgent(agent);
//		            policyRepository.save(insurancePolicy);
//
//		            return new Message(HttpStatus.OK, "Payment successful");
//		        } else {
//		            throw new InsuranceException("Payment was not approved");
//		        }
//		    } catch (PayPalRESTException e) {
//		        throw new InsuranceException("Error processing PayPal payment: " + e.getMessage(), e);
//		    }
//		}
//		 

//		    public List<Payment> getPaymentsForCustomer(Long policyId, Long customerId) {
//		        Customer customer = customerRepository.findById(customerId).orElseThrow();
//		        customer.get().get
//		        return paymentRepository.findByPolicyIdAndCustomerId(policyId, customerId);
//		    }
}	


