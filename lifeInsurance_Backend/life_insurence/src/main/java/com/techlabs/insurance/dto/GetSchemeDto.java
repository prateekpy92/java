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
public class GetSchemeDto {
	private Long id;
	private String schemeName;
	private String status;
private Long planId;
public Long getId() {
	return id;
}
public void setId(Long id) {
	this.id = id;
}
public String getSchemeName() {
	return schemeName;
}
public void setSchemeName(String schemeName) {
	this.schemeName = schemeName;
}
public String getStatus() {
	return status;
}
public void setStatus(String status) {
	this.status = status;
}
public Long getPlanId() {
	return planId;
}
public void setPlanId(Long planId) {
	this.planId = planId;
}
	

}
