package com.techlabs.insurance.dto;

import java.util.List;

public class AgentReportDTO {
    private String agentName;
    private String phone;
    private String email;
    private String region;
    private double totalCommission;
    private List<CommissionReportDTO> commissions;
    private List<ClaimReportDTO> claims;
	public String getAgentName() {
		return agentName;
	}
	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRegion() {
		return region;
	}
	public void setRegion(String region) {
		this.region = region;
	}
	public double getTotalCommission() {
		return totalCommission;
	}
	public void setTotalCommission(double totalCommission) {
		this.totalCommission = totalCommission;
	}
	public List<CommissionReportDTO> getCommissions() {
		return commissions;
	}
	public void setCommissions(List<CommissionReportDTO> commissions) {
		this.commissions = commissions;
	}
	public List<ClaimReportDTO> getClaims() {
		return claims;
	}
	public void setClaims(List<ClaimReportDTO> claims) {
		this.claims = claims;
	}

    // Getters and Setters
}

