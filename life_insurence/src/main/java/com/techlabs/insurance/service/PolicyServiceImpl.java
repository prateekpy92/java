package com.techlabs.insurance.service;

import java.time.LocalDate;
import java.util.ArrayList;

import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import com.techlabs.insurance.dto.AccountDto;
import com.techlabs.insurance.dto.CustomerGetDto;
import com.techlabs.insurance.dto.CustomerPostDto;
import com.techlabs.insurance.dto.DocumentDto;
import com.techlabs.insurance.dto.GetPolicyDto;
import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.dto.NomineeDto;
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
import com.techlabs.insurance.exception.InsuranceException;
import com.techlabs.insurance.mapper.PolicyMapper;
import com.techlabs.insurance.repository.AgentRepository;
import com.techlabs.insurance.repository.CustomerRepository;
import com.techlabs.insurance.repository.InsurancePolicyRepository;
import com.techlabs.insurance.repository.InsuranceSchemeRepository;
import com.techlabs.insurance.repository.LoginRepository;
import com.techlabs.insurance.repository.PaymentRepository;
import com.techlabs.insurance.repository.PolicyRepository;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;

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
	private InsurancePolicyRepository insurancePolicyRepository;

	@Override
	public Message savePolicy(PostPolicyDto postPolicyDto) {
	    Customer customerDb = null;
	    List<Customer> customers = customerRepository.findAll();

	    for (Customer customer : customers) {
	        if (postPolicyDto.getUsername().equals(customer.getLogin().getUsername())) {
	            customerDb = customer;
	            break;
	        }
	    }

	    if (customerDb == null) {
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
	            agent.setTotalCommission(agent.getTotalCommission() +
	                    (postPolicyDto.getInvestMent() * insuranceScheme.getSchemeDetail().getRegistrationCommRatio()) / 100);
	        }
	    }

	    InsurancePolicy insurancePolicy = new InsurancePolicy();
	    int premiumTime = 0;

	    switch (postPolicyDto.getPremiumType()) {
	        case 12:
	            insurancePolicy.setPremiumType(PremiumType.MONTHLY);
	            premiumTime = 1;
	            break;
	        case 2:
	            insurancePolicy.setPremiumType(PremiumType.HALF_YEARLY);
	            premiumTime = 6;
	            break;
	        case 4:
	            insurancePolicy.setPremiumType(PremiumType.QUARTERLY);
	            premiumTime = 3;
	            break;
	        case 1:
	            insurancePolicy.setPremiumType(PremiumType.YEARLY);
	            premiumTime = 12;
	            break;
	        default:
	            throw new InsuranceException("Premium type not matched");
	    }

	    double premiumAmount = postPolicyDto.getInvestMent() / (postPolicyDto.getDuration() * postPolicyDto.getPremiumType());
	    insurancePolicy.setPremiumAmount(premiumAmount);

	    double sumAssured = postPolicyDto.getInvestMent() + 
	            (postPolicyDto.getInvestMent() * insuranceScheme.getSchemeDetail().getProfitRatio()) / 100;
	    insurancePolicy.setSumAssured(sumAssured);

	    Calendar calendar = Calendar.getInstance();
	    calendar.add(Calendar.YEAR, postPolicyDto.getDuration());
	    Date maturityDate = calendar.getTime();

	    insurancePolicy.setMaturityDate(maturityDate);
	    insurancePolicy.setInsuranceScheme(insuranceScheme);
	    insurancePolicy.setAgent(agent);

	    // Set the customer in the insurance policy
	    insurancePolicy.setCustomer(customerDb); // This line ensures that the customer ID is stored

	    List<Nominee> nominees = new ArrayList<>();
	    for (NomineeDto nomineeDto : postPolicyDto.getNominees()) {
	        Nominee nominee = new Nominee();
	        nominee.setNomineeName(nomineeDto.getNomineeName());
	        nominee.setRelationship(nomineeDto.getNomineeRelation());
	        nominees.add(nominee);
	    }

	    insurancePolicy.setNominees(nominees);

	    List<Payment> payments = new ArrayList<>();
	    double numberOfPayments = Math.ceil(postPolicyDto.getInvestMent() / premiumAmount);
	    Calendar paymentCalendar = Calendar.getInstance();

	    for (int i = 0; i < numberOfPayments; i++) {
	        Payment payment = new Payment();
	        payment.setCustomer(customerDb);
	        payment.setPolicy(insurancePolicy);

	        double roundedAmount = Math.round(premiumAmount * 100.0) / 100.0;
	        payment.setAmount(roundedAmount);

	        if (i != 0) {
	            paymentCalendar.add(Calendar.MONTH, premiumTime);
	        }

	        payment.setPaymentDate(paymentCalendar.getTime());
	        payments.add(payment);
	    }

	    insurancePolicy.setPayments(payments);
	    insurancePolicy.setStatus(PolicyStatus.PENDING);

	    Set<SubmittedDocument> documents = new HashSet<>();
	    for (DocumentDto documentDto : postPolicyDto.getDocs()) {
	        SubmittedDocument document = new SubmittedDocument();
	        document.setDocumentName(documentDto.getDocumentName());
	        document.setDocumentImage(documentDto.getDocumentImage());
	        document.setDocumentStatus(DocumentStatus.PENDING);
	        documents.add(document);
	    }

	    insurancePolicy.setSubmittedDocuments(documents);
	    insurancePolicy.setIssueDate(LocalDate.now());
	    customerDb.getPolicies().add(insurancePolicy);

	    customerRepository.save(customerDb);

	    return new Message(HttpStatus.OK, "Policy successfully added to " + customerDb.getUserDetails().getFirstName());
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

		List<InsurancePolicy> policies = customer.getPolicies();

		List<GetPolicyDto> policyList = new ArrayList<>();

		for (InsurancePolicy insurancePolicy : policies) {

			GetPolicyDto getPolicyDto = new GetPolicyDto();

			getPolicyDto.setDocuments(insurancePolicy.getSubmittedDocuments());
			
			getPolicyDto.setNominees(insurancePolicy.getNominees().stream().map(nominee -> convertNomineeDto(nominee))
					.collect(Collectors.toList()));
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

		return policyList;
	}

