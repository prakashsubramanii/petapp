package com.mockathon.usecase.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mockathon.usecase.dao.UserRepository;
import com.mockathon.usecase.exceptions.EntityConflictException;
import com.mockathon.usecase.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PetService petService;
	
	@Autowired
	PasswordEncoder passwordencoder;
	
	public User addUser(User user) throws EntityConflictException {
		if(userRepository.existsByUsername(user.getUsername()))
			throw new EntityConflictException("Username alraedy exists");
		user.setPassword(passwordencoder.encode(user.getPassword()));
		return (User) userRepository.save(user);
	}
	
	public User updateUser(User user) {
		return (User) userRepository.save(user);
	}
	
	public List<User> getUsers(){
		return userRepository.findAll();
	}
	
	public Optional<User> getUserById(long id) {
		return userRepository.findById(id);
	}
	
	public Optional<User> getUserByName(String userName) {
		return userRepository.findByUsername(userName);
	}
	
	public void removeUser(User user) {
		userRepository.delete(user);
	}
	
	/*public void buyPet(Long petId,Long userId) throws PetPeersException{
		Pet pet = petService.getPetById(petId);
		User user = userRepository.findById(userId).get();
		user.getMyPets().add(pet);
		userRepository.save(user);
	}
	
	public Set<Pet> getMyPets(String userName) throws PetPeersException{
		Optional<User> user = userRepository.findByUsername(userName);
		user.orElseThrow(()->new PetPeersException("User not found with the provided username: "+userName));
		return user.get().getMyPets();
	}*/
	
	
	
	
}
