package com.techlabs.insurance.dto;

import java.util.List;
public class CustomerReportDTO {
    private String customerName;
    private String phone;
    private String email;
    private String city;
    private String state;
    private List<PolicyReportDTO> policies;
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public List<PolicyReportDTO> getPolicies() {
		return policies;
	}
	public void setPolicies(List<PolicyReportDTO> policies) {
		this.policies = policies;
	}

    // Getters and Setters
}
