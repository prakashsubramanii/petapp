package com.mockathon.usecase.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mockathon.usecase.exceptions.EntityConflictException;
import com.mockathon.usecase.exceptions.EntityNotFoundException;
import com.mockathon.usecase.model.User;
import com.mockathon.usecase.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;



@RestController
@RequestMapping("api/user")
@CrossOrigin
@Api(value="User management")
public class UserController {

	@Autowired
	UserService userService;
	
	
	@ApiOperation(httpMethod="POST",value="Register New User")
	@PostMapping(path="/")
	public ResponseEntity<User> addUser(@RequestBody User user) throws EntityConflictException {
		return new ResponseEntity<User>(userService.addUser(user),HttpStatus.CREATED);
	}
	
	@ApiOperation(httpMethod="GET",value="Authenticate User")
	@GetMapping(path="/authenticate")
	public ResponseEntity<Void> authenticate() throws Exception {
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}


}

