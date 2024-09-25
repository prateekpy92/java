package com.techlabs.insurance.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.techlabs.insurance.dto.EditSchemeDto;
import com.techlabs.insurance.entity.Document;
import com.techlabs.insurance.entity.DocumentStatus;
import com.techlabs.insurance.entity.SchemeDocument;
import com.techlabs.insurance.entity.SubmittedDocument;
import com.techlabs.insurance.exception.InsuranceException;
import com.techlabs.insurance.repository.DocumentRepository;
import com.techlabs.insurance.repository.SchemeDocumentRepository;
import com.techlabs.insurance.repository.SubmittedDocumentRepository;

@Service
public class DocumentServiceImpl implements DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Override
    public List<Document> getAllDocuments() {
        return (List<Document>) documentRepository.findAll();
    }
    
    @Autowired
    private SchemeDocumentRepository schemedocumentRepository;


    @Override
    public Document addDocument(Document document) {
       
        Optional<Document> existingDocument = documentRepository.findByDocumentName(document.getDocumentName());

        if (existingDocument.isPresent()) {
            throw new InsuranceException("Document with the same name already exists!");
        }

        return documentRepository.save(document);
    }

    @Override
    public Document getDocumentById(Long documentId) {
        System.out.println("Fetching document with ID: " + documentId);
        Optional<Document> document = documentRepository.findById(documentId);
        
        if (!document.isPresent()) {
            throw new InsuranceException("Document with ID " + documentId + " does not exist!");
        }

        System.out.println("Found document: " + document.get());
        return document.get();
    }


    @Override
    public void saveCustomerDocuments(MultipartFile aadhaarCard, MultipartFile panCard) throws IOException {
        // Save Aadhaar Card Document
        if (aadhaarCard != null && !aadhaarCard.isEmpty()) {
            Document aadhaarDocument = new Document();
            aadhaarDocument.setDocumentName(aadhaarCard.getOriginalFilename());
            aadhaarDocument.setDocumentImage(aadhaarCard.getBytes());
            aadhaarDocument.setDocumentStatus(DocumentStatus.PENDING); 
            documentRepository.save(aadhaarDocument);
        }
        if (panCard != null && !panCard.isEmpty()) {
            Document panDocument = new Document();
            panDocument.setDocumentName(panCard.getOriginalFilename());
            panDocument.setDocumentImage(panCard.getBytes());
            panDocument.setDocumentStatus(DocumentStatus.PENDING); // or any other status
            documentRepository.save(panDocument);
        }
    }
        

    
    private void saveFile(MultipartFile file) throws IOException {
       
        File directory = new File("F://Spring//life_insurence//src//uploads");
        if (!directory.exists()) {
            directory.mkdirs(); 
        }

      
        File savedFile = new File(directory, file.getOriginalFilename());

        try (FileOutputStream fos = new FileOutputStream(savedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            throw new InsuranceException("Error saving file: " + file.getOriginalFilename());
        }
    }

	@Override
	public Document getDocumentById(long documentId) {
		
		return null;
	}

	@Override
	public Document getDocumentById(Integer documentId) {
		// TODO Auto-generated method stub
		return null;
	}
	 @Autowired
	    private SubmittedDocumentRepository submittedDocumentRepository;
	 private static final long MAX_FILE_SIZE = 10 * 1024 * 1024;
	 
	 @Override
	 public Document uploadDocument(MultipartFile file) throws IOException {
	     if (file != null && !file.isEmpty()) {
	    	 if (file.getSize() > MAX_FILE_SIZE) { 
	             throw new IllegalArgumentException("File size exceeds limit.");
	         }
	         Document document = new Document();
	         document.setDocumentName(file.getOriginalFilename());
	         document.setDocumentImage(file.getBytes());
	         document.setDocumentStatus(DocumentStatus.PENDING); // Set status as needed
	         return documentRepository.save(document); // Return the saved document
	     } else {
	         throw new IllegalArgumentException("File is empty or null");
	     }
	 }
	 @Override
	    public SchemeDocument uploadDocuments(MultipartFile file) throws IOException {
	        SchemeDocument document = new SchemeDocument();
	        document.setDocumentName(file.getOriginalFilename());
	        document.setDocumentImage(file.getBytes()); // Store the file directly as a byte array
	        return schemedocumentRepository.save(document);
	    }

	@Override
	public Document updateScheme(EditSchemeDto editSchemeDto) {
		// TODO Auto-generated method stub
		return null;
	}
}
