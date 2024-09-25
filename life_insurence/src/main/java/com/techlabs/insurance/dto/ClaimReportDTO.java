package com.techlabs.insurance.dto;

import java.time.LocalDate;
import java.util.Date;

public class ClaimReportDTO {
    private Long claimId;
    private String policyId;
    private String claimStatus;
    private LocalDate dateFiled;
    private double claimAmount;
	public Long getClaimId() {
		return claimId;
	}
	public void setClaimId(Long claimId) {
		this.claimId = claimId;
	}
	public String getPolicyId() {
		return policyId;
	}
	public void setPolicyId(String policyId) {
		this.policyId = policyId;
	}
	public String getClaimStatus() {
		return claimStatus;
	}
	public void setClaimStatus(String claimStatus) {
		this.claimStatus = claimStatus;
	}
	public LocalDate getDateFiled() {
		return dateFiled;
	}
	public void setDateFiled(LocalDate localDate) {
		this.dateFiled = localDate;
	}
	public double getClaimAmount() {
		return claimAmount;
	}
	public void setClaimAmount(double claimAmount) {
		this.claimAmount = claimAmount;
	}

    // Getters and Setters
}
