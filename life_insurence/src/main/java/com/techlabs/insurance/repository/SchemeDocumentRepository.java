package com.techlabs.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.techlabs.insurance.entity.SchemeDocument;

public interface SchemeDocumentRepository extends JpaRepository<SchemeDocument, Long> {

}
