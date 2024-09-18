package com.techlabs.insurance.mapper;

import com.techlabs.insurance.dto.PlanDto;
import com.techlabs.insurance.entity.InsurencePlan;

public class PlanMapper {

	public static PlanDto planToPlanDto(InsurencePlan plan) {
		PlanDto planDto = new PlanDto();
		planDto.setPlanId(plan.getPlanId());
		planDto.setPlanName(plan.getPlanName());
		planDto.setStatus(plan.isIsactive()==true?"Active":"Inactive");
		return planDto;
	}

}
