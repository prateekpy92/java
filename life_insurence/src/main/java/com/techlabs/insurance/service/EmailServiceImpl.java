package com.techlabs.insurance.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.techlabs.insurance.dto.EmailSenderDto;
import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.entity.UserDetails;
import com.techlabs.insurance.repository.UserDetailsRepository;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Override
    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

	@Override
	public Message sendSimpleEmail(EmailSenderDto emailSenderDto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
    public void sendAnswerEmail(String username, String question, String answer) {
        String userEmail = getEmailByUsername(username);

        if (userEmail != null) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(userEmail);
            message.setSubject("Answer to Your Question");
            message.setText("Your question: " + question + "\n\nAnswer: " + answer);
            mailSender.send(message);
        } else {
            System.err.println("Email not found for user: " + username);
        }
    }

    private String getEmailByUsername(String username) {
        UserDetails user = userDetailsRepository.findByUsername(username);
        return user != null ? user.getEmail() : null; // Assuming User has getEmail method
    }


}
