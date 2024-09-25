package com.techlabs.insurance.exceptionHandler;

import org.springframework.http.HttpStatus;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.techlabs.insurance.exception.*;
import com.techlabs.insurance.exception.Error;

@ControllerAdvice
	public class ExceptionResponse {
		

		 @ExceptionHandler(InsuranceException.class)
		    public ResponseEntity<Error> handleNameNotValidException(InsuranceException ex) {
		        Exception exception = new Exception();
		        Error error = new Error(HttpStatus.BAD_REQUEST.value(),ex.getMessage(),System.currentTimeMillis());
		        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
		    }
		 
		 @ResponseStatus(HttpStatus.NOT_FOUND)
		 public class ResourceNotFoundException extends RuntimeException {
		     public ResourceNotFoundException(HttpStatus notFound, String message) {
		         super(message);
		     }

}}
