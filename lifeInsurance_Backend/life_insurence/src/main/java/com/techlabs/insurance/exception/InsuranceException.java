package com.techlabs.insurance.exception;

import java.io.IOException;

public class InsuranceException extends RuntimeException {
	
	private String message;
	
	
	public InsuranceException(String message)
	{
		super(message);
		this.message=message;
	}
	
	public InsuranceException(String string, Exception e) {
		// TODO Auto-generated constructor stub
	}

	public String getMessage()
	{
		return message;
	}

}
