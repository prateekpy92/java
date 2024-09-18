package com.techlabs.insurance.service;

import java.util.List;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.techlabs.insurance.dto.AddEmployeeDto;
import com.techlabs.insurance.dto.AdminGetDto;
import com.techlabs.insurance.dto.AdminPostDto;
import com.techlabs.insurance.dto.ClaimApproveDto;
import com.techlabs.insurance.dto.JwtAuthResponse;
import com.techlabs.insurance.dto.LoginDto;
import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.entity.Agent;
import com.techlabs.insurance.entity.InsurancePolicy;

public interface AdminService {
	
	
	AdminGetDto addAdmin(AdminPostDto adminPostDto);
	Page<AdminGetDto> getAllAdmin(Pageable pageable);
	public JwtAuthResponse adminLogin(LoginDto loginDto);
	String validateuser(String token);
	List<Agent> getAgentClaims();
	List<InsurancePolicy> getpolicyClaims();
	Message agentPolicyClaimApprove(long policyId);
	Message agentClaimApprove(ClaimApproveDto claimAppproveDto);
	Message agentClaimReject(ClaimApproveDto claimAppproveDto);
	Message agentPolicyClaimReject(long policyId);

}
