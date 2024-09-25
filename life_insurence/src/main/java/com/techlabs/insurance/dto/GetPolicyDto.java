package com.techlabs.insurance.dto;

import java.time.LocalDate;
import java.util.Date;

import java.util.List;
import java.util.Set;

import com.techlabs.insurance.entity.Agent;
import com.techlabs.insurance.entity.InsuranceScheme;
import com.techlabs.insurance.entity.Nominee;
import com.techlabs.insurance.entity.Payment;
import com.techlabs.insurance.entity.PolicyStatus;
import com.techlabs.insurance.entity.PremiumType;
import com.techlabs.insurance.entity.SubmittedDocument;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class GetPolicyDto {
	private long policyId;
	private double premiumAmount;
	private LocalDate issueDate;
	private Date maturityDate;
	private PremiumType premiumType;
	private Double sumAssured;
	private PolicyStatus policyStatus;
	private double investmentAmount;
	private double profitAmount;
	private InsuranceScheme scheme;
	private List<PaymentDto> payments;
	private List<NomineeDto> nominees;
	private Set<SubmittedDocument> documents;
	public long getPolicyId() {
		return policyId;
	}
	public void setPolicyId(long policyId) {
		this.policyId = policyId;
	}
	public double getPremiumAmount() {
		return premiumAmount;
	}
	public void setPremiumAmount(double premiumAmount) {
		this.premiumAmount = premiumAmount;
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
	public PremiumType getPremiumType() {
		return premiumType;
	}
	public void setPremiumType(PremiumType premiumType) {
		this.premiumType = premiumType;
	}
	public Double getSumAssured() {
		return sumAssured;
	}
	public void setSumAssured(Double sumAssured) {
		this.sumAssured = sumAssured;
	}
	public PolicyStatus getPolicyStatus() {
		return policyStatus;
	}
	public void setPolicyStatus(PolicyStatus policyStatus) {
		this.policyStatus = policyStatus;
	}
	public double getInvestmentAmount() {
		return investmentAmount;
	}
	public void setInvestmentAmount(double investmentAmount) {
		this.investmentAmount = investmentAmount;
	}
	public double getProfitAmount() {
		return profitAmount;
	}
	public void setProfitAmount(double profitAmount) {
		this.profitAmount = profitAmount;
	}
	public InsuranceScheme getScheme() {
		return scheme;
	}
	public void setScheme(InsuranceScheme scheme) {
		this.scheme = scheme;
	}
	
	public Set<SubmittedDocument> getDocuments() {
		return documents;
	}
	public void setDocuments(Set<SubmittedDocument> documents) {
		this.documents = documents;
	}
	public List<PaymentDto> getPayments() {
		return payments;
	}
	public void setPayments(List<PaymentDto> payments) {
		this.payments = payments;
	}
	public List<NomineeDto> getNominees() {
		return nominees;
	}
	public void setNominees(List<NomineeDto> nominees) {
		this.nominees = nominees;
	}
	

}
