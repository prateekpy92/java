package com.techlabs.insurance.controller;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.techlabs.insurance.dto.AgentGetDto;
import com.techlabs.insurance.dto.EditProfileDto;
import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.entity.Employee;
import com.techlabs.insurance.entity.UserDetails;
import com.techlabs.insurance.service.AgentService;
import com.techlabs.insurance.service.EmployeeService;

@RestController
@RequestMapping("/insuranceapp")
public class EmployeeController {
	@Autowired
	private EmployeeService employeeService;
	
	
	@Autowired
	private AgentService agentService;
	
	@GetMapping("/employee")
	//@PreAuthorize("hasRole('EMPLOYEE')")
	ResponseEntity<Employee> getEmployeeByUsername( @RequestParam String username) {

		 Employee emp= employeeService.getEmployeeByUsername(username);

		return ResponseEntity.ok(emp);

	}



	//@PreAuthorize("hasRole('EMPLOYEE')")
    @PutMapping("/employee")
    public ResponseEntity<Message> editEmployee(@RequestBody EditProfileDto editProfileDto) {
        System.out.println("Inside editEmployee: " + editProfileDto);
        Message msg = employeeService.editEmployee(editProfileDto);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }
	
	//@PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
	@PostMapping("/employee1")
	public ResponseEntity<Message> toggleEmployeeStatus(@RequestParam Long employeeId, @RequestParam boolean isActive) {
	    System.out.println("Toggling employee status for ID: " + employeeId + " to " + (isActive ? "ACTIVE" : "INACTIVE"));
	    Message msg = employeeService.toggleEmployeeStatus(employeeId, isActive);
	    return new ResponseEntity<>(msg, HttpStatus.OK);
	}


	@GetMapping("/allAgents")
	//@PreAuthorize("hasAnyRole('EMPLOYEE', 'ADMIN','CUSTOMER')")
	ResponseEntity<Page<AgentGetDto>>getAllAgents(@RequestParam int pageNumber, @RequestParam int pageSize) {
		
		 Pageable pageable=PageRequest.of(pageNumber, pageSize); 

		 Page<AgentGetDto>page= agentService.getAllAgents(pageable);
		 HttpHeaders headers = new HttpHeaders();
		 headers.add("Agent-Count", String.valueOf(page.getTotalElements()));
		 return ResponseEntity.ok().headers(headers).body(page);	
	}
	

	
}
