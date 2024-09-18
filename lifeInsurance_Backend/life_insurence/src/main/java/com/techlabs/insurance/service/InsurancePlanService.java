package com.techlabs.insurance.service;

import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.dto.PlanDto;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.techlabs.insurance.dto.EditPlanDto;

public interface InsurancePlanService {
	
	Message addPlan (PlanDto planDto);
	Message activePlan (Long planId);
	Message inActivePlan (Long PlanId);
	Message editPlan (EditPlanDto editPlanDto);
	Page<PlanDto> getAllPlans(Pageable pageable);
	Page<PlanDto> ActivePlans(Pageable pageable);

}
