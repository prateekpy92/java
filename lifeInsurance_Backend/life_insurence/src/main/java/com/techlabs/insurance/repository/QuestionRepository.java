package com.techlabs.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.techlabs.insurance.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Long>{

}
