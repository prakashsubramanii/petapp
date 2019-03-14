package com.mockathon.usecase.util;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RequestMapping;

@ControllerAdvice
@RequestMapping(produces="application/json")
public class ExceptionHandler {

	
	public ResponseEntity<Object>duplicateUserName() {
		return new ResponseEntity<Object>("User name already exists",new HttpHeaders(),HttpStatus.CONFLICT);
	}
}
