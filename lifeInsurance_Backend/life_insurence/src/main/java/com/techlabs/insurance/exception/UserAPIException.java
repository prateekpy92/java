package com.techlabs.insurance.exception;

import org.springframework.http.HttpStatus;

public class UserAPIException extends RuntimeException{
	
	private String message;
	  public UserAPIException(HttpStatus badRequest, String msg)
	  {
		  super(msg);
		  this.message=msg;
	  }
	  
	  public String getmessage(String msg)
	  {
		  return message;
	  }
		

}
