package com.techlabs.insurance.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@ToString
public class EditSchemeDto {

	private Long schemeId;
	private String schemeName;
	private byte[] schemeImage;
	private String description;
	private Double minAmount;
	private Double maxAmount;
	private int minInvestmentTime;
	private int maxInvestmentTime;
	private int minAge;
	private int maxAge;
	private Double profitRatio;
    private Double registrationCommRatio;
    private Double installmentCommRatio;
	public Long getSchemeId() {
		return schemeId;
	}
	public void setSchemeId(Long schemeId) {
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
	public void setSchemeImage(byte[] schemeImage) {
		this.schemeImage = schemeImage;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Double getMinAmount() {
		return minAmount;
	}
	public void setMinAmount(Double minAmount) {
		this.minAmount = minAmount;
	}
	public Double getMaxAmount() {
		return maxAmount;
	}
	public void setMaxAmount(Double maxAmount) {
		this.maxAmount = maxAmount;
	}
	public int getMinInvestmentTime() {
		return minInvestmentTime;
	}
	public void setMinInvestmentTime(int minInvestmentTime) {
		this.minInvestmentTime = minInvestmentTime;
	}
	public int getMaxInvestmentTime() {
		return maxInvestmentTime;
	}
	public void setMaxInvestmentTime(int maxInvestmentTime) {
		this.maxInvestmentTime = maxInvestmentTime;
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
    
    
}
