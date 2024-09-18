package com.techlabs.insurance.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.dto.QuestionDto;
import com.techlabs.insurance.service.QuestionService;

@RestController
@RequestMapping("/insuranceapp")
public class QuestionController {
	
	@Autowired
	private QuestionService questionService;

	@PostMapping("/question")
	ResponseEntity<Message> questionPost(@RequestBody QuestionDto questionDto) {

		Message message = questionService.questionPost(questionDto);

		return ResponseEntity.ok(message);

	}
	
	@PutMapping("/question")
	ResponseEntity<Message> questionPut(@RequestBody QuestionDto questionDto) {

		Message message = questionService.questionPut(questionDto);

		return ResponseEntity.ok(message);

	}

	@GetMapping("question")
	ResponseEntity<Page<QuestionDto>> getAllQuestions(@RequestParam int pageNumber, @RequestParam int pageSize) {

		System.out.println("pagenumber,pagesize are " + pageNumber + " ," + pageSize);
		Pageable pageable = PageRequest.of(pageNumber, pageSize);
		Page<QuestionDto> questions = questionService.questionGet(pageable);

		HttpHeaders headers = new HttpHeaders();
		headers.add("question-Count", String.valueOf(questions.getTotalElements()));
		return ResponseEntity.ok().headers(headers).body(questions);

	}


}
