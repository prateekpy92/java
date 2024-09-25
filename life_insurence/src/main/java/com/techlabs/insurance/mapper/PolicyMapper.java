package com.techlabs.insurance.mapper;

import com.techlabs.insurance.dto.AccountDto;
import com.techlabs.insurance.entity.Customer;
import com.techlabs.insurance.entity.InsurancePolicy;

public class PolicyMapper {

	public static AccountDto policyToAccountDto(InsurancePolicy p,Customer ct) {
		
		AccountDto ac = new AccountDto();
		ac.setPolicyNo(p.getPolicyNo());
		ac.setMaturityDate(p.getMaturityDate());
		ac.setUsername(ct.getLogin().getUsername());
		ac.setIssueDate(p.getIssueDate());
		ac.setClaims(p.getClaims());
		ac.setInsuranceScheme(p.getInsuranceScheme().getSchemeName());
		ac.setNominees(p.getNominees());
		ac.setPayments(p.getPayments());
		ac.setPremiumAmount(p.getPremiumAmount());
		ac.setPremiumType(p.getPremiumType().toString());
		ac.setSumAssured(p.getSumAssured());
		ac.setStatus(p.getStatus().toString());
		ac.setSubmittedDocuments(p.getSubmittedDocuments());
		return ac;
	}
	
public static AccountDto policyToAccountDto1(InsurancePolicy p) {
		
		AccountDto ac = new AccountDto();
		ac.setPolicyNo(p.getPolicyNo());
		ac.setMaturityDate(p.getMaturityDate());
		ac.setIssueDate(p.getIssueDate());
		ac.setClaims(p.getClaims());
		ac.setInsuranceScheme(p.getInsuranceScheme().getSchemeName());
		ac.setNominees(p.getNominees());
		ac.setPayments(p.getPayments());
		ac.setPremiumAmount(p.getPremiumAmount());
		ac.setPremiumType(p.getPremiumType().toString());
		ac.setSumAssured(p.getSumAssured());
		ac.setStatus(p.getStatus().toString());
		ac.setSubmittedDocuments(p.getSubmittedDocuments());
		return ac;
	}

}
