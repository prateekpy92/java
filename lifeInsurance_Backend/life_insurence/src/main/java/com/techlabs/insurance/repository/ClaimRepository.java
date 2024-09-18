package com.techlabs.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.techlabs.insurance.entity.Claim;

public interface ClaimRepository extends JpaRepository<Claim, Long> {
}