//	private PaymentDto convertPaymentDto(Payment payment) {
//	    PaymentDto paymentDto = new PaymentDto();
//
//	    
//	    if (payment == null) {
//	        throw new IllegalArgumentException("Payment object cannot be null");
//	    }
//
//	   	    if (payment.getCustomer() != null) {
//	        paymentDto.setUsername(payment.getCustomer().getUsername());
//	    } else {
//	        paymentDto.setUsername("UNKNOWN");
//	    }
//
//	    
//	    if (payment.getPolicy() != null) {
//	        paymentDto.setPolicyId(payment.getPolicy().getPolicyNo());
//	    } else {
//	        paymentDto.setPolicyId(0);
//	    }
//
//	    
//	    paymentDto.setPaymentId(payment.getPaymentId());
//
//	   
//	    if (payment.getPaymentType() != null) {
//	        paymentDto.setPaymentType(payment.getPaymentType().name());
//	    } else {
//	        paymentDto.setPaymentType("UNKNOWN");
//	    }
//
//	   
//	    paymentDto.setAmount(payment.getAmount());
//	    paymentDto.setCardNumber(payment.getCardNumber());
//	    paymentDto.setCvv(payment.getCvv());
//	    paymentDto.setExpiry(payment.getExpiry());
//
//	    return paymentDto;
//	}


	private NomineeDto convertNomineeDto(Nominee nominee) {

		NomineeDto nomineeDto = new NomineeDto();
		nomineeDto.setNomineeName(nominee.getNomineeName());
		nomineeDto.setNomineeRelation(nominee.getRelationship());
		return nomineeDto;

	}

