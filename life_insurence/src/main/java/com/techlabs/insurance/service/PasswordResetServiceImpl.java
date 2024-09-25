package com.techlabs.insurance.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.techlabs.insurance.entity.Login;
import com.techlabs.insurance.entity.OtpEntity;
import com.techlabs.insurance.repository.LoginRepository;
import com.techlabs.insurance.repository.OtpRepository;

/**
 * Implementation of the PasswordResetService interface.
 */
@Service
public class PasswordResetServiceImpl implements PasswordResetService {

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean verifyOtpAndResetPassword(String email, String otp, String newPassword, String confirmPassword) {
        // Find OTP entity by email and OTP
        OtpEntity otpEntity = otpRepository.findByEmailAndOtp(email, otp);

        if (otpEntity == null) {
            throw new IllegalArgumentException("Invalid OTP");
        }

        // Check if new password and confirm password match
        if (!newPassword.equals(confirmPassword)) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        // Find the user by email (assuming the email is used as username)
      //  Login login = loginRepository.findByUsername(email); // Ensure this method exists in your repository
       // if (login == null) {
          //  throw new IllegalArgumentException("User not found");
       // }

        // Update user password and save
      //  login.setPassword(passwordEncoder.encode(newPassword));
      //  loginRepository.save(login);

        // Optionally, delete the OTP record after successful password reset
        otpRepository.delete(otpEntity);

        return true;
    }
}
