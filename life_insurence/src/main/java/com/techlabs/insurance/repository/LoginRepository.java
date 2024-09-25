package com.techlabs.insurance.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.techlabs.insurance.entity.Login;
@Repository
public interface LoginRepository extends JpaRepository<Login, Long> {
	
	Optional<Login> findByUsername(String username);

	boolean existsByUsername(String username);

//	boolean existsByUsername(String username);


   

	//Login findByUsername(String email); 
}

