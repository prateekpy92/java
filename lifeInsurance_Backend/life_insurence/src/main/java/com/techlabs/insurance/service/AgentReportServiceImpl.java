package com.techlabs.insurance.service;

import java.util.List;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techlabs.insurance.dto.AgentReportDTO;
import com.techlabs.insurance.dto.ClaimReportDTO;
import com.techlabs.insurance.dto.CommissionReportDTO;
import com.techlabs.insurance.entity.Agent;
import com.techlabs.insurance.exception.InsuranceException;
import com.techlabs.insurance.repository.AgentRepository;

@Service
public class AgentReportServiceImpl implements AgentReportService {
    @Autowired
    private AgentRepository agentRepository;

    public AgentReportDTO generateAgentReport(Long agentId) {
        Agent agent = agentRepository.findById(agentId)
            .orElseThrow(() -> new InsuranceException("Agent not found"));

        AgentReportDTO report = new AgentReportDTO();
        report.setAgentName(agent.getUserDetails().getFirstName() + " " + agent.getUserDetails().getLastName());
        report.setPhone(agent.getUserDetails().getMobileNumber());
        report.setEmail(agent.getUserDetails().getEmail());
        report.setRegion(agent.getUserDetails().getCity());
        report.setTotalCommission(agent.getTotalCommission());
        List<CommissionReportDTO> commissions = agent.getCommissions().stream()
        	    .map(commission -> {
        	        CommissionReportDTO commissionDto = new CommissionReportDTO();
        	        commissionDto.setCommissionId(commission.getCommisionId());
        	        commissionDto.setAmount(commission.getAmount());
        	        commissionDto.setDateEarned(commission.getIssueDate());
        	        commissionDto.setPolicyId(commission.getPolicy() != null ? commission.getPolicy().getPolicyNo().toString() : "N/A");
        	        return commissionDto;
        	    }).collect(Collectors.toList());
        
        List<ClaimReportDTO> claims = agent.getClaims().stream()
        	    .map(claim -> {
        	        ClaimReportDTO claimDto = new ClaimReportDTO();
        	        claimDto.setClaimId(claim.getClaimId());
        	        claimDto.setPolicyId(claim.getPolicy() != null ? claim.getPolicy().getPolicyNo().toString() : "N/A");
        	        claimDto.setClaimStatus(claim.getStatus());
        	        claimDto.setDateFiled(claim.getDate());
        	        claimDto.setClaimAmount(claim.getClaimAmount());
        	        return claimDto;
        	    }).collect(Collectors.toList());
        
        report.setCommissions(commissions);
        report.setClaims(claims);
        return report;
    }

	@Override
	public AgentReportDTO getAgentReportById(Long agentId) {
		// TODO Auto-generated method stub
		return null;
	}
}

