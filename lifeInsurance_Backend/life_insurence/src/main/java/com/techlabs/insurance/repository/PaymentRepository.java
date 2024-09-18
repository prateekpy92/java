package com.techlabs.insurance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.techlabs.insurance.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long>{

	// List<Payment> findByPolicyIdAndCustomerId(Long policyId, Long customerId);

}
