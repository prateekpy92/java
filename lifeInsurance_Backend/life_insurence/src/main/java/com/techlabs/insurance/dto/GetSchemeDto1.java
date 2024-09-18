package com.techlabs.insurance.dto;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class GetSchemeDto1 {
	
	private long schemeId;
	private String schemeName;
	private byte[] schemeImage;
	private String description;
	private int minAge;
	private int maxAge;
	private double minAmount;
	private double maxAmount;
	private int minDuration;
	private int maxDuration;
	private Double profitRatio;
    private Double registrationCommRatio;
    private Double installmentCommRatio;
	private Set<String> requierdDocs;
	public long getSchemeId() {
		return schemeId;
	}
	public void setSchemeId(long schemeId) {
		this.schemeId = schemeId;
	}
	public String getSchemeName() {
		return schemeName;
	}
	public void setSchemeName(String schemeName) {
		this.schemeName = schemeName;
	}
	public byte[] getSchemeImage() {
		return schemeImage;
	}
	public void setSchemeImage(byte[] bs) {
		this.schemeImage = bs;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getMinAge() {
		return minAge;
	}
	public void setMinAge(int minAge) {
		this.minAge = minAge;
	}
	public int getMaxAge() {
		return maxAge;
	}
	public void setMaxAge(int maxAge) {
		this.maxAge = maxAge;
	}
	public double getMinAmount() {
		return minAmount;
	}
	public void setMinAmount(double minAmount) {
		this.minAmount = minAmount;
	}
	public double getMaxAmount() {
		return maxAmount;
	}
	public void setMaxAmount(double maxAmount) {
		this.maxAmount = maxAmount;
	}
	public int getMinDuration() {
		return minDuration;
	}
	public void setMinDuration(int minDuration) {
		this.minDuration = minDuration;
	}
	public int getMaxDuration() {
		return maxDuration;
	}
	public void setMaxDuration(int maxDuration) {
		this.maxDuration = maxDuration;
	}
	public Double getProfitRatio() {
		return profitRatio;
	}
	public void setProfitRatio(Double profitRatio) {
		this.profitRatio = profitRatio;
	}
	public Double getRegistrationCommRatio() {
		return registrationCommRatio;
	}
	public void setRegistrationCommRatio(Double registrationCommRatio) {
		this.registrationCommRatio = registrationCommRatio;
	}
	public Double getInstallmentCommRatio() {
		return installmentCommRatio;
	}
	public void setInstallmentCommRatio(Double installmentCommRatio) {
		this.installmentCommRatio = installmentCommRatio;
	}
	public Set<String> getRequierdDocs() {
		return requierdDocs;
	}
	public void setRequierdDocs(Set<String> requierdDocs) {
		this.requierdDocs = requierdDocs;
	}

}
