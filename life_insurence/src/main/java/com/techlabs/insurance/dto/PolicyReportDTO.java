package com.techlabs.insurance.dto;

import java.util.Date;
import java.util.List;

public class PolicyReportDTO {
    private Long policyId;
    private String policyName;
    private double premiumAmount;
    private double sumAssured;
    private Date maturityDate;
    private String premiumType;
    private List<InstallmentReportDTO> installments;
	public Long getPolicyId() {
		return policyId;
	}
	public void setPolicyId(Long policyId) {
		this.policyId = policyId;
	}
	public String getPolicyName() {
		return policyName;
	}
	public void setPolicyName(String policyName) {
		this.policyName = policyName;
	}
	public double getPremiumAmount() {
		return premiumAmount;
	}
	public void setPremiumAmount(double premiumAmount) {
		this.premiumAmount = premiumAmount;
	}
	public double getSumAssured() {
		return sumAssured;
	}
	public void setSumAssured(double sumAssured) {
		this.sumAssured = sumAssured;
	}
	public Date getMaturityDate() {
		return maturityDate;
	}
	public void setMaturityDate(Date maturityDate) {
		this.maturityDate = maturityDate;
	}
	public String getPremiumType() {
		return premiumType;
	}
	public void setPremiumType(String premiumType) {
		this.premiumType = premiumType;
	}
	public List<InstallmentReportDTO> getInstallments() {
		return installments;
	}
	public void setInstallments(List<InstallmentReportDTO> installments) {
		this.installments = installments;
	}

    
}

