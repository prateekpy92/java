package com.techlabs.insurance.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techlabs.insurance.dto.CustomerReportDTO;
import com.techlabs.insurance.dto.InstallmentReportDTO;
import com.techlabs.insurance.dto.PolicyReportDTO;
import com.techlabs.insurance.entity.Customer;
import com.techlabs.insurance.entity.InsurancePolicy;
import com.techlabs.insurance.entity.Payment;
import com.techlabs.insurance.exception.InsuranceException;
import com.techlabs.insurance.repository.CustomerRepository;

@Service
public class CustomerReportServiceImpl implements CustomerReportService {
    @Autowired
    private CustomerRepository customerRepository;

    public CustomerReportDTO generateCustomerReport(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new InsuranceException("Customer not found"));

        CustomerReportDTO report = new CustomerReportDTO();
        report.setCustomerName(customer.getUserDetails().getFirstName() + " " + customer.getUserDetails().getLastName());
        report.setPhone(customer.getUserDetails().getMobileNumber());
        report.setEmail(customer.getUserDetails().getEmail());
       // report.setCity(customer.getUserDetails().getCity());
       // report.setState(customer.getUserDetails().getState());

        List<PolicyReportDTO> policies = customer.getPolicies().stream()
            .map(policy -> {
                PolicyReportDTO policyDto = new PolicyReportDTO();
                policyDto.setPolicyId(policy.getPolicyNo()); // Assuming this is correct
                policyDto.setPolicyName(policy.getInsuranceScheme() != null ? policy.getInsuranceScheme().getSchemeName() : "Unknown Scheme"); // Assuming PolicyName is derived from InsuranceScheme
                policyDto.setPremiumAmount(policy.getPremiumAmount());
                policyDto.setSumAssured(policy.getSumAssured());
                policyDto.setMaturityDate(policy.getMaturityDate());
                policyDto.setPremiumType(policy.getPremiumType() != null ? policy.getPremiumType().name() : "Unknown"); // Convert enum to String

                List<InstallmentReportDTO> installments = policy.getPayments().stream()
                	    .map(payment -> {
                	        InstallmentReportDTO installmentDto = new InstallmentReportDTO();
                	        installmentDto.setInstallmentNo(payment.getPaymentId().intValue()); // Convert Long to int if necessary
                	        installmentDto.setDueDate(payment.getPaymentDate()); // Assuming PaymentDate maps to DueDate
                	        installmentDto.setAmountDue(payment.getAmount()); // Assuming Amount maps to AmountDue
                	        installmentDto.setStatus(payment.getPaymentStatus()); // Directly set the PaymentStatus enum
                	        return installmentDto;
                	    }).collect(Collectors.toList());
                
                
                policyDto.setInstallments(installments);
                return policyDto;
            }).collect(Collectors.toList());

        report.setPolicies(policies);
        return report;
    }

	@Override
	public CustomerReportDTO getCustomerReportById(Long customerId) {
		// TODO Auto-generated method stub
		return null;
	}
}
