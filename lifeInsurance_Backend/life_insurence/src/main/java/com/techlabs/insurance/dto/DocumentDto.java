package com.techlabs.insurance.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class DocumentDto {
	
	private String documentName;
	 private String documentImage; 
//	public void setDocumentImage(byte[] documentImage) {
//		this.documentImage = documentImage;
//	}
	public String getDocumentName() {
		return documentName;
	}
	public void setDocumentName(String documentName) {
		this.documentName = documentName;
	}
	public String getDocumentImage() {
		return documentImage;
	}
	public void setDocumentImage(String documentImage) {
		this.documentImage = documentImage;
	}
//	public byte[] getDocumentImage() {
//		return documentImage;
//	}

}
