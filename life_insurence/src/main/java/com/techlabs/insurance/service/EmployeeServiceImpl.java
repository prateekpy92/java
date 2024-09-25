package com.techlabs.insurance.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.techlabs.insurance.dto.AddEmployeeDto;
import com.techlabs.insurance.dto.EditProfileDto;
import com.techlabs.insurance.dto.JwtAuthResponse;
import com.techlabs.insurance.dto.LoginDto;
import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.dto.ShowEmployeeDto;
import com.techlabs.insurance.entity.Employee;
import com.techlabs.insurance.entity.Login;
import com.techlabs.insurance.entity.Role;
import com.techlabs.insurance.entity.UserDetails;
import com.techlabs.insurance.exception.InsuranceException;
import com.techlabs.insurance.mapper.EmployeeMapper;
import com.techlabs.insurance.repository.EmployeeRepository;
import com.techlabs.insurance.repository.LoginRepository;
import com.techlabs.insurance.repository.RoleRepository;
import com.techlabs.insurance.repository.UserDetailsRepository;
import com.techlabs.insurance.security.JwtTokenProvider;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private LoginRepository loginRepository;
	@Autowired
	private UserDetailsRepository userDetailsRepository;

	@Override
	public JwtAuthResponse employeeLogin(LoginDto logindto) {
		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(logindto.getUserName(), logindto.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String token = jwtTokenProvider.generateToken(authentication);

			JwtAuthResponse response = new JwtAuthResponse();
			response.setTokenType("Bearer");
			response.setAccessToken(token);
			response.setUsername(authentication.getName());
			response.setRoleType(authentication.getAuthorities().iterator().next().toString());

			if (!response.getRoleType().equals(logindto.getRoleType())) {
				throw new InsuranceException("Employee not found!");
			}
			return response;

		} catch (BadCredentialsException e) {
			throw new InsuranceException("Bad credentials provided.");
		}
	}

	@Override
	public Message addEmployee(AddEmployeeDto addEmployeeDto) {
		List<Login> admindb = loginRepository.findAll();
		System.out.println("addadmin dto value " + addEmployeeDto);

		for (Login log : admindb) {
			if (addEmployeeDto.getUsername().equals(log.getUsername())) {
				throw new InsuranceException("Username already used!");
			}
		}

		Employee emp = EmployeeMapper.addEmployeeDtoToEmployee(addEmployeeDto);
		Login login = new Login();
		login.setUsername(addEmployeeDto.getUsername());
		login.setPassword(passwordEncoder.encode(addEmployeeDto.getPassword())); 

		Set<Role> role = new HashSet<>();
		Role userRole = roleRepository.findByRolename("ROLE_Employee").get();
		role.add(userRole);
		login.setRoles(role);
		emp.setLogin(login);
		employeeRepository.save(emp);
		Message message = new Message();
		message.setStatus(HttpStatus.OK);
		message.setMessage("Employee saved successfully!");
		return message;
	}

	@Override
	public Message editEmployee(EditProfileDto editEmployeeDto) {
		Optional<Employee> employee = employeeRepository.findById(editEmployeeDto.getId());

		if (!employee.isPresent() || !employee.get().isActive())
			throw new InsuranceException("Employee doesn't exists!");

		Message message = new Message();
		Employee emp = EmployeeMapper.editEmployeeDtoToEmployee(editEmployeeDto, employee.get());

		System.out.println("final>>>>>>>>>>>>>>>>>>>>" + emp);
		employeeRepository.save(emp);
		message.setStatus(HttpStatus.OK);
		message.setMessage("employee Updated Successfully!");
		return message;

	}

	@Override
	public Message activeEmployee(Long employeeId) {
		Employee employee = employeeRepository.findById(employeeId)
				.orElseThrow(() -> new InsuranceException("Employee doesn't exist!"));

		if (employee.isActive()) {
			throw new InsuranceException("Employee is already active!");
		}

		employee.setActive(true);
		employeeRepository.save(employee);

		Message message = new Message();
		message.setStatus(HttpStatus.OK);
		message.setMessage("Employee activated successfully!");
		return message;
	}

	@Override
	public Message inActiveEmployee(Long employeeId) {
		Employee employee = employeeRepository.findById(employeeId)
				.orElseThrow(() -> new InsuranceException("Employee doesn't exist!"));

		if (!employee.isActive()) {
			throw new InsuranceException("Employee is already inactive!");
		}

		employee.setActive(false);
		employeeRepository.save(employee);

		Message message = new Message();
		message.setStatus(HttpStatus.OK);
		message.setMessage("Employee inactivated successfully!");
		return message;
	}

	@Override
	public Page<ShowEmployeeDto> getAllEmployee(Pageable pageable) {
		Page<Employee> employees = employeeRepository.findAll(pageable);

		if (employees.isEmpty()) {
			throw new InsuranceException("No Employee found!");
		}

		return employees.map(EmployeeMapper::EmployeeToShowEmployeeDto);
	}

	@Override
	public Employee getEmployeeByUsername(String username) {
		return employeeRepository.findAll().stream().filter(emp -> emp.getLogin().getUsername().equals(username))
				.findFirst().orElseThrow(() -> new InsuranceException("Employee not found"));
	}
//	public Message toggleEmployeeStatus(Long employeeId, boolean isActive) {
//	    Employee employee = employeeRepository.findById(employeeId)
//	        .orElseThrow(() -> new InsuranceException("Employee not found"));
//
//	  
//	    employee.setActive(isActive);
//
//	    employeeRepository.save(employee);
//	    return new Message(HttpStatus.ACCEPTED,"Employee status updated successfully");
//	}

	@Override
	public Message toggleEmployeeStatus(Long employeeId, boolean isActive) {
	    Employee employee = employeeRepository.findById(employeeId)
	            .orElseThrow(() -> new InsuranceException("Employee not found"));

	   	    employee.setActive(isActive);

	    employeeRepository.save(employee);
	    return new Message(HttpStatus.ACCEPTED, "Employee status updated successfully");
	}

	@Override
	public Message toggleEmployeeStatus(Long employeeId, String isActive) {
		// TODO Auto-generated method stub
		return null;
	}


}
