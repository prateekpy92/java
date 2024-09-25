package com.techlabs.insurance.service;

import java.util.List;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.techlabs.insurance.dto.AddSchemeDto;
import com.techlabs.insurance.dto.EditSchemeDto;
import com.techlabs.insurance.dto.GetSchemeDetailDto;
import com.techlabs.insurance.dto.GetSchemeDto;
import com.techlabs.insurance.dto.GetSchemeDto1;
import com.techlabs.insurance.dto.Message;

public interface InsuranceSchemeService {
	
	Message addScheme(MultipartFile schemeImage);

	Message activeScheme(long schemeId);

	Message editScheme(EditSchemeDto editSchemeDto);

	Message inActiveScheme(long schemeId);

	GetSchemeDetailDto getSchemeByPlan(long planId);

	List<GetSchemeDto> getScheme(long planId);

	List<GetSchemeDto1> getScheme1(long planId);
	Message addScheme(AddSchemeDto addSchemeDto);
	

}
