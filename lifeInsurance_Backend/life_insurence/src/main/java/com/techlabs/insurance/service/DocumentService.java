

package com.techlabs.insurance.service;

import com.techlabs.insurance.entity.Document;


import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface DocumentService {

    List<Document> getAllDocuments();
    Document addDocument(Document document);
//	void saveCustomerDocuments(Long customerId, MultipartFile aadhaarCard, MultipartFile panCard) throws IOException;
	void saveCustomerDocuments(MultipartFile aadhaarCard, MultipartFile panCard) throws IOException;
	Document getDocumentById(long documentId);
	Document getDocumentById(Integer documentId);
	Document getDocumentById(Long documentId);
	
	 void uploadDocument(MultipartFile file) throws IOException;
}

