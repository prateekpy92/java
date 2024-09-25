package com.techlabs.insurance.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.util.StreamUtils;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.techlabs.insurance.entity.Document;
import com.techlabs.insurance.entity.SchemeDocument;
import com.techlabs.insurance.exception.GlobalExceptionHandler;
import com.techlabs.insurance.exception.InsuranceException;
import com.techlabs.insurance.service.DocumentService;
import com.techlabs.insurance.service.FileService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("insuranceapp")
public class FileController {

    @Value("${project.file}")
    private String path;

    @Autowired
    private FileService fileService;
    
    

    @Autowired
    private DocumentService documentService;
    
   // @PreAuthorize("hasRole('CUSTOMER')")
    @PostMapping("/upload-file")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        System.out.println("Uploading file...");
        String name = fileService.uploadFile(path, file);
        return ResponseEntity.ok(name);
    }

    @PostMapping("/upload-document")
    public String uploadDocument1(@RequestParam("file") MultipartFile file) {
        try {
            documentService.uploadDocument(file);
            return "File uploaded successfully";
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to upload file: " + e.getMessage();
        }
    }
    

    @GetMapping("/download")
    public ResponseEntity<?> downloadFile(@RequestParam String file) {
        try (InputStream inputStream = fileService.downloadFile(path, file);
             ByteArrayOutputStream buffer = new ByteArrayOutputStream()) {
            
            byte[] data = new byte[1024];
            int nRead;
            while ((nRead = inputStream.read(data, 0, data.length)) != -1) {
                buffer.write(data, 0, nRead);
            }
            buffer.flush();
            
            byte[] fileBytes = buffer.toByteArray();

            // Set up the response headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG); 
            headers.setContentDisposition(ContentDisposition.builder("attachment")
                    .filename(file)
                    .build());

            // Return the file as a byte array
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(fileBytes);
                    
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new GlobalExceptionHandler());
        }
    }

    
    
    @PostMapping("/upload")
    public ResponseEntity<Document> uploadDocument(@RequestParam("file") MultipartFile file) {
        try {
        	
            Document document = documentService.uploadDocument(file);
            return ResponseEntity.ok(document);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    
    @PostMapping("/shcemeupload")
    public ResponseEntity<Document> uploadDocuments(@RequestParam("file") MultipartFile file) {
        try {
            Document Document = documentService.uploadDocument(file);
            return ResponseEntity.ok(Document);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
