package com.techlabs.insurance.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "submitteddocuments")
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class SubmittedDocument {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "documentid")
	    private Long documentId;
	    
	    @Column(name = "documentname")
	    private String documentName;
	    
	    @Column(name = "documentstatus")
	    private DocumentStatus documentStatus;

	    @Column(name = "documentimage")
	    private String documentImage;

		

		

		

		public String getDocumentImage() {
			return documentImage;
		}

		public void setDocumentImage(String documentImage) {
			this.documentImage = documentImage;
		}

		public Long getDocumentId() {
			return documentId;
		}

		public void setDocumentId(Long documentId) {
			this.documentId = documentId;
		}

		public String getDocumentName() {
			return documentName;
		}

		public void setDocumentName(String documentName) {
			this.documentName = documentName;
		}

		public DocumentStatus getDocumentStatus() {
			return documentStatus;
		}

		public void setDocumentStatus(DocumentStatus documentStatus) {
			this.documentStatus = documentStatus;
		}

//		public String getDocumentImage() {
//			return documentImage;
//		}
//
//		public void setDocumentImage(String documentImage) {
//			this.documentImage = documentImage;
//		}

}