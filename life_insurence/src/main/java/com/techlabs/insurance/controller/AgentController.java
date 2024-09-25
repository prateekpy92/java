package com.techlabs.insurance.controller;


import java.sql.Date;
import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.itextpdf.io.exceptions.IOException;
import com.lowagie.text.DocumentException;
import com.techlabs.insurance.dto.AccountDto;
import com.techlabs.insurance.dto.AgentClaimDto;
import com.techlabs.insurance.dto.AgentGetDto;
import com.techlabs.insurance.dto.AgentReportDTO;
import com.techlabs.insurance.dto.CustomerGetDto;
import com.techlabs.insurance.dto.CustomerPostDto;
import com.techlabs.insurance.dto.EditProfileDto;
import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.entity.Agent;
import com.techlabs.insurance.service.AgentReportService;
import com.techlabs.insurance.service.AgentReportServiceImpl;
import com.techlabs.insurance.service.AgentService;
import com.techlabs.insurance.service.CustomerService;
import com.techlabs.insurance.service.EmployeeService;
import com.techlabs.insurance.utility.PdfAgentReportGenerator;

import jakarta.servlet.http.HttpServletResponse;


@RestController
@RequestMapping("/insuranceapp")
public class AgentController {
	 @Autowired
	    private AgentReportServiceImpl agentReportService;
	 
	@Autowired
	private EmployeeService employeeService;
	@Autowired
	private CustomerService customerService;
	@Autowired
	private AgentService agentService;
	 @Autowired
	    private PdfAgentReportGenerator pdfAgentReportGenerator;
	
