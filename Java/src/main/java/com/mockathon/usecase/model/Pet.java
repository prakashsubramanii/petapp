package com.mockathon.usecase.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Required;

@Entity
@Table(name="PETS")
public class Pet {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="PET_ID")
	private Long id;
	
	@NotNull
	private String petName;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="PET_OwnerId")
	private User user;
	
	@NotNull
	private Integer petAge;
	
	@NotNull
	private String petPlace;
	
	@NotNull
	private String addedBy;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPetName() {
		return petName;
	}

	public void setPetName(String petName) {
		this.petName = petName;
	}

	public Integer getPetAge() {
		return petAge;
	}

	public void setPetAge(Integer petAge) {
		this.petAge = petAge;
	}

	

	public String getPetPlace() {
		return petPlace;
	}

	public void setPetPlace(String petPlace) {
		this.petPlace = petPlace;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	

	public String getAddedBy() {
		return addedBy;
	}

	public void setAddedBy(String addedBy) {
		this.addedBy = addedBy;
	}

	@Override
	public String toString() {
		return "Pet [id=" + id + ", petName=" + petName + ", petAge=" + petAge + ", petPlace=" + petPlace + ", ownerId="
				 + "petOwnerId=]";
	}

}
