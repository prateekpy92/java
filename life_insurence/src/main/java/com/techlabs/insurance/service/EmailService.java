package com.techlabs.insurance.service;

import com.techlabs.insurance.dto.EmailSenderDto;
import com.techlabs.insurance.dto.Message;

public interface EmailService {

	Message sendSimpleEmail(EmailSenderDto emailSenderDto);

	void sendEmail(String email, String subject, String message);

	void sendAnswerEmail(String username, String question, String answer);
	
}
