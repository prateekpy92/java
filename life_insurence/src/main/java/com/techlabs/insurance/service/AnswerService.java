package com.techlabs.insurance.service;

import com.techlabs.insurance.entity.Answer;

public interface AnswerService {
    Answer submitAnswer(Long questionId, Answer answer);

	Answer submitAnswer(Answer answer);
}
