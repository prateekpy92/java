package com.techlabs.insurance.service;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.techlabs.insurance.dto.AccountDto;
import com.techlabs.insurance.dto.CustomerGetDto;
import com.techlabs.insurance.dto.CustomerPostDto;
import com.techlabs.insurance.dto.EditProfileDto;
import com.techlabs.insurance.dto.JwtAuthResponse;
import com.techlabs.insurance.dto.LoginDto;
import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.entity.Agent;
import com.techlabs.insurance.entity.Customer;

public interface CustomerService {
	
	

	CustomerGetDto getcustomerByUsername(String username);

	Page<CustomerGetDto> getAllCustomer(Pageable pageable);

	Message inActiveCustomer(long id);

	Message ActiveCustomer(long id);

	Message editCustomer(EditProfileDto editCustomerDto);

	String addcustomer(CustomerPostDto customerDto);

	JwtAuthResponse customerLogin(LoginDto logindto);

	Page<AccountDto> getCustomerAccounts(Pageable pageable, long id);

	void saveDocument(Long customerId, MultipartFile aadhaarCard, MultipartFile panCard) throws IOException;

	Customer registerCustomer(CustomerPostDto customerPostDto);

	 CustomerPostDto getCustomerById(Long id);
	    void createCustomer(CustomerPostDto customerPostDto);
	    void updateCustomer(Long id, CustomerPostDto customerPostDto);
	    void deleteCustomer(Long id);

		Long findCustomerIdByUsername(String username);

}
