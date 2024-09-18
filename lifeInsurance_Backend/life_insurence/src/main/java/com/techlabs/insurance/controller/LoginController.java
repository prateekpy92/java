package com.techlabs.insurance.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.header.Header;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.function.ServerRequest.Headers;

import com.techlabs.insurance.dto.AgentGetDto;
import com.techlabs.insurance.dto.CustomerGetDto;
import com.techlabs.insurance.dto.JwtAuthResponse;
import com.techlabs.insurance.dto.LoginDto;
import com.techlabs.insurance.entity.Customer;
import com.techlabs.insurance.entity.Employee;
import com.techlabs.insurance.exception.InsuranceException;
import com.techlabs.insurance.service.AdminService;
import com.techlabs.insurance.service.AgentService;
import com.techlabs.insurance.service.CustomerService;
import com.techlabs.insurance.service.EmployeeService;
import com.techlabs.insurance.service.OtpService;
import com.techlabs.insurance.service.PasswordResetService;

@RequestMapping("/insuranceapp")
@RestController
public class LoginController {

	@Autowired
	private AdminService adminService;
	@Autowired
	private EmployeeService employeeService;
	@Autowired
	private AgentService agentService;
	@Autowired
	private CustomerService customerService;

	@Autowired
	private OtpService otpService;

	@Autowired
	private PasswordResetService passwordResetService;

	@PostMapping("/login")
	public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto) {

		JwtAuthResponse jwtAuthResponce = null;

		if (loginDto.getRoleType().equals("ROLE_ADMIN")) {

			System.out.println("dto value is---------- " + loginDto.getRoleType());
			jwtAuthResponce = adminService.adminLogin(loginDto);
		}

		else if (loginDto.getRoleType().equals("ROLE_CUSTOMER")) {
			CustomerGetDto ct = customerService.getcustomerByUsername(loginDto.getUserName());
			if (ct.getStatus().equals("false"))
				throw new InsuranceException("Customer not found!");
			System.out.println("dto value is---------- " + loginDto.getRoleType());
			jwtAuthResponce = customerService.customerLogin(loginDto);

		}

		else if (loginDto.getRoleType().equals("ROLE_EMPLOYEE")) {
			Employee em = employeeService.getEmployeeByUsername(loginDto.getUserName());
			if (em.isActive() == false)
				throw new InsuranceException("Employee not found!");
			System.out.println("dto value is---------- " + loginDto.getRoleType());
			jwtAuthResponce = employeeService.employeeLogin(loginDto);

		} else if (loginDto.getRoleType().equals("ROLE_AGENT")) {
			AgentGetDto agent = agentService.getAgentByUsername(loginDto.getUserName());
			if (agent.getStatus().equals("false"))
				throw new InsuranceException("Agent not found!");
			System.out.println("dto value is---------- " + loginDto.getRoleType());
			jwtAuthResponce = agentService.agentLogin(loginDto);

		}

		else {
			throw new InsuranceException("RoleType not found!");
		}
		return ResponseEntity.ok(jwtAuthResponce);

	}

	@PostMapping("/validateUser")
	public ResponseEntity<String> validator(@RequestParam String token) {
		return new ResponseEntity<>(adminService.validateuser(token), HttpStatus.OK);
	}

	@PostMapping("/forgot-password")
	public ResponseEntity<String> forgotPassword(@RequestParam String email) {
		otpService.sendOtpToEmail(email);
		return ResponseEntity.ok("OTP has been sent to your email");
	}

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtpAndResetPassword(
            @RequestParam String email, 
            @RequestParam String otp,
            @RequestParam String newPassword, 
            @RequestParam String confirmPassword) {

        boolean isReset = passwordResetService.verifyOtpAndResetPassword(email, otp, newPassword, confirmPassword);

        if (isReset) {
            return ResponseEntity.ok("Password has been reset successfully");
        } else {
            return ResponseEntity.badRequest().body("OTP verification failed");
        }
    }
}
