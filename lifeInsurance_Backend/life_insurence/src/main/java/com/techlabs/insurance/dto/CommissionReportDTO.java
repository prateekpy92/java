package com.techlabs.insurance.dto;

import java.util.Date;

public class CommissionReportDTO {
    private Long commissionId;
    private double amount;
    private Date dateEarned;
    private String policyId;
	public Long getCommissionId() {
		return commissionId;
	}
	public void setCommissionId(Long commissionId) {
		this.commissionId = commissionId;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public Date getDateEarned() {
		return dateEarned;
	}
	public void setDateEarned(Date dateEarned) {
		this.dateEarned = dateEarned;
	}
	public String getPolicyId() {
		return policyId;
	}
	public void setPolicyId(String policyId) {
		this.policyId = policyId;
	}

    // Getters and Setters
}
