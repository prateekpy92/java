package com.techlabs.insurance.service;
import java.util.List;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.techlabs.insurance.dto.AccountDto;
import com.techlabs.insurance.dto.GetPolicyDto;
import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.dto.PaymentDto;
import com.techlabs.insurance.dto.PolicyClaimDto;
import com.techlabs.insurance.dto.PostPolicyDto;
import com.techlabs.insurance.entity.Customer;
import com.techlabs.insurance.entity.Payment;

public interface PolicyService
{
	
	Message savePolicy(PostPolicyDto postPolicyDto);

	List<GetPolicyDto> getPolices(String username);

	//Message payment(PaymentDto paymentDto);

	List<GetPolicyDto> getPendingPolices();

	List<Payment> getpayments(Long policyId);

	Message aproovPolicy(Long policyId);

	Message rejectPolicy(Long policyId);

	Message policyClaim(PolicyClaimDto policyClaimDto);

	Page<AccountDto> getAllAccounts(Pageable pageable);

	 Page<Customer> getCustomersByAgentId(long agentId, Pageable pageable);

	static List<PaymentDto> getpayments(String username) {
		// TODO Auto-generated method stub
		return null;
	}

	Page<Customer> getCustomersByAgentUsername(String agentUsername, Pageable pageable);

	Message withdrawPolicy(Long policyNo);

	List<Payment> getPaymentsForCustomer(Long policyId, Long customerId);

	
}