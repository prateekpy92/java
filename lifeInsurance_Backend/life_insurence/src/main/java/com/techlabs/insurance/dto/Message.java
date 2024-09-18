package com.techlabs.insurance.dto;

import org.springframework.http.HttpStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class Message {    
    private HttpStatus status;
    private String message;

	public Message(HttpStatus status, String message) {
		super();
		this.status = status;
		this.message = message;
	}
	
	public Message() {
		super();
		this.message = message;
	}

	public HttpStatus getStatus() {
		return status;
	}
	public void setStatus(HttpStatus status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
    
}
