package com.techlabs.insurance.service;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.dto.QuestionDto;
import com.techlabs.insurance.entity.Question;
import com.techlabs.insurance.exceptionHandler.ExceptionResponse;
import com.techlabs.insurance.mapper.QuestionMapper;
import com.techlabs.insurance.repository.QueryRepository;
import com.techlabs.insurance.repository.QuestionRepository;


@Service
public class QuestionServiceImpl implements QuestionService {

	@Autowired
	private QuestionRepository questionRepository;

	@Override
	public Message questionPost(QuestionDto questionDto) {
		
		Question question=QuestionMapper.questionDtoToQuestion(questionDto);
		questionRepository.save(question);
		return new Message(HttpStatus.OK,"Question Saved Successfully");
	}

	@Override
	public Page<QuestionDto> questionGet(Pageable pageable) {
		
		Page<Question>questions=questionRepository.findAll(pageable);
		
		Page<QuestionDto> questionList = questions.map(question -> QuestionMapper.questionToQuestionDto(question));
		
		return questionList;
		
		
	}

	@Override
	public Message questionPut(QuestionDto questionDto) {
		Question question=QuestionMapper.questionDtoToQuestion(questionDto);
		questionRepository.save(question);
		return new Message(HttpStatus.OK,"Question Updated Successfully");
	}
	
	
	@Override
	public QuestionDto getQuestionById(Long id) {
	    Question question = questionRepository.findById(id)
	            .orElseThrow(() -> new NoSuchElementException("Question not found with id: " + id));
	    return convertToDto(question);
	}

    private QuestionDto convertToDto(Question question) {
        return new QuestionDto(
        );
    }
    
    public QuestionDto findQuestionById(Long questionId) {
        Optional<Question> questionOpt = questionRepository.findById(questionId);
        return questionOpt.map(question -> {
            QuestionDto dto = new QuestionDto();
            dto.setQuestionId(question.getQuestionId());
            dto.setUsername(question.getUsername());
            dto.setQuestion(question.getQuestion());
            dto.setAnswer(question.getAnswer());
            dto.setActive(question.isActive());
            return dto;
        }).orElse(null);
    }


}
