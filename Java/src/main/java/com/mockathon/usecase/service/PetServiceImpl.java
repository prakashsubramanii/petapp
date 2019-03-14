package com.mockathon.usecase.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.mockathon.usecase.dao.PetRepository;
import com.mockathon.usecase.dao.UserRepository;
import com.mockathon.usecase.model.Pet;
import com.mockathon.usecase.model.User;
import com.mockathon.usecase.exceptions.*;
@Service
public class PetServiceImpl implements PetService {
	
	@Autowired
	PetRepository petRepository;
	
	@Autowired
	UserService userService;
	
	@Autowired
	PagingAndSortingService pagingAndSortingService;
	
	@Autowired
	AuthenticationService authenticationService;

	@Override
	public List<Pet> getAll() throws Exception{
		return petRepository.findAll();
	}
	
	@Override
	public Page<Pet> getAll(int page, int size, Optional<Map<String,String>> sortMap) throws Exception{
		return petRepository.findAll(pagingAndSortingService.getPageRequest(page, size, sortMap));
	}

	@Override
	public Pet savePet(Pet pet) throws Exception{
		return petRepository.save(pet);
	}

	@Override
	public Pet getById(Long petId) throws EntityNotFoundException {
		Optional<Pet> pet = petRepository.findById(petId);
		if (!pet.isPresent()) {
			throw new EntityNotFoundException("Pet not found");
		}
		return pet.get();
	}
	
	public List<Pet> getByUser()  throws EntityNotFoundException{
		return petRepository.findByUser(authenticationService.getCurrentUser());
	}
	 
	public Page<Pet> getByUser(int page, int size,
			Optional<Map<String,String>> sortMap) throws EntityNotFoundException{
		return petRepository.findByUser(authenticationService.getCurrentUser(),pagingAndSortingService.getPageRequest(page, size, sortMap));
	}
	
	//public Pet buyPet(String userName, Long petId) throws EntityNotFoundException{
	public Pet buyPet(Long petId) throws EntityNotFoundException{
		/*User user = userService.getUserByName(userName).orElseThrow(
				()->new EntityNotFoundException("User not found with username : "+userName));
		*/
		User user = authenticationService.getCurrentUser();
		Pet pet = petRepository.findById(petId).orElseThrow(
				()->new EntityNotFoundException("Pet not found with PetID : "+petId));
		pet.setUser(user);
		
		return petRepository.save(pet);		
		
	}

	@Override
	public Page<Pet> filterData(Integer age, String name, String place, int page, int size,Optional<Map<String,String>> sortMap) {
		return petRepository.findByFilter(name, (age ==null ? "":String.valueOf(age)), place, pagingAndSortingService.getPageRequest(page, size, sortMap));
	}
	

}