	 @Autowired
	    private AgentReportService agentReportServices;
	@GetMapping("/getAgentByUsername")
	//@PreAuthorize("hasRole('AGENT')")
	ResponseEntity<AgentGetDto> getAgentByUsername( @RequestParam String username) {

		 AgentGetDto agentGetDto= agentService.getAgentByUsername(username);

		return ResponseEntity.ok(agentGetDto);
     }
	
	
	
	
	@PutMapping("/editAgent")
	//@PreAuthorize("hasRole('AGENT')")
	ResponseEntity<Message>editAgent(@RequestBody EditProfileDto agentGetDto ){
		 
		System.out.println("agent>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
		 Message message= agentService.editAgent(agentGetDto);
		
		return ResponseEntity.ok(message);
		
	}
	
	
	
	@DeleteMapping("/agent")
	//@PreAuthorize("hasRole('ADMIN')")
	ResponseEntity<Message>inActiveAgent(@RequestParam long id){
		
		Message message = agentService.inActiveAgent(id);
		
		return ResponseEntity.ok(message);
		
	}
//	
//	
	
	

	@GetMapping("/getAgentDetails")
	ResponseEntity<Agent> getAgentDetails(@RequestParam String username){
		Agent agent=agentService.getAgentDetail(username);
		return ResponseEntity.ok(agent);
	}
	//@PreAuthorize("hasRole('AGENT')")
	@PostMapping("/claim")
	ResponseEntity<Message>claim(@RequestBody AgentClaimDto agentClaimDto){
		Message message=agentService.makeClaim(agentClaimDto);
		return ResponseEntity.ok(message);
		
	}
	
	
	@GetMapping("/getAllAccount")
	//@PreAuthorize("hasRole('AGENT') or hasRole('EMPLOYEE')")
	ResponseEntity<Page<AccountDto>>getAllAccount(@RequestParam int pageNumber, @RequestParam int pageSize,@RequestParam long id) {
		
		 Pageable pageable=PageRequest.of(pageNumber, pageSize); 

		 Page<AccountDto>acc= agentService.getAllAccounts(pageable,id);
		 HttpHeaders headers = new HttpHeaders();
		 headers.add("customer-account", String.valueOf(acc.getTotalElements()));
		 return ResponseEntity.ok().headers(headers).body(acc);
	

	}
	@GetMapping("/getAllCustomers")
	//@PreAuthorize("hasAnyRole('EMPLOYEE', 'AGENT')")
	ResponseEntity<Page<CustomerGetDto>>getAllCustomers(@RequestParam int pageNumber, @RequestParam int pageSize) {
		 System.out.println("Request Parameters - pageNumber: " + pageNumber + ", pageSize: " + pageSize);
		    
		 Pageable pageable=PageRequest.of(pageNumber, pageSize); 

		 Page<CustomerGetDto>page= customerService.getAllCustomer(pageable);
		 HttpHeaders headers = new HttpHeaders();
		 headers.add("customer-count", String.valueOf(page.getTotalElements()));
		 return ResponseEntity.ok().headers(headers).body(page);

		

	}
	@PostMapping("/addcustomer")
//@PreAuthorize("hasRole('AGENT')")
	ResponseEntity<String> addCustomer( @RequestBody CustomerPostDto customerDto) {

		String message = customerService.addcustomer(customerDto);
        
		return ResponseEntity.ok(message);

	}
	@GetMapping("/getCustomerAccount")
	//@PreAuthorize("hasRole('AGENT')")
	ResponseEntity<Page<AccountDto>>getCustomerAccount(@RequestParam int pageNumber, @RequestParam int pageSize,@RequestParam long id) {
		
		 Pageable pageable=PageRequest.of(pageNumber, pageSize); 

		 Page<AccountDto>acc= customerService.getCustomerAccounts(pageable,id);
		 HttpHeaders headers = new HttpHeaders();
		 headers.add("customer-account", String.valueOf(acc.getTotalElements()));
		 return ResponseEntity.ok().headers(headers).body(acc);
	

	}
	//@PreAuthorize("hasRole('AGENT')")
	 @GetMapping("/{id}/agentReport")
	    public ResponseEntity<AgentReportDTO> getAgentReport(@PathVariable Long id) {
	        AgentReportDTO report = agentReportService.generateAgentReport(id);
	        return ResponseEntity.ok(report);
	    }
	
	//@PreAuthorize("hasRole('AGENT')")
	@GetMapping("/{id}/agentReportPdf")
	public ResponseEntity<byte[]> getAgentReportPdf(@PathVariable Long id) {
	    AgentReportDTO report = agentReportService.generateAgentReport(id); 
	    return pdfAgentReportGenerator.generatePdfReport(report);
	}
	
	@GetMapping("/generateAgentReportPdf")
	public ResponseEntity<byte[]> generateAgentReportPdf(@RequestParam Long agentId) {
	    AgentReportDTO report = agentReportService.generateAgentReport(agentId);
	    return pdfAgentReportGenerator.generatePdfReport(report);
	}
	@PreAuthorize("hasRole('AGENT')")
	@PostMapping("/generateReport/{agentId}")
    public ResponseEntity<byte[]> generateReport(@PathVariable Long agentId) {
        // Fetch the report data for the agent
        AgentReportDTO report = agentReportService.generateAgentReport(agentId);

        // Generate PDF and return as response
        return pdfAgentReportGenerator.generatePdfReport(report);
    }

//	  @GetMapping("/download-agent-report")
//	    public void downloadAgentReport(@RequestParam Long agentId, HttpServletResponse response) throws IOException, DocumentException, java.io.IOException {
//	        response.setContentType("application/pdf");
//	        String fileName = "agent_report_" + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date(agentId)) + ".pdf";
//	        response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
//
//	        AgentReportDTO agentReport = agentReportService.generateAgentReport(agentId);
//	        PdfAgentReportGenerator pdfGenerator = new PdfAgentReportGenerator();
//	        pdfGenerator.generate(agentReport, response);
//	    }
//	

    // Assuming you have a service layer for fetching agent data

//    @Autowired
//    private PdfAgentReportGenerator pdfAgentReportGenerator;
//
//    @GetMapping("/{id}/report/pdf")
//    public void downloadAgentReport(@PathVariable Long id, HttpServletResponse response) throws DocumentException, IOException, java.io.IOException {
//        AgentReportDTO agentReport = agentReportServices.generateAgentReport(id);
//        pdfAgentReportGenerator.generate(agentReport, response);
//    }
}