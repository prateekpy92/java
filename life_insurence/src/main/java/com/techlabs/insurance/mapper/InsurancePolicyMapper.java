package com.techlabs.insurance.mapper;

import java.time.ZoneId;

import com.techlabs.insurance.dto.InsurancePolicyDto;
import com.techlabs.insurance.entity.InsurancePolicy;

public class InsurancePolicyMapper {

    public static InsurancePolicyDto toDto(InsurancePolicy policy) {
        if (policy == null) {
            return null;
        }

        InsurancePolicyDto dto = new InsurancePolicyDto();
        dto.setPolicyId(policy.getPolicyNo()); // Adjust according to your actual method
//        dto.setPolicyName(policy.getPolicyName());
        dto.setStartDate(policy.getIssueDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime());
        dto.setEndDate(policy.getMaturityDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime());

        return dto;
    }
}
