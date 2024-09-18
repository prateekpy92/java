package com.techlabs.insurance.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.techlabs.insurance.entity.Document;

public interface DocumentRepository extends CrudRepository<Document, Long> {
	 Optional<Document> findByDocumentName(String documentName);
}
