package com.mockathon.usecase.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mockathon.usecase.model.Pet;
import com.mockathon.usecase.model.User;
@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
	public Page<Pet> findByUser(User user,Pageable pageable);
	public List<Pet> findByUser(User user);
	public Page<Pet> findAll(Pageable pageable);
	@Query("SELECT p FROM Pet p where upper(p.petName)  LIKE concat('%', upper(?1), '%') and p.petAge LIKE concat('%', ?2, '%') and p.petPlace LIKE concat('%', upper(?3), '%')")
	public Page<Pet> findByFilter(String name, String age, String place, Pageable pageable);
}
