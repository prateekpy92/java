package com.techlabs.insurance.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techlabs.insurance.dto.EmailSenderDto;
import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.service.EmailService;

@RestController
@RequestMapping("insuranceapp")
public class EMailController {
	
	@Autowired
	private EmailService senderService;
	
	@PostMapping("/mail")
	public ResponseEntity<Message> mailsender(@RequestBody EmailSenderDto emailSenderDto) {
		System.out.println("mail dto>>>>>>>>>>>>>>>>>>>"+emailSenderDto);
		Message msg = senderService.sendSimpleEmail(emailSenderDto);
       return new ResponseEntity<>(msg,HttpStatus.OK);
	}

}
