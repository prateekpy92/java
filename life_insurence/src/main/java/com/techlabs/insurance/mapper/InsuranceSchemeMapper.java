package com.techlabs.insurance.mapper;

import java.util.HashSet;
import java.util.Set;

import com.techlabs.insurance.dto.AddSchemeDto;
import com.techlabs.insurance.dto.EditSchemeDto;
import com.techlabs.insurance.dto.GetSchemeDetailDto;
import com.techlabs.insurance.dto.GetSchemeDto;
import com.techlabs.insurance.dto.GetSchemeDto1;
import com.techlabs.insurance.entity.InsuranceScheme;
import com.techlabs.insurance.entity.SchemeDetail;
import com.techlabs.insurance.entity.SchemeDocument;

public class InsuranceSchemeMapper {

    public static InsuranceScheme addSchemeDtoToScheme(AddSchemeDto addSchemeDto) {
        InsuranceScheme insuranceScheme = new InsuranceScheme();
        SchemeDetail schemeDetail = new SchemeDetail();

        schemeDetail.setDescription(addSchemeDto.getDescription());
        schemeDetail.setInstallmentCommRatio(addSchemeDto.getInstallmentCommRatio());
        schemeDetail.setMaxAge(addSchemeDto.getMaxAge());
        schemeDetail.setMaxAmount(addSchemeDto.getMaxAmount());
        schemeDetail.setMaxInvestmentTime(addSchemeDto.getMaxInvestmentTime());
        schemeDetail.setMinAge(addSchemeDto.getMinAge());
        schemeDetail.setMinAmount(addSchemeDto.getMinAmount());
        schemeDetail.setMinInvestmentTime(addSchemeDto.getMinInvestmentTime());
        schemeDetail.setProfitRatio(addSchemeDto.getProfitRatio());
        schemeDetail.setRegistrationCommRatio(addSchemeDto.getRegistrationCommRatio());
        schemeDetail.setSchemeImage(addSchemeDto.getSchemeImage());

        insuranceScheme.setSchemeName(addSchemeDto.getSchemeName());
        insuranceScheme.setSchemeDetail(schemeDetail);

        return insuranceScheme;
    }

    public static InsuranceScheme editSchemeDtoToScheme(EditSchemeDto editSchemeDto, InsuranceScheme scheme) {
        SchemeDetail schemeDetail = scheme.getSchemeDetail();

        scheme.setSchemeName(editSchemeDto.getSchemeName() != null ? editSchemeDto.getSchemeName() : scheme.getSchemeName());
        scheme.setSchemeId(editSchemeDto.getSchemeId());

        schemeDetail.setDescription(editSchemeDto.getDescription() != null ? editSchemeDto.getDescription() : schemeDetail.getDescription());
        schemeDetail.setInstallmentCommRatio(editSchemeDto.getInstallmentCommRatio() != null ? editSchemeDto.getInstallmentCommRatio() : schemeDetail.getInstallmentCommRatio());
        schemeDetail.setMaxAge(editSchemeDto.getMaxAge() != 0 ? editSchemeDto.getMaxAge() : schemeDetail.getMaxAge());
        schemeDetail.setMaxAmount(editSchemeDto.getMaxAmount() != null ? editSchemeDto.getMaxAmount() : schemeDetail.getMaxAmount());
        schemeDetail.setMaxInvestmentTime(editSchemeDto.getMaxInvestmentTime() != 0 ? editSchemeDto.getMaxInvestmentTime() : schemeDetail.getMaxInvestmentTime());
        schemeDetail.setMinAge(editSchemeDto.getMinAge() != 0 ? editSchemeDto.getMinAge() : schemeDetail.getMinAge());
        schemeDetail.setMinAmount(editSchemeDto.getMinAmount() != null ? editSchemeDto.getMinAmount() : schemeDetail.getMinAmount());
        schemeDetail.setMinInvestmentTime(editSchemeDto.getMinInvestmentTime() != 0 ? editSchemeDto.getMinInvestmentTime() : schemeDetail.getMinInvestmentTime());
        schemeDetail.setProfitRatio(editSchemeDto.getProfitRatio() != null ? editSchemeDto.getProfitRatio() : schemeDetail.getProfitRatio());
        schemeDetail.setRegistrationCommRatio(editSchemeDto.getRegistrationCommRatio() != null ? editSchemeDto.getRegistrationCommRatio() : schemeDetail.getRegistrationCommRatio());

     
        String newSchemeImage = editSchemeDto.getSchemeImage() != null ? editSchemeDto.getSchemeImage() : schemeDetail.getSchemeImage();
        schemeDetail.setSchemeImage(newSchemeImage);

        return scheme;
    }

