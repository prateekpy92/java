package com.techlabs.insurance.service;

import com.techlabs.insurance.entity.Document;
import com.techlabs.insurance.entity.SubmittedDocument;
import com.techlabs.insurance.exception.InsuranceException;
import com.techlabs.insurance.repository.DocumentRepository;
import com.techlabs.insurance.repository.SubmittedDocumentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class DocumentServiceImpl implements DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Override
    public List<Document> getAllDocuments() {
        return (List<Document>) documentRepository.findAll();
    }

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
        if (aadhaarCard == null || aadhaarCard.isEmpty() || panCard == null || panCard.isEmpty()) {
            throw new InsuranceException("Both Aadhaar Card and PAN Card must be provided!");
        }

        saveFile(aadhaarCard);
        saveFile(panCard);
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
            throw new InsuranceException("Error saving file: " + file.getOriginalFilename(), e);
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

	 public void uploadDocument(MultipartFile file) throws IOException {
	        SubmittedDocument document = new SubmittedDocument();
	        document.setDocumentName(file.getOriginalFilename());
	       // document.setDocumentImage(file.getBytes());

	     
	        submittedDocumentRepository.save(document);
	    }
}
