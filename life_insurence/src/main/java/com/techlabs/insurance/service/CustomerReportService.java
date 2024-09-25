package com.techlabs.insurance.service;

import com.techlabs.insurance.dto.CustomerReportDTO;

public interface CustomerReportService {
    CustomerReportDTO getCustomerReportById(Long customerId);
}

