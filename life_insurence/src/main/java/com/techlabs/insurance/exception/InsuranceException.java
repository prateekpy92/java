package com.techlabs.insurance.exception;

public class InsuranceException extends RuntimeException {
	
	private String message;
	
	
	public InsuranceException(String message)
	{
		super(message);
		this.message=message;
	}
	
	public String getMessage()
	{
		return message;
	}

}
