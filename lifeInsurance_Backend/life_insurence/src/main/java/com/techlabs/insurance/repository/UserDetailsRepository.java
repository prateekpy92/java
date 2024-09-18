package com.techlabs.insurance.repository;

import java.util.Optional;

import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.techlabs.insurance.entity.UserDetails;

public interface UserDetailsRepository extends JpaRepository<UserDetails, Long> {

	static Optional<User> findByEmail(String email) {
		// TODO Auto-generated method stub
		return null;
	}


	  UserDetails findByUsername(String username);
	
}
