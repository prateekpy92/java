package com.techlabs.insurance.repository;

import java.util.List;

import java.util.Optional;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.techlabs.insurance.entity.Customer;



public interface CustomerRepository extends JpaRepository<Customer, Long>{

	Page<Customer> findByIsactiveTrue(Pageable pageable);
	Page<Customer> findAll(Pageable pageable);
	Optional<Customer> findByLoginUsername(String username);
	//Optional<Customer> findByEmail(String email);
	//Optional<PasswordResetToken> findByEmail(String email);
	  @Query("SELECT c FROM Customer c JOIN c.userDetails u WHERE u.email = :email")
	    List<Customer> findByUserDetailsEmail(@Param("email") String email);
	Page<Customer> findByPoliciesAgentAgentId(long agentId, Pageable pageable);
	@Query("SELECT DISTINCT c FROM Customer c JOIN c.policies p WHERE p.agent.id = :agentId")
    List<Customer> findCustomersByAgentId(@Param("agentId") Long agentId);
}
