package com.techlabs.insurance.dto;

import java.sql.Date;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.util.Pair;

import com.techlabs.insurance.entity.Agent;
import com.techlabs.insurance.entity.Claim;
import com.techlabs.insurance.entity.InsuranceScheme;
import com.techlabs.insurance.entity.Nominee;
import com.techlabs.insurance.entity.Payment;
import com.techlabs.insurance.entity.PremiumType;
import com.techlabs.insurance.entity.SubmittedDocument;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
     private int duration;
	 private int premiumType;
     private Double investMent;
     private List<NomineeDto> nominees=new ArrayList<>();
     private Set<DocumentDto> docs=new HashSet<>();
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
	   
	    
}
