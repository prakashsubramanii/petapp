package com.mockathon.usecase.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.mockathon.usecase.exceptions.EntityNotFoundException;
import com.mockathon.usecase.model.Pet;


@Service
public interface PetService {

	List<Pet> getAll() throws Exception;
	Page<Pet> getAll(int page, int size, Optional<Map<String,String>> sortMap) throws Exception;

	Pet savePet(Pet pet) throws Exception;

	Pet getById(Long petId) throws EntityNotFoundException;
	
	List<Pet> getByUser() throws EntityNotFoundException;
	
	Page<Pet> getByUser(int page, int size, Optional<Map<String,String>> sortMap) throws EntityNotFoundException;

	Pet buyPet(Long petId) throws EntityNotFoundException;
	
	Page<Pet> filterData(Integer age,String name, String place, int page, int size,Optional<Map<String,String>> sortMap);
	
	/*List<Pet> getMyPets(String userName) throws PetPeersException;*/

	/*void buyPet(String userName, Long petId) throws PetPeersException;*/
}

