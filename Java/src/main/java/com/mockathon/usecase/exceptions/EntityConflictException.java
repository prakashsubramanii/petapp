package com.mockathon.usecase.exceptions;

public class EntityConflictException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	public EntityConflictException(){
		super();
	}
	
	public EntityConflictException(String message){
		super(message);
	}
	
	public EntityConflictException(Throwable cause) {
		super(cause);
	}
}
