package com.techlabs.insurance.repository;

import java.util.Optional;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.techlabs.insurance.entity.Admin;
import com.techlabs.insurance.entity.Employee;
import com.techlabs.insurance.entity.Role;


public interface EmployeeRepository extends JpaRepository<Employee, Long>{

	Page<Employee> findByIsActiveTrue(Pageable pageable);

	


}
