package com.techlabs.insurance.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "query")
public class Query {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column
	    private Long queryId;

	    @NotEmpty(message = "Title is required")
	    @Column
	    private String title;

	    @NotEmpty(message = "Message is required")
	    @Column
	    private String message;
	    
	    @Column
	    private String response;

	    @Column
	    private boolean isresolved=false;
	    
	    @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.DETACH,CascadeType.REFRESH})
	    @JoinColumn(name = "CustomerId", referencedColumnName = "CustomerId")
	    private Customer Customer;

		public Customer getCustomer() {
			return Customer;
		}

		public void setCustomer(Customer customer) {
			Customer = customer;
		}

		public Long getQueryId() {
			return queryId;
		}

		public void setQueryId(Long queryId) {
			this.queryId = queryId;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getMessage() {
			return message;
		}

		public void setMessage(String message) {
			this.message = message;
		}

		public String getResponse() {
			return response;
		}

		public void setResponse(String response) {
			this.response = response;
		}

		public boolean isIsresolved() {
			return isresolved;
		}

		public void setIsresolved(boolean isresolved) {
			this.isresolved = isresolved;
		}

//		public Customer getCustomerId() {
//			return CustomerId;
//		}
//
//		public void setCustomerId(Customer customerId) {
//			CustomerId = customerId;
//		}
//	    
	    
	    
}


