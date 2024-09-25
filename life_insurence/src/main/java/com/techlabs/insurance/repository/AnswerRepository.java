package com.techlabs.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.techlabs.insurance.entity.Answer;

public interface AnswerRepository extends JpaRepository<Answer, Long> {

}
