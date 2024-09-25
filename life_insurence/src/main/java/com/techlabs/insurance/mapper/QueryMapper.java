package com.techlabs.insurance.mapper;

import org.springframework.stereotype.Component;

import com.techlabs.insurance.dto.QueryDto;
import com.techlabs.insurance.entity.Customer;
import com.techlabs.insurance.entity.Query;

@Component
public class QueryMapper {

    public QueryDto toDto(Query query) {
        if (query == null) {
            return null;
        }
        QueryDto dto = new QueryDto();
        dto.setQueryId(query.getQueryId());
        dto.setTitle(query.getTitle());
        dto.setMessage(query.getMessage());
        dto.setResponse(query.getResponse());
        dto.setResolved(query.isIsresolved());

        // Set Customer ID from the Query entity
        if (query.getCustomer() != null) {
            dto.setCustomerId(query.getCustomer().getCustomerId());
        }

        return dto;
    }

    public Query toEntity(QueryDto dto, Customer customer) {
        if (dto == null) {
            return null;
        }
        Query query = new Query();
        query.setQueryId(dto.getQueryId());
        query.setTitle(dto.getTitle());
        query.setMessage(dto.getMessage());
        query.setResponse(dto.getResponse());
        query.setIsresolved(dto.isResolved());

        // Set the Customer entity
        query.setCustomer(customer);

        return query;
    }
}
