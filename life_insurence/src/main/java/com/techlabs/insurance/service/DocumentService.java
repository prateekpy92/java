

package com.techlabs.insurance.service;

import com.techlabs.insurance.dto.EditSchemeDto;
import com.techlabs.insurance.entity.Document;
import com.techlabs.insurance.entity.SchemeDocument;

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
	 Document uploadDocument(MultipartFile file) throws IOException; 
	 //void uploadDocument(MultipartFile file) throws IOException;
	SchemeDocument uploadDocuments(MultipartFile file) throws IOException;
	Document updateScheme(EditSchemeDto editSchemeDto);
}

