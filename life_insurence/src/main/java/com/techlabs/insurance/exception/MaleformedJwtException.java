package com.techlabs.insurance.exception;

public class MaleformedJwtException extends RuntimeException {
	
	
	public MaleformedJwtException(String message) {
        super(message);
    }

    public MaleformedJwtException(String message, Throwable cause) {
        super(message, cause);
    }

}
