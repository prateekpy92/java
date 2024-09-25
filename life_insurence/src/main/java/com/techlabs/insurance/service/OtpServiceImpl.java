package com.techlabs.insurance.service;

import java.time.LocalDateTime;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techlabs.insurance.entity.OtpEntity;
import com.techlabs.insurance.repository.OtpRepository;

@Service
public class OtpServiceImpl implements OtpService {

    private static final Logger logger = LoggerFactory.getLogger(OtpServiceImpl.class);

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private EmailService emailService;

    private static final int OTP_LENGTH = 4;

    @Override
    public String generateOtp() {
        Random random = new Random();
        int otp = random.nextInt((int) Math.pow(10, OTP_LENGTH));
        return String.format("%0" + OTP_LENGTH + "d", otp);
    }

    @Override
    public void sendOtpToEmail(String email) {
        String otp = generateOtp();

        // Store OTP in the database
        OtpEntity otpEntity = new OtpEntity();
        otpEntity.setEmail(email);
        otpEntity.setOtp(otp);
        otpEntity.setCreatedAt(LocalDateTime.now());
        otpRepository.save(otpEntity);

        // Send email (using EmailService)
        String subject = "OTP for Password Reset";
        String message = "Your OTP for password reset is: " + otp;
        try {
            emailService.sendEmail(email, subject, message);
        } catch (Exception e) {
            logger.error("Failed to send OTP email to {}. Exception: {}", email, e.getMessage());
        }
    }
}
