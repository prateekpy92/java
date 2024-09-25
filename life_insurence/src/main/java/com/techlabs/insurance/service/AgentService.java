package com.techlabs.insurance.service;

import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;

import com.techlabs.insurance.dto.AccountDto;
import com.techlabs.insurance.dto.AgentClaimDto;
import com.techlabs.insurance.dto.AgentDto;
import com.techlabs.insurance.dto.AgentGetDto;
import com.techlabs.insurance.dto.EditProfileDto;
import com.techlabs.insurance.dto.JwtAuthResponse;
import com.techlabs.insurance.dto.LoginDto;
import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.entity.Agent;

public interface AgentService {
	
	JwtAuthResponse agentLogin(LoginDto logindto);
	AgentGetDto getAgentByUsername(String username);
	Message addAgent(AgentDto agentDto);
	Page<AgentGetDto> getAllAgents(Pageable pageable);
	Message editAgent(EditProfileDto editProfileDto);
	Message inActiveAgent(long id);
	Message ActiveAgent(long id);
	Agent getAgentDetail(String username);
	Message makeClaim(AgentClaimDto agentClaimDto);
	Page<AccountDto> getAllAccounts(Pageable pageable, long id);
	
	 AgentDto getAgentById(Long id);
	    void createAgent(AgentDto agentDto);
	    void updateAgent(Long id, AgentDto agentDto);
	    void deleteAgent(Long id);
}
