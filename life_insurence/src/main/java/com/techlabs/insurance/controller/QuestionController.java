package com.techlabs.insurance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.dto.QuestionDto;
import com.techlabs.insurance.entity.Answer;
import com.techlabs.insurance.entity.Question;
import com.techlabs.insurance.exception.InsuranceException;
import com.techlabs.insurance.exceptionHandler.ExceptionResponse.ResourceNotFoundException;
import com.techlabs.insurance.repository.QuestionRepository;
import com.techlabs.insurance.service.AnswerService;
import com.techlabs.insurance.service.EmailService;
import com.techlabs.insurance.service.QuestionService;

@RestController
@RequestMapping("/insuranceapp")
public class QuestionController {

	@Autowired
	private QuestionService questionService;

	@Autowired
	private AnswerService answerService;
	@Autowired
	private QuestionRepository questionRepository;
	
	

	    @Autowired
	    private EmailService emailService;

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

	//@PreAuthorize("hasRole('EMPLOYEE')")
	@GetMapping("/question")
	ResponseEntity<Page<QuestionDto>> getAllQuestions(@RequestParam int pageNumber, @RequestParam int pageSize) {

		System.out.println("pagenumber,pagesize are " + pageNumber + " ," + pageSize);
		Pageable pageable = PageRequest.of(pageNumber, pageSize);
		Page<QuestionDto> questions = questionService.questionGet(pageable);

		HttpHeaders headers = new HttpHeaders();
		headers.add("question-Count", String.valueOf(questions.getTotalElements()));
		return ResponseEntity.ok().headers(headers).body(questions);

	}

	//@PreAuthorize("hasRole('EMPLOYEE')")
	@PutMapping("/question/{questionId}/answer")
	public ResponseEntity<Answer> submitAnswer(@PathVariable Long questionId, @RequestBody Answer answer) {

		Question question = questionRepository.findById(questionId)
				.orElseThrow(() -> new InsuranceException( "Question not found with id: " + questionId));

				answer.setQuestion(question); 

		// Save the answer
		Answer savedAnswer = answerService.submitAnswer(answer);
		return ResponseEntity.ok(savedAnswer);
	}

	//@PreAuthorize("hasRole('EMPLOYEE')")
	@GetMapping("/question/{id}")
	public ResponseEntity<QuestionDto> getQuestionById(@PathVariable Long id) {
		QuestionDto questionDto = questionService.getQuestionById(id);
		return ResponseEntity.ok(questionDto);
	}
	
	
	 @GetMapping("/{questionId}/answer")
	    public QuestionDto getAnswer(@PathVariable Long questionId) {
	        QuestionDto questionDto = questionService.findQuestionById(questionId);
	        if (questionDto != null && questionDto.getAnswer() != null) {
	            emailService.sendAnswerEmail(questionDto.getUsername(), questionDto.getQuestion(), questionDto.getAnswer());
	        }
	        return questionDto;
	    }

}
