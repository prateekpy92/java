package com.techlabs.insurance.controller;

import java.io.IOException;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.techlabs.insurance.dto.CustomerGetDto;
import com.techlabs.insurance.dto.CustomerPostDto;
import com.techlabs.insurance.dto.EditProfileDto;
import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.dto.PaymentDto;
import com.techlabs.insurance.dto.SessionDto;
import com.techlabs.insurance.entity.Customer;
import com.techlabs.insurance.entity.Payment;
import com.techlabs.insurance.entity.UserDetails;
import com.techlabs.insurance.service.CustomerReportServiceImpl;
import com.techlabs.insurance.service.CustomerService;
import com.techlabs.insurance.service.DocumentService;
//import com.techlabs.insurance.utility.PdfCustomerReportGenerator;
import com.techlabs.insurance.service.PolicyService;
//import com.techlabs.insurance.service.StripeService;

@RestController
@RequestMapping("insuranceapp")
public class CustomerController {

	@Autowired
	private CustomerService customerService;
	@Autowired
	private PolicyService policyService;
	@Autowired
	private CustomerReportServiceImpl customerReportService;
	@Autowired
	private DocumentService documentService;

	@GetMapping("/getCustomerByUsername")
	// @PreAuthorize("hasRole('CUSTOMER')")
	ResponseEntity<CustomerGetDto> getCustomerByUsername(@RequestParam String username) {

		CustomerGetDto customerGetDto = customerService.getcustomerByUsername(username);

		return ResponseEntity.ok(customerGetDto);

	}

	@PutMapping("/editCustomer")
	// @PreAuthorize("hasRole('CUSTOMER')")
	ResponseEntity<Message> editCustomer(@RequestBody EditProfileDto editProfileDto) {

		Message message = customerService.editCustomer(editProfileDto);

		return ResponseEntity.ok(message);

	}

	// @PreAuthorize("hasRole('CUSTOMER')")
	@PostMapping("/{customerId}/uploadDocuments")
	public String uploadCustomerDocuments(@RequestParam("aadhaarCard") MultipartFile aadhaarCard,
			@RequestParam("panCard") MultipartFile panCard) throws IOException {
		documentService.saveCustomerDocuments(aadhaarCard, panCard);
		return "Documents uploaded successfully";
	}

	// @PreAuthorize("hasRole('CUSTOMER')")
	@PostMapping("/register")
	public ResponseEntity<Customer> registerCustomer(@RequestBody CustomerPostDto customerPostDto) {
		Customer customer = customerService.registerCustomer(customerPostDto);
		return ResponseEntity.ok(customer);
	}

//	 @GetMapping("/download-customer-report")
//	    public void downloadCustomerReport(@RequestParam Long customerId, HttpServletResponse response) throws IOException, DocumentException {
//	        response.setContentType("application/pdf");
//	        String fileName = "customer_report_" + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + ".pdf";
//	        response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
//
//	        CustomerReportDTO customerReport = customerReportService.generateCustomerReport(customerId);
//	        PdfCustomerReportGenerator pdfGenerator = new PdfCustomerReportGenerator();
//	        pdfGenerator.generate(customerReport, response);
//	    }

//	    @Autowired
//	    private PdfCustomerReportGenerator pdfCustomerReportGenerator;
//
//	    @GetMapping("/{id}/CustomerReport")
//	    public void downloadCustomerReport(@PathVariable Long id, HttpServletResponse response) throws DocumentException, IOException {
//	        response.setContentType("application/pdf");
//	        response.setHeader("Content-Disposition", "attachment; filename=customer_report.pdf");
//	        
//	        CustomerReportDTO customerReport = customerReportService.generateCustomerReport(id);
//	        pdfCustomerReportGenerator.generate(customerReport, response);
//	    }

	@GetMapping("/my-payments")
	public ResponseEntity<List<Payment>> getCustomerPayments(@RequestParam Long policyId,
			@AuthenticationPrincipal UserDetails userDetails) {
		Long customerId = userDetails.getUserDetailsId();

		List<Payment> payments = policyService.getPaymentsForCustomer(policyId, customerId);

		return ResponseEntity.ok().body(payments);
	}

	@GetMapping("/get_customer_id")
	public ResponseEntity<?> getCustomerId(@RequestParam String username) {
		CustomerGetDto customerId = customerService.getcustomerByUsername(username);
		if (customerId != null) {
			return ResponseEntity.ok(customerId);
		} else {
			return ResponseEntity.status(404).body("Customer not found");
		}
	}

}