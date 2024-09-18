package com.techlabs.insurance.repository;

import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.techlabs.insurance.entity.Agent;
import com.techlabs.insurance.entity.InsurencePlan;

public interface InsurancePlanRepository extends JpaRepository<InsurencePlan, Long> {

	Page<InsurencePlan> findByIsactiveTrue(Pageable pageable);

}
