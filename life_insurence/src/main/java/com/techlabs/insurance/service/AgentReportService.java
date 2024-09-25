package com.techlabs.insurance.service;


import com.techlabs.insurance.dto.AgentReportDTO;

public interface AgentReportService {
    AgentReportDTO getAgentReportById(Long agentId);

	AgentReportDTO generateAgentReport(Long id);
}
