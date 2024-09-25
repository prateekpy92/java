package com.techlabs.insurance.dto;

import java.util.Set;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@ToString
public class EmailSenderDto {
	String reciverEmail;
	String senderEmail;
    String subject;
    String body;
	public String getReciverEmail() {
		return reciverEmail;
	}
	public void setReciverEmail(String reciverEmail) {
		this.reciverEmail = reciverEmail;
	}
	public String getSenderEmail() {
		return senderEmail;
	}
	public void setSenderEmail(String senderEmail) {
		this.senderEmail = senderEmail;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}

}
