package com.techlabs.insurance.repository;

import java.util.Optional;

import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.techlabs.insurance.entity.UserDetails;

public interface UserDetailsRepository extends JpaRepository<UserDetails, Long> {

	 Optional<User> findByEmail(String email);

	//  UserDetails findByUsername(String username);


	boolean existsByUsername(String username);

	UserDetails findByUsername(String username);




	
}