    public static GetSchemeDetailDto schemeToSchemeGetDto(InsuranceScheme sc) {
        GetSchemeDetailDto getSchemeDetailDto = new GetSchemeDetailDto();
        SchemeDetail detail = sc.getSchemeDetail();

        getSchemeDetailDto.setDescription(detail.getDescription());
        getSchemeDetailDto.setMaxAge(detail.getMaxAge());
        getSchemeDetailDto.setMaxAmount(detail.getMaxAmount());
        getSchemeDetailDto.setMaxDuration(detail.getMaxInvestmentTime());
        
        Set<String> docs = new HashSet<>();
        for (SchemeDocument doc : detail.getDocuments()) {
            docs.add(doc.getDocumentName());
        }
        getSchemeDetailDto.setRequierdDocs(docs);
        getSchemeDetailDto.setMinAge(detail.getMinAge());
        getSchemeDetailDto.setMinAmount(detail.getMinAmount());
        getSchemeDetailDto.setMinDuration(detail.getMinInvestmentTime());
        getSchemeDetailDto.setSchemeImage(detail.getSchemeImage());

        return getSchemeDetailDto;
    }

    public static GetSchemeDto schemeToSchemeDto(InsuranceScheme sc) {
        GetSchemeDto schemeDto = new GetSchemeDto();
        schemeDto.setId(sc.getSchemeId());
        schemeDto.setSchemeName(sc.getSchemeName());
        schemeDto.setStatus(sc.isIsactive() ? "Active" : "Inactive");
        
        if (sc.getInsurancePlan() != null) {
        schemeDto.setPlanId(sc.getInsurancePlan().getPlanId());
        } else {
        	  schemeDto.setPlanId(null); 
              System.err.println("InsurancePlan is null for Scheme ID: " + sc.getSchemeId());
          
        }
        return schemeDto;
    }

    public static GetSchemeDto1 schemeToSchemeGetDto1(InsuranceScheme sc) {
        GetSchemeDto1 getSchemeDto = new GetSchemeDto1();
        SchemeDetail detail = sc.getSchemeDetail();

        getSchemeDto.setSchemeId(sc.getSchemeId());
        getSchemeDto.setSchemeName(sc.getSchemeName());
        getSchemeDto.setDescription(detail.getDescription());
        getSchemeDto.setMaxAge(detail.getMaxAge());
        getSchemeDto.setMaxAmount(detail.getMaxAmount());
        getSchemeDto.setMaxDuration(detail.getMaxInvestmentTime());

        Set<String> docs = new HashSet<>();
        for (SchemeDocument doc : detail.getDocuments()) {
            docs.add(doc.getDocumentName());
        }
        getSchemeDto.setRequierdDocs(docs);
        getSchemeDto.setMinAge(detail.getMinAge());
        getSchemeDto.setMinAmount(detail.getMinAmount());
        getSchemeDto.setMinDuration(detail.getMinInvestmentTime());
        getSchemeDto.setSchemeImage(detail.getSchemeImage());
        getSchemeDto.setInstallmentCommRatio(detail.getInstallmentCommRatio());
        getSchemeDto.setProfitRatio(detail.getProfitRatio());
        getSchemeDto.setRegistrationCommRatio(detail.getRegistrationCommRatio());

        return getSchemeDto;
    }
}
