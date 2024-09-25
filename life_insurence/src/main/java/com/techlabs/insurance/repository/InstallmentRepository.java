package com.techlabs.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.techlabs.insurance.entity.Installment;

public interface InstallmentRepository extends JpaRepository<Installment, Long> {
}
