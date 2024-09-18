package com.techlabs.insurance.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.techlabs.insurance.dto.EmailSenderDto;
import com.techlabs.insurance.dto.Message;

import java.io.File;

@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public Message sendSimpleEmail(EmailSenderDto emailSenderDto) {
    	Message msg = new Message();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(emailSenderDto.getSenderEmail());
        message.setTo(emailSenderDto.getReciverEmail());
        message.setText(emailSenderDto.getBody());
        message.setSubject(emailSenderDto.getSubject());
        mailSender.send(message);
        System.out.println("Mail Send...");
		msg.setStatus(HttpStatus.OK);
		msg.setMessage("Mail sent................");
		return msg;


    }

	

   

    public void sendEmail(String to, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(to);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        mailSender.send(mailMessage);
    }


	@Override
	public void sendEmail(EmailSenderDto emailSenderDto) {
		// TODO Auto-generated method stub
		
	}




}
