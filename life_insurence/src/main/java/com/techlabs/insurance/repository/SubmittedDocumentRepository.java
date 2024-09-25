package com.techlabs.insurance.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.techlabs.insurance.entity.SubmittedDocument;

@Repository
public interface SubmittedDocumentRepository extends JpaRepository<SubmittedDocument, Long> {
}
