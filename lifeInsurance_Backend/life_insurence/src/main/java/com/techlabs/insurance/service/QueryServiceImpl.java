package com.techlabs.insurance.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techlabs.insurance.dto.QueryDto;
import com.techlabs.insurance.entity.Customer;
import com.techlabs.insurance.entity.Query;
import com.techlabs.insurance.exception.InsuranceException; // Assuming InsuranceException is defined
import com.techlabs.insurance.mapper.QueryMapper;
import com.techlabs.insurance.repository.CustomerRepository;
import com.techlabs.insurance.repository.QueryRepository;

@Service
public class QueryServiceImpl implements QueryService {

    @Autowired
    private QueryRepository queryRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private QueryMapper queryMapper;

    @Override
    public QueryDto createQuery(QueryDto queryDTO) {
        // Find the customer associated with the query
        Customer customer = customerRepository.findById(queryDTO.getCustomerId())
                .orElseThrow(() -> new InsuranceException("Customer with ID " + queryDTO.getCustomerId() + " does not exist!"));

        Query query = queryMapper.toEntity(queryDTO, customer);
        query = queryRepository.save(query);

        return queryMapper.toDto(query);
    }

    @Override
    public List<QueryDto> getAllQueries() {
        List<Query> queries = queryRepository.findAll();
        return queries.stream().map(queryMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public QueryDto getQueryById(Long queryId) {
        Query query = queryRepository.findById(queryId)
                .orElseThrow(() -> new InsuranceException("Query with ID " + queryId + " does not exist!"));
        return queryMapper.toDto(query);
    }

    @Override
    public List<QueryDto> getQueriesByCustomerId(Long customerId) {
        List<Query> queries = queryRepository.findByCustomer_Id(customerId);
        return queries.stream().map(queryMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public QueryDto updateQuery(Long queryId, QueryDto queryDTO) {
        // Fetch existing query
        Query query = queryRepository.findById(queryId)
                .orElseThrow(() -> new InsuranceException("Query with ID " + queryId + " does not exist!"));

        // Update query fields
        query.setTitle(queryDTO.getTitle());
        query.setMessage(queryDTO.getMessage());
        query.setResponse(queryDTO.getResponse());
        query.setIsresolved(queryDTO.isResolved());

        query = queryRepository.save(query);
        return queryMapper.toDto(query);
    }

    @Override
    public void deleteQuery(Long queryId) {
        Query query = queryRepository.findById(queryId)
                .orElseThrow(() -> new InsuranceException("Query with ID " + queryId + " does not exist!"));
        queryRepository.delete(query);
    }
}
