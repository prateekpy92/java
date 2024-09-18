package com.techlabs.insurance.dto;

import java.util.Date;

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
public class ClaimApproveDto {
	
	private long agentId;
	private long claimId;
	public long getAgentId() {
		return agentId;
	}
	public void setAgentId(long agentId) {
		this.agentId = agentId;
	}
	public long getClaimId() {
		return claimId;
	}
	public void setClaimId(long claimId) {
		this.claimId = claimId;
	}
	

}
