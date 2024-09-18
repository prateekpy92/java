package com.techlabs.insurance.repository;

import java.util.List;
import java.util.Optional;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.techlabs.insurance.entity.Address;
import com.techlabs.insurance.entity.Agent;
import com.techlabs.insurance.entity.Customer;

public interface AgentRepository extends JpaRepository<Agent, Long> {

	Page<Agent> findByIsactiveTrue(Pageable pageable);
	
//	@Query("SELECT a FROM Agent a JOIN a.address ad WHERE ad.city = :city")
//	static
//    List<Agent> findByCity(@Param("city") String city) {
//		// TODO Auto-generated method stub
//		return null;
//	}

    @Query("SELECT a FROM Agent a JOIN a.address ad WHERE ad.state = :state")
	static
    List<Agent> findByState(@Param("state") String state) {
		// TODO Auto-generated method stub
		return null;
	}
	@Query("SELECT a FROM Agent a JOIN a.address ad WHERE ad.city = :city")
	static
    List<Agent> findByCity(@Param("city") String city) {
		// TODO Auto-generated method stub
		return null;
		
	} Agent findByUserDetailsUsername(String username);
}
