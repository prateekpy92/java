package com.techlabs.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.techlabs.insurance.entity.InsurancePolicy;

public interface PolicyRepository extends JpaRepository<InsurancePolicy, Long>{

}
