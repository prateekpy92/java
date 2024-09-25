package com.techlabs.insurance.service;

import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import com.techlabs.insurance.dto.AddEmployeeDto;
import com.techlabs.insurance.dto.CustomerGetDto;
import com.techlabs.insurance.dto.EditProfileDto;
import com.techlabs.insurance.dto.JwtAuthResponse;
import com.techlabs.insurance.dto.LoginDto;
import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.dto.ShowEmployeeDto;
import com.techlabs.insurance.entity.Employee;

public interface EmployeeService{

	Message addEmployee(AddEmployeeDto addEmployeeDto);
    Message editEmployee(EditProfileDto editEmployeeDto);
    Message activeEmployee(Long employeeId);
    Message inActiveEmployee(Long employeeId);
    Page<ShowEmployeeDto> getAllEmployee(Pageable pageable);
    JwtAuthResponse employeeLogin(LoginDto logindto);
	Employee getEmployeeByUsername(String username);
	Message toggleEmployeeStatus(Long employeeId, boolean isActive);
	Message toggleEmployeeStatus(Long employeeId, String isActive);
}
