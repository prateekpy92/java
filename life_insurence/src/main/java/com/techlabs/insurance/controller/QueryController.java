package com.techlabs.insurance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techlabs.insurance.dto.QueryDto;
import com.techlabs.insurance.service.QueryService;

@RestController
@RequestMapping("/insuranceapp")
public class QueryController {
    
    @Autowired
    private QueryService queryService;

    @PostMapping
    public ResponseEntity<QueryDto> createQuery(@RequestBody QueryDto queryDTO) {
    	QueryDto createdQuery = queryService.createQuery(queryDTO);
        return ResponseEntity.ok(createdQuery);
    }

    @GetMapping
    public List<QueryDto> getAllQueries() {
        return queryService.getAllQueries();
    }

    @GetMapping("/{queryId}")
    public ResponseEntity<QueryDto> getQueryById(@PathVariable Long queryId) {
    	QueryDto query = queryService.getQueryById(queryId);
        return ResponseEntity.ok(query);
    }

    @GetMapping("/customer/{customerId}")
    public List<QueryDto> getQueriesByCustomerId(@PathVariable Long customerId) {
        return queryService.getQueriesByCustomerId(customerId);
    }

    @PutMapping("/{queryId}")
    public ResponseEntity<QueryDto> updateQuery(@PathVariable Long queryId, @RequestBody QueryDto queryDTO) {
        QueryDto updatedQuery = queryService.updateQuery(queryId, queryDTO);
        return ResponseEntity.ok(updatedQuery);
    }

    @DeleteMapping("/{queryId}")
    public ResponseEntity<Void> deleteQuery(@PathVariable Long queryId) {
        queryService.deleteQuery(queryId);
        return ResponseEntity.noContent().build();
    }
}