package com.techlabs.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.techlabs.insurance.entity.InsurancePolicy;

@Repository
public interface InsurancePolicyRepository extends JpaRepository<InsurancePolicy, Long> {
    // You can define custom query methods here if needed
    
    // Example: Find an InsurancePolicy by its policy number
    InsurancePolicy findByPolicyNo(Long policyNo);
}
