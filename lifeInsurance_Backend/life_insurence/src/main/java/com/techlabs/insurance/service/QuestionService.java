package com.techlabs.insurance.service;

import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;

import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.dto.QuestionDto;

public interface QuestionService {

	Message questionPost(QuestionDto questionDto);

	Message questionPut(QuestionDto questionDto);

	Page<QuestionDto> questionGet(Pageable pageable);

}
