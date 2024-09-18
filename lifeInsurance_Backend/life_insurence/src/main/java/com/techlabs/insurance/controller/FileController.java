package com.techlabs.insurance.controller;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
    @PreAuthorize("hasRole('CUSTOMER')")
    @PostMapping("/upload-file")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        System.out.println("Uploading file...");
        String name = fileService.uploadFile(path, file);
        return ResponseEntity.ok(name);
    }

    @PostMapping("/upload-document")
    public String uploadDocument(@RequestParam("file") MultipartFile file) {
        try {
            documentService.uploadDocument(file);
            return "File uploaded successfully";
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to upload file: " + e.getMessage();
        }
    }

    @GetMapping("/download")
    public void downloadFile(@RequestParam String file, HttpServletResponse response) throws IOException {
        InputStream inputStream = fileService.downloadFile(path, file);
        response.setContentType(org.springframework.http.MediaType.IMAGE_JPEG_VALUE);
        org.springframework.util.StreamUtils.copy(inputStream, response.getOutputStream());
    }
}
