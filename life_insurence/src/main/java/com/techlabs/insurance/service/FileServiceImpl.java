package com.techlabs.insurance.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.techlabs.insurance.exception.InsuranceException;

@Service
public class FileServiceImpl implements FileService{

	@Override
	public String uploadFile(String path, MultipartFile file) {
		
		
		System.out.println("started");

		String name = file.getOriginalFilename();
		
		name=UUID.randomUUID()+name.substring(name.lastIndexOf("."));

		String fullPath = path + File.separator + name;

		File f = new File(path);

		if (!f.exists()) {
			f.mkdir();
		}

		try {
			Files.copy(file.getInputStream(), Paths.get(fullPath));
		} catch (IOException ex) {
			
			System.out.println(ex);
			
			throw new InsuranceException("file uploading failed");

		}

		return name;
	}

	@Override
	public InputStream downloadFile(String path, String fileName) {
		
		String fullPath=path+File.separator+fileName;
		try {
			InputStream inputStream=new FileInputStream(fullPath);
			return inputStream;
		} catch (FileNotFoundException e) {
			
			e.printStackTrace();
			
			throw new InsuranceException("File Not Found");
		}
		
//		return null;
	}
	

}
