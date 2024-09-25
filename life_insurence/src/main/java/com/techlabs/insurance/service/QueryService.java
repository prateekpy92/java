package com.techlabs.insurance.service;

import java.util.List;

import com.techlabs.insurance.dto.QueryDto;

public interface QueryService {
	 QueryDto createQuery(QueryDto queryDTO);
	    List<QueryDto> getAllQueries();
	    QueryDto getQueryById(Long queryId);
	    List<QueryDto> getQueriesByCustomerId(Long customerId);
	    QueryDto updateQuery(Long queryId, QueryDto queryDTO);
	    void deleteQuery(Long queryId);
	    }

