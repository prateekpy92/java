package com.techlabs.insurance.dto;

import java.util.List;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class PostSchemeDto {
	
	private String schemeName;
	private String schemeImage;
	private String description;
	private int minAge;
	private int maxAge;
	private int minAmount;
	private int maxAmount;
	private int minDuration;
	private int maxDuration;
	private double profitRatio;
	private double regCommRatio;
	private double instCommRatio;
	private Set<String> requierdDocs;
	public String getSchemeName() {
		return schemeName;
	}
	public void setSchemeName(String schemeName) {
		this.schemeName = schemeName;
	}
	public String getSchemeImage() {
		return schemeImage;
	}
	public void setSchemeImage(String schemeImage) {
		this.schemeImage = schemeImage;
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
	public int getMinAmount() {
		return minAmount;
	}
	public void setMinAmount(int minAmount) {
		this.minAmount = minAmount;
	}
	public int getMaxAmount() {
		return maxAmount;
	}
	public void setMaxAmount(int maxAmount) {
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
	public double getProfitRatio() {
		return profitRatio;
	}
	public void setProfitRatio(double profitRatio) {
		this.profitRatio = profitRatio;
	}
	public double getRegCommRatio() {
		return regCommRatio;
	}
	public void setRegCommRatio(double regCommRatio) {
		this.regCommRatio = regCommRatio;
	}
	public double getInstCommRatio() {
		return instCommRatio;
	}
	public void setInstCommRatio(double instCommRatio) {
		this.instCommRatio = instCommRatio;
	}
	public Set<String> getRequierdDocs() {
		return requierdDocs;
	}
	public void setRequierdDocs(Set<String> requierdDocs) {
		this.requierdDocs = requierdDocs;
	}

}