//	
	@Override
	public Message payment(PaymentDto paymentDto) {
	    CustomerGetDto customerPostDto = customerService.getcustomerByUsername(paymentDto.getUsername());

	    Optional<Customer> customerDb = customerRepository.findById(customerPostDto.getId());

	    if (!customerDb.isPresent()) {
	        throw new InsuranceException("Customer Not Found");
	    }

	    Customer customer = customerDb.get();
	    List<InsurancePolicy> policies = customer.getPolicies();

	    InsurancePolicy insurancePolicy = null;

	    for (InsurancePolicy policy : policies) {
	        if (policy.getPolicyNo().equals(paymentDto.getPolicyId())) {
	            insurancePolicy = policy;
	            break;
	        }
	    }

	    if (insurancePolicy == null) {
	        throw new InsuranceException("Policy not found");
	    }

	    // Activate policy when first payment is processed (conditional activation)
	    if (insurancePolicy.getStatus() != PolicyStatus.ACTIVE) {
	        // Example: If the policy is being paid for the first time, activate it
	        insurancePolicy.setStatus(PolicyStatus.ACTIVE);
	    }

	    List<Payment> payments = insurancePolicy.getPayments();
	    Payment paymentDb = null;

	    for (Payment payment : payments) {
	        if (payment.getPaymentId() == paymentDto.getPaymentId()) {
	            paymentDb = payment;
	            break;
	        }
	    }

	    if (paymentDb == null) {
	        throw new InsuranceException("Payment Not Found");
	    }

	    if (paymentDb.getAmount() != paymentDto.getAmount()) {
	        throw new InsuranceException("Payment Amount does not match");
	    }

	    if (paymentDb.getPaymentStatus().equals(PaymentStatus.PAID)) {
	        throw new InsuranceException("Payment already processed");
	    }

	    // Update payment details
	    paymentDb.setAmount(paymentDto.getAmount());
	    paymentDb.setCardNumber(paymentDto.getCardNumber());
	    paymentDb.setCvv(paymentDto.getCvv());
	    paymentDb.setExpiry(paymentDto.getExpiry());
	    paymentDb.setPaymentStatus(PaymentStatus.PAID);
	    paymentDb.setPaymentType(PaymentType.valueOf(paymentDto.getPaymentType()));

	    // Update the total payment amount
	    double totalPayment = Math.round(paymentDb.getTotalPayment() * 100.0) / 100.0;
	    double premium = Math.round(paymentDto.getAmount() * 100.0) / 100.0;
	    paymentDb.setTotalPayment(totalPayment + premium);

	    // Update agent's commission
	    Agent agent = insurancePolicy.getAgent();
	    if (agent != null) {
	        double commissionAmount = (paymentDto.getAmount() * insurancePolicy.getInsuranceScheme().getSchemeDetail().getInstallmentCommRatio()) / 100;
	        Commission commission = new Commission();
	        commission.setAmount(commissionAmount);
	        commission.setCommisionType(CommissionType.INSTALMENT.toString());

	        double currentCommission = Math.round(agent.getTotalCommission() * 100.0) / 100.0;
	        agent.setTotalCommission(currentCommission + commissionAmount);
	        agent.getCommissions().add(commission);
	    }

	    insurancePolicy.setAgent(agent);
	    policyRepository.save(insurancePolicy);

	    return new Message(HttpStatus.OK, "Payment successful, policy is now active");
	}

	
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
			
			getPolicyDto.setNominees(insurancePolicy.getNominees().stream().map(nominee -> convertNomineeDto(nominee))
					.collect(Collectors.toList()));
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
		if (policyList.isEmpty())
			throw new InsuranceException("No policy pending!");
		return policyList;
	}

	@Override
	public List<Payment> getpayments(Long policyId) {
		Optional<InsurancePolicy> policy = policyRepository.findById(policyId);
		if (!policy.isPresent()) {
			throw new InsuranceException("policy not exists!");
		}
		InsurancePolicy p = policy.get();

		return p.getPayments();
	}

	@Override
	public Message aproovPolicy(Long policyId) {
		Optional<InsurancePolicy> policy = policyRepository.findById(policyId);

		if (!policy.isPresent()) {
			throw new InsuranceException("Policy not founded!");
		}
		InsurancePolicy p = policy.get();

		if (p.getStatus().equals(PolicyStatus.ACTIVE)) {
			throw new InsuranceException("policy Already aprooved!");
		}
		Set<SubmittedDocument> docs = p.getSubmittedDocuments();
		for (SubmittedDocument d : docs) {
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
		Optional<InsurancePolicy> policy = policyRepository.findById(policyId);

		if (!policy.isPresent()) {
			throw new InsuranceException("Policy not founded!");
		}
		InsurancePolicy p = policy.get();

		if (p.getStatus().equals(PolicyStatus.REJECT)) {
			throw new InsuranceException("Policy Already Rejected!");
		}
		Set<SubmittedDocument> docs = p.getSubmittedDocuments();
		for (SubmittedDocument d : docs) {
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
		Optional<InsurancePolicy> insurancePolicyDb = policyRepository.findById(policyClaimDto.getPolicyId());

		InsurancePolicy insurancePolicy = null;

		if (insurancePolicyDb.isPresent()) {
			insurancePolicy = insurancePolicyDb.get();
		}

		if (insurancePolicy == null) {
			throw new InsuranceException("policy not found");
		}

		if (insurancePolicy.getStatus() == PolicyStatus.PENDING) {
			throw new InsuranceException("policy not Active");
		}

		List<Payment> payments = insurancePolicy.getPayments();

		double amount = 0;
		boolean flag = false;

		for (Payment payment : payments) {
			if (payment.getPaymentStatus() == PaymentStatus.PAID) {
				amount += payment.getAmount();
			} else {
				flag = true;
			}
		}

		if (insurancePolicy.getSumAssured() < policyClaimDto.getClaimAmount()) {
			throw new InsuranceException("Claim amount must be less than paid amounts");
		}

		if (flag) {
			insurancePolicy.setStatus(PolicyStatus.DROP);
		}

		if (!flag) {
			insurancePolicy.setStatus(PolicyStatus.COMPLETE);
		}

		Claim claim = new Claim();

		if (flag)
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

		return new Message(HttpStatus.OK, "Policy Claimed");

	}

	@Override
	public Page<AccountDto> getAllAccounts(Pageable pageable) {
		List<Customer> customers = customerRepository.findAll();

		List<AccountDto> ac = new ArrayList<>();

		for (Customer ct : customers) {
			if (ct.getPolicies().size() != 0) {
				for (InsurancePolicy p : ct.getPolicies()) {
					ac.add(PolicyMapper.policyToAccountDto(p, ct));
				}
			}
		}

		int start = (int) pageable.getOffset();
		int end = Math.min((start + pageable.getPageSize()), ac.size());
		Page<AccountDto> allPolicies = new PageImpl<>(ac.subList(start, end), pageable, ac.size());

		return allPolicies;
	}

	
	@Override
	public Message withdrawPolicy(Long policyNo) {
	    Optional<InsurancePolicy> policyOptional = policyRepository.findById(policyNo);

	    if (!policyOptional.isPresent()) {
	        throw new InsuranceException("Policy not found!");
	    }

	    InsurancePolicy policy = policyOptional.get();

	     if (policy.getStatus() != PolicyStatus.ACTIVE) {
	        throw new InsuranceException("Only active policies can be withdrawn!");
	    }

	   
	    policy.setStatus(PolicyStatus.WITHDRAWN); 

	    return new Message(HttpStatus.OK, "Policy successfully withdrawn!");
	}

	@Override
	public Page<Customer> getCustomersByAgentId(long agentId, Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<Customer> getCustomersByAgentUsername(String agentUsername, Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	
	@Override
	public List<Payment> getPaymentsForCustomer(Long policyId, Long customerId) {
		
		return null;
	}

	public Long processPolicyPurchase(PolicyClaimDto policyClaimDto, Long customerId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Message processPayment(PaymentDto paymentDto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<PaymentDto> getPayments(String username) {
		// TODO Auto-generated method stub
		return null;
	}

	

}
