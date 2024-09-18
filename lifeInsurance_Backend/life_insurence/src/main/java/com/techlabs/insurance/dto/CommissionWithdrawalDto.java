package com.techlabs.insurance.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.techlabs.insurance.entity.Agent;

public class CommissionWithdrawalDto {

    private Long id;  // ID of the withdrawal
    private Double amount;
    private LocalDate withdrawalDate;
    private Long agentId;  // Reference to the agent ID

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDate getWithdrawalDate() {
        return withdrawalDate;
    }

    public void setWithdrawalDate(LocalDate localDate) {
        this.withdrawalDate = localDate;
    }

    public Long getAgentId() {
        return agentId;
    }

    public void setAgentId(long l) {
        this.agentId = l;
    }

	
}
