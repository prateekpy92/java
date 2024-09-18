package com.techlabs.insurance.dto;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.techlabs.insurance.entity.Claim;
import com.techlabs.insurance.entity.Nominee;
import com.techlabs.insurance.entity.Payment;
import com.techlabs.insurance.entity.SubmittedDocument;

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
public class AccountDto {
	
	
    private Long policyNo;
    private String username;
    private String insuranceScheme;

    private LocalDate issueDate;

    private Date maturityDate;
    
    private String premiumType;

    private Double sumAssured;

    private Double premiumAmount;

    private String status;

    private List<Nominee> nominees;

    private List<Payment> payments;
    
    private Claim claims;

    private Set<SubmittedDocument> submittedDocuments = new HashSet<>();

	public Long getPolicyNo() {
		return policyNo;
	}

	public void setPolicyNo(Long policyNo) {
		this.policyNo = policyNo;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getInsuranceScheme() {
		return insuranceScheme;
	}

	public void setInsuranceScheme(String insuranceScheme) {
		this.insuranceScheme = insuranceScheme;
	}

	public LocalDate getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(LocalDate localDate) {
		this.issueDate = localDate;
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

	public Double getSumAssured() {
		return sumAssured;
	}

	public void setSumAssured(Double sumAssured) {
		this.sumAssured = sumAssured;
	}

	public Double getPremiumAmount() {
		return premiumAmount;
	}

	public void setPremiumAmount(Double premiumAmount) {
		this.premiumAmount = premiumAmount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<Nominee> getNominees() {
		return nominees;
	}

	public void setNominees(List<Nominee> nominees) {
		this.nominees = nominees;
	}

	public List<Payment> getPayments() {
		return payments;
	}

	public void setPayments(List<Payment> payments) {
		this.payments = payments;
	}

	public Claim getClaims() {
		return claims;
	}

	public void setClaims(Claim claims) {
		this.claims = claims;
	}

	public Set<SubmittedDocument> getSubmittedDocuments() {
		return submittedDocuments;
	}

	public void setSubmittedDocuments(Set<SubmittedDocument> submittedDocuments) {
		this.submittedDocuments = submittedDocuments;
	}
      

}
