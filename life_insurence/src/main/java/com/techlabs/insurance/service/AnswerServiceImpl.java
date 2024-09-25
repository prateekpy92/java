package com.techlabs.insurance.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techlabs.insurance.entity.Answer;
import com.techlabs.insurance.entity.Question;
import com.techlabs.insurance.exception.InsuranceException;
import com.techlabs.insurance.repository.AnswerRepository;
import com.techlabs.insurance.repository.QuestionRepository;

@Service
public class AnswerServiceImpl implements AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private QuestionRepository questionRepository; 

   
    public Answer submitAnswer(Long questionId, Answer answer) {
        Question question = questionRepository.findById(questionId)
            .orElseThrow(() -> new InsuranceException("Question not found"));
        
        answer.setQuestion(question);
        return answerRepository.save(answer);
    }


	@Override
	public Answer submitAnswer(Answer answer) {
		// TODO Auto-generated method stub
		return null;
	}
}
