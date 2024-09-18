package com.techlabs.insurance.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.techlabs.insurance.dto.AddSchemeDto;
import com.techlabs.insurance.dto.EditSchemeDto;
import com.techlabs.insurance.dto.GetSchemeDetailDto;
import com.techlabs.insurance.dto.GetSchemeDto;
import com.techlabs.insurance.dto.GetSchemeDto1;
import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.entity.InsuranceScheme;
import com.techlabs.insurance.entity.InsurencePlan;
import com.techlabs.insurance.entity.SchemeDocument;
import com.techlabs.insurance.exception.InsuranceException;
import com.techlabs.insurance.mapper.InsuranceSchemeMapper;
import com.techlabs.insurance.repository.InsurancePlanRepository;
import com.techlabs.insurance.repository.InsuranceSchemeRepository;
import com.techlabs.insurance.repository.SchemeDocumentRepository;

@Service
public class InsuranceSchemeServiceImpl implements InsuranceSchemeService {

    @Autowired
    private InsuranceSchemeRepository insuranceSchemeRepository;

    @Autowired
    private InsurancePlanRepository insurancePlanRepository;

    @Autowired
    private SchemeDocumentRepository schemeDocumentRepository;

    @Override
    public Message addScheme(AddSchemeDto addSchemeDto) {
        System.out.println("i am here" + addSchemeDto);
        Optional<InsurencePlan> planOpt = insurancePlanRepository.findById(addSchemeDto.getPlanId());

        if (!planOpt.isPresent()) {
            throw new InsuranceException("Plan with ID " + addSchemeDto.getPlanId() + " does not exist!");
        }

        List<InsuranceScheme> schemes = insuranceSchemeRepository.findAll();
        for (InsuranceScheme scheme : schemes) {
            if (scheme.getSchemeName().equalsIgnoreCase(addSchemeDto.getSchemeName())) {
                throw new InsuranceException("Scheme already exists!");
            }
        }

        Message message = new Message();
        InsuranceScheme insuranceScheme = InsuranceSchemeMapper.addSchemeDtoToScheme(addSchemeDto);
        insuranceScheme.setInsurancePlan(planOpt.get());

        Set<SchemeDocument> docs = new HashSet<>();
        for (long ct : addSchemeDto.getDocuments()) {
            Optional<SchemeDocument> documentOpt = schemeDocumentRepository.findById(ct);
            if (!documentOpt.isPresent()) {
                throw new InsuranceException("Document with ID " + ct + " does not exist!");
            }
            docs.add(documentOpt.get());
        }

        insuranceScheme.getSchemeDetail().setDocuments(docs);
        insuranceScheme.getInsurancePlan().getScheme().add(insuranceScheme);
        insurancePlanRepository.save(insuranceScheme.getInsurancePlan());

        message.setStatus(HttpStatus.OK);
        message.setMessage("Scheme Added Successfully!");
        return message;
    }

    @Override
    public Message activeScheme(long schemeId) {
        Optional<InsuranceScheme> schemeOpt = insuranceSchemeRepository.findById(schemeId);

        if (!schemeOpt.isPresent()) {
            throw new InsuranceException("Scheme with ID " + schemeId + " does not exist!");
        }

        InsuranceScheme scheme = schemeOpt.get();
        if (scheme.isIsactive()) {
            throw new InsuranceException("Scheme is already active!");
        }

        scheme.setIsactive(true);
        insuranceSchemeRepository.save(scheme);

        Message message = new Message();
        message.setStatus(HttpStatus.OK);
        message.setMessage("Scheme Activated successfully!");
        return message;
    }

    @Override
    public Message editScheme(EditSchemeDto editSchemeDto) {
        Optional<InsuranceScheme> schemeOpt = insuranceSchemeRepository.findById(editSchemeDto.getSchemeId());

        if (!schemeOpt.isPresent() || !schemeOpt.get().isIsactive()) {
            throw new InsuranceException("Scheme with ID " + editSchemeDto.getSchemeId() + " does not exist or is not active!");
        }

        InsuranceScheme insuranceScheme = InsuranceSchemeMapper.editSchemeDtoToScheme(editSchemeDto, schemeOpt.get());
        insuranceSchemeRepository.save(insuranceScheme);

        Message message = new Message();
        message.setStatus(HttpStatus.OK);
        message.setMessage("Scheme Updated Successfully!");
        return message;
    }

    @Override
    public Message inActiveScheme(long schemeId) {
        Optional<InsuranceScheme> schemeOpt = insuranceSchemeRepository.findById(schemeId);

        if (!schemeOpt.isPresent()) {
            throw new InsuranceException("Scheme with ID " + schemeId + " does not exist!");
        }

        InsuranceScheme scheme = schemeOpt.get();
        if (scheme.isIsactive()) {
            scheme.setIsactive(false);
            insuranceSchemeRepository.save(scheme);
            Message message = new Message();
            message.setStatus(HttpStatus.OK);
            message.setMessage("Scheme Inactivated successfully!");
            return message;
        } else {
            scheme.setIsactive(true);
            insuranceSchemeRepository.save(scheme);
            Message message = new Message();
            message.setStatus(HttpStatus.OK);
            message.setMessage("Scheme activated successfully!");
            return message;
        }
    }

    @Override
    public GetSchemeDetailDto getSchemeByPlan(long planId) {
        Optional<InsurencePlan> planOpt = insurancePlanRepository.findById(planId);

        if (!planOpt.isPresent()) {
            throw new InsuranceException("Plan with ID " + planId + " does not exist!");
        }

        InsuranceScheme scheme = planOpt.get().getScheme().stream().findFirst()
            .orElseThrow(() -> new InsuranceException("No scheme found for plan ID " + planId));

        return InsuranceSchemeMapper.schemeToSchemeGetDto(scheme);
    }

    @Override
    public List<GetSchemeDto> getScheme(long planId) {
        Optional<InsurencePlan> planOpt = insurancePlanRepository.findById(planId);

        if (!planOpt.isPresent()) {
            throw new InsuranceException("Plan with ID " + planId + " does not exist!");
        }

        List<GetSchemeDto> schemes = new ArrayList<>();
        for (InsuranceScheme sc : planOpt.get().getScheme()) {
            schemes.add(InsuranceSchemeMapper.schemeToSchemeDto(sc));
        }

        if (schemes.isEmpty()) {
            throw new InsuranceException("No schemes found for plan ID " + planId);
        }

        return schemes;
    }

    @Override
    public List<GetSchemeDto1> getScheme1(long planId) {
        Optional<InsurencePlan> planOpt = insurancePlanRepository.findById(planId);

        if (!planOpt.isPresent()) {
            throw new InsuranceException("Plan with ID " + planId + " does not exist!");
        }

        List<GetSchemeDto1> schemes = new ArrayList<>();
        for (InsuranceScheme sc : planOpt.get().getScheme()) {
            schemes.add(InsuranceSchemeMapper.schemeToSchemeGetDto1(sc));
        }

        if (schemes.isEmpty()) {
            throw new InsuranceException("No schemes found for plan ID " + planId);
        }

        return schemes;
    }
}
