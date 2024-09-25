package com.techlabs.insurance.dto;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@ToString
public class PostPolicyDto {

    private long schemeId;
    private long agentId;
    private String username;

    @NotNull
    private long customerId;

    private int duration;
    private int premiumType;
    private Double investMent;

    private List<NomineeDto> nominees = new ArrayList<>();
    private Set<DocumentDto> docs = new HashSet<>();

    // Payment related fields
    private String cardNumber;
    private int cvv;
    private String expiry;
    private String paymentType;

    public long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(long customerId) {
        this.customerId = customerId;
    }

    public long getSchemeId() {
        return schemeId;
    }

    public void setSchemeId(long schemeId) {
        this.schemeId = schemeId;
    }

    public long getAgentId() {
        return agentId;
    }

    public void setAgentId(long agentId) {
        this.agentId = agentId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public int getPremiumType() {
        return premiumType;
    }

    public void setPremiumType(int premiumType) {
        this.premiumType = premiumType;
    }

    public Double getInvestMent() {
        return investMent;
    }

    public void setInvestMent(Double investMent) {
        this.investMent = investMent;
    }

    public List<NomineeDto> getNominees() {
        return nominees;
    }

    public void setNominees(List<NomineeDto> nominees) {
        this.nominees = nominees;
    }

    public Set<DocumentDto> getDocs() {
        return docs;
    }

    public void setDocs(Set<DocumentDto> docs) {
        this.docs = docs;
    }

    // Getters and Setters for payment-related fields
    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public int getCvv() {
        return cvv;
    }

    public void setCvv(int cvv) {
        this.cvv = cvv;
    }

    public String getExpiry() {
        return expiry;
    }

    public void setExpiry(String expiry) {
        this.expiry = expiry;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }
}
