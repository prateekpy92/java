package com.techlabs.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.techlabs.insurance.entity.OtpEntity;



@Repository
public interface OtpRepository extends JpaRepository<OtpEntity, Long> {
    OtpEntity findByEmailAndOtp(String email, String otp);
}