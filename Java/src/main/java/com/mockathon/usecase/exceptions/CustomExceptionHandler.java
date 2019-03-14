package com.mockathon.usecase.exceptions;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;


@ControllerAdvice
public class CustomExceptionHandler /*extends ResponseEntityExceptionHandler */{

  @ExceptionHandler(EntityNotFoundException.class)
  public final ResponseEntity<ExceptionResponse> handleUserNotFoundException
  (EntityNotFoundException ex, WebRequest request) {
	  
	  ExceptionResponse errorDetails = new ExceptionResponse(new Date(), request.getDescription(false),ex.getMessage());
    return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    
  }
  
  @ExceptionHandler(EntityConflictException.class)
  public final ResponseEntity<ExceptionResponse> handleUserConflictException
  (EntityConflictException ex, WebRequest request) {
	  
	  ExceptionResponse errorDetails = new ExceptionResponse(new Date(), ex.getMessage(),
        request.getDescription(false));
    return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    
  }
  
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public final ResponseEntity<ExceptionResponse> handleMethodArgumentNotValidException
  (MethodArgumentNotValidException ex, WebRequest request) {
	  
	  ExceptionResponse errorDetails = new ExceptionResponse(new Date(), ex.getMessage(),
        request.getDescription(false));
    return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    
  }
  
}