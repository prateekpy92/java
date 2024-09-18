package com.techlabs.insurance.service;

public interface PasswordResetService {

	  boolean verifyOtpAndResetPassword(String email, String otp, String newPassword, String confirmPassword);

}
