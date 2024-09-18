package com.techlabs.insurance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.techlabs.insurance.entity.Query;

public interface QueryRepository extends JpaRepository<Query, Long> {

	

}
