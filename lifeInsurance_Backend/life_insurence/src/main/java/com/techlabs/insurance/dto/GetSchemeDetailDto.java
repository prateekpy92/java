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
public class GetSchemeDetailDto {
	
	
	private byte[] schemeImage;
	private String description;
	private int minAge;
	private int maxAge;
	private double minAmount;
	private double maxAmount;
	private int minDuration;
	private int maxDuration;
	private Set<String> requierdDocs;
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
	public Set<String> getRequierdDocs() {
		return requierdDocs;
	}
	public void setRequierdDocs(Set<String> requierdDocs) {
		this.requierdDocs = requierdDocs;
	}

}
