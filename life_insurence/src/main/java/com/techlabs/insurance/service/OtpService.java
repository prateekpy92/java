package com.techlabs.insurance.service;

public interface OtpService {
	  String generateOtp();
	   void sendOtpToEmail(String email);
	

}
