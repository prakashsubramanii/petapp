package com.mockathon.usecase.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mockathon.usecase.exceptions.EntityNotFoundException;

import com.mockathon.usecase.model.Pet;
import com.mockathon.usecase.service.PetService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(value="Manages all Pet related operations")
@CrossOrigin()
@RestController
@RequestMapping("api/pets")
public class PetController {
	
	@Autowired
	PetService petservice;
	
	@ApiOperation(value="View a list of all Pets",response=List.class)
	@GetMapping(path="")
	public ResponseEntity<Page<Pet>> getAllPets(@RequestParam(value="page") int page,@RequestParam(value="size") int size) throws Exception {
		Optional<Map<String,String>> optional = Optional.empty();
		return new ResponseEntity<Page<Pet>>(petservice.getAll(page,size,optional),HttpStatus.OK);
	}
	
	@ApiOperation(value="View a list of all Pets",response=List.class)
	@PostMapping(path="/filter")
	public ResponseEntity<Page<Pet>> getFilteredPets(@RequestBody Pet pet,
			@RequestParam(value="page") int page,
			@RequestParam(value="size") int size) throws Exception {
		Optional<Map<String,String>> optional = Optional.empty();
		return new ResponseEntity<Page<Pet>>(petservice.filterData(pet.getPetAge(), pet.getPetName(), pet.getPetPlace(), page, size, optional),HttpStatus.OK);
	}
	
	@ApiOperation(value="View a list of Pets belongs to logged in user",response=List.class)
	@GetMapping(path="/mypets")
	public ResponseEntity<Page<Pet>> getMyPets(@RequestParam(value="page") int page,@RequestParam(value="size") int size) 
			throws EntityNotFoundException {
		Optional<Map<String,String>> optional = Optional.empty();
		return new ResponseEntity<Page<Pet>>(petservice.getByUser(page,size,optional),HttpStatus.OK);
	}
	
	@ApiOperation(value="View Pet details based on the provided pet id")
	@GetMapping(path="/{petId}")
	public ResponseEntity<Pet> getPetById(
			@PathVariable("petId") Long petId) 
					throws EntityNotFoundException {
		return new ResponseEntity<Pet>(petservice.getById(petId),HttpStatus.OK);
	}
	
	@ApiOperation(value="Creats new Pet")
	@PostMapping(path="/")
	public ResponseEntity<Pet> createPet(@RequestBody  Pet pet) 
					throws Exception {
		return new ResponseEntity<Pet>(petservice.savePet(pet),HttpStatus.OK);
	}
	
	@ApiOperation(value="To buy a pet by the user")
	@PutMapping(path="/{petId}")
	public ResponseEntity<Pet> buyPet(
			@PathVariable("petId") Long petId) 
					throws EntityNotFoundException {
		return new ResponseEntity<Pet>(petservice.buyPet(petId),HttpStatus.ACCEPTED);
	}
	
	

}
