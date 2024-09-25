package com.techlabs.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.techlabs.insurance.entity.InsuranceScheme;

public interface InsuranceSchemeRepository extends JpaRepository<InsuranceScheme,Long>{

}
