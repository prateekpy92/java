package com.techlabs.insurance.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.techlabs.insurance.entity.Agent;
import com.techlabs.insurance.entity.Claim;
import com.techlabs.insurance.entity.Customer;

public interface ClaimRepository extends JpaRepository<Claim, Long> {

	static Page<Customer> findByAgent(Agent agent, Pageable pageable) {
		
		return null;
	}
}

