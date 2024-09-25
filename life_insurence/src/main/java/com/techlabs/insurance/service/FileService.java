package com.techlabs.insurance.service;

import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {

	String uploadFile(String path, MultipartFile file);

	InputStream downloadFile(String path, String file);

}
