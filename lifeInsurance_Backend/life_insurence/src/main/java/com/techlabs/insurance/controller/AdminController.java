package com.techlabs.insurance.controller;

import java.util.List;

//import org.modelmapper.internal.bytebuddy.implementation.bind.annotation.Default;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.techlabs.insurance.dto.AccountDto;
import com.techlabs.insurance.dto.AddEmployeeDto;
import com.techlabs.insurance.dto.AddSchemeDto;
import com.techlabs.insurance.dto.AdminGetDto;
import com.techlabs.insurance.dto.AdminPostDto;
import com.techlabs.insurance.dto.AgentDto;
import com.techlabs.insurance.dto.ClaimApproveDto;
import com.techlabs.insurance.dto.EditPlanDto;
import com.techlabs.insurance.dto.EditSchemeDto;
import com.techlabs.insurance.dto.GetPolicyDto;
import com.techlabs.insurance.dto.GetSchemeDetailDto;
import com.techlabs.insurance.dto.GetSchemeDto;
import com.techlabs.insurance.dto.GetSchemeDto1;
import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.dto.PaymentDto;
import com.techlabs.insurance.dto.PlanDto;
import com.techlabs.insurance.dto.PolicyClaimDto;
import com.techlabs.insurance.dto.PostPolicyDto;
import com.techlabs.insurance.dto.ShowEmployeeDto;
import com.techlabs.insurance.entity.Agent;
import com.techlabs.insurance.entity.Document;
import com.techlabs.insurance.entity.InsurancePolicy;
import com.techlabs.insurance.exception.InsuranceException;
import com.techlabs.insurance.service.AdminService;
import com.techlabs.insurance.service.AgentService;
import com.techlabs.insurance.service.CustomerService;
import com.techlabs.insurance.service.DocumentService;
import com.techlabs.insurance.service.EmployeeService;
import com.techlabs.insurance.service.InsurancePlanService;
import com.techlabs.insurance.service.InsuranceSchemeService;
import com.techlabs.insurance.service.PolicyService;



@RequestMapping("/insuranceapp")
@RestController
public class AdminController {
	@Autowired
	private AdminService adminService;
	@Autowired
	private InsurancePlanService insurancePlanService;
	@Autowired
	private PolicyService policyService;
	@Autowired
	private InsuranceSchemeService insuranceSchemeService;
	 @Autowired
	    private DocumentService documentService;
	 @Autowired
		private CustomerService customerService;
	 
	 @Autowired
		private AgentService agentService;
	
	 
	 @Autowired
		private EmployeeService employeeService;
	 
	 private static final String UPLOAD_DIR = "path/to/save/";
		
	@PostMapping("/admin")
	public  ResponseEntity<AdminGetDto> addAdmin(@RequestBody AdminPostDto adminPostDto)
	{
		System.out.println("admin dto "+adminPostDto);
		AdminGetDto admin = adminService.addAdmin(adminPostDto);
		return new ResponseEntity<>(admin, HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/admin")
	public ResponseEntity<Page<AdminGetDto>>getAllAdmin(@RequestParam int pageNumber,@RequestParam int pageSize)
	{
		System.out.println("pagenumber,pagesize are "+pageNumber+" ,"+pageSize);
		Pageable pageable = PageRequest.of(pageNumber,pageSize);
		Page<AdminGetDto> admins = adminService.getAllAdmin(pageable);
		
		
		return new ResponseEntity<>(admins, HttpStatus.OK);
	}
	
	
	
	@GetMapping("/agentClaims")
	public ResponseEntity<List<Agent>>agentClaims(){
		
		List<Agent> agents=adminService.getAgentClaims();
		
		return ResponseEntity.ok(agents);
		
	}
	
	@GetMapping("/policyClaims")
	public ResponseEntity<List<InsurancePolicy>>policyClaims(){
		
		List<InsurancePolicy> agents=adminService.getpolicyClaims();
		
		return ResponseEntity.ok(agents);
		
	}
	
	
	@PostMapping("/agentClaimApprove")
	public ResponseEntity<Message>agentClaimApprove(@RequestBody ClaimApproveDto claimAppproveDto){
		
		System.out.println(claimAppproveDto);
		
		Message message=adminService.agentClaimApprove(claimAppproveDto);
		
		return ResponseEntity.ok(message);
		
	}
	
	
	@GetMapping("/policyClaimApprove")
	public ResponseEntity<Message>policyClaimApprove(@RequestParam long policyId ){
		
		Message message=adminService.agentPolicyClaimApprove(policyId);
		
		return ResponseEntity.ok(message);
		
	}
	
	@PostMapping("/agentClaimReject")
	public ResponseEntity<Message>agentClaimReject(@RequestBody ClaimApproveDto claimAppproveDto){
		
		System.out.println(claimAppproveDto);
		
		Message message=adminService.agentClaimReject(claimAppproveDto);
		
		return ResponseEntity.ok(message);
		
	}
	
	
	@GetMapping("/policyClaimReject")
	public ResponseEntity<Message>policyClaimReject(@RequestParam long policyId ){
		
		Message message=adminService.agentPolicyClaimReject(policyId);
		
		return ResponseEntity.ok(message);
		
	}
	
	
	
	

	@PostMapping("/addPolicy")
	ResponseEntity<Message> addPolicy(@RequestBody PostPolicyDto postPolicyDto) {

		System.out.println(postPolicyDto);

		Message message = policyService.savePolicy(postPolicyDto);

		return ResponseEntity.ok(message);

	}

	@GetMapping("/getpolicies")
	ResponseEntity<GetPolicyDto> getpolicies(@RequestParam int pageNumber, @RequestParam String username) {
		List<GetPolicyDto> policies = policyService.getPolices(username);
		HttpHeaders headers = new HttpHeaders();
		headers.add("policy-Count", String.valueOf(policies.size()));
		return ResponseEntity.ok().headers(headers).body(policies.get(pageNumber));

	}
	
	@GetMapping("/getallpolicies")
	ResponseEntity<Page<AccountDto>> getallpolicies(@RequestParam int pageNumber,@RequestParam int pageSize) {
		   Pageable pageable=PageRequest.of(pageNumber, pageSize); 

		 Page<AccountDto>acc= policyService.getAllAccounts(pageable);
		 HttpHeaders headers = new HttpHeaders();
		 headers.add("customer-account", String.valueOf(acc.getTotalElements()));
		 return ResponseEntity.ok().headers(headers).body(acc);

	}
	@PostMapping("admin/payment")
	ResponseEntity<Message> payment(@RequestBody PaymentDto paymentDto) {
		Message message =  policyService.payment(paymentDto);
		return ResponseEntity.ok().body(message);

	}
	
	@GetMapping("/getPendingPolicy")
	ResponseEntity<GetPolicyDto> policy(@RequestParam int pageNumber) {
		List<GetPolicyDto> policies = policyService.getPendingPolices();
		HttpHeaders headers = new HttpHeaders();
		headers.add("policy-Count", String.valueOf(policies.size()));
		return ResponseEntity.ok().headers(headers).body(policies.get(pageNumber));

	}
	
	
     
	@GetMapping("/approvePolicy1")
	ResponseEntity<Message> aproovPolicy(@RequestParam Long policyId) {
		Message msg = policyService.aproovPolicy(policyId);
		return ResponseEntity.ok().body(msg);

	}
	
	@GetMapping("/rejectPolicy1")
	ResponseEntity<Message> RejectPolicy(@RequestParam Long policyId) {
		Message msg = policyService.rejectPolicy(policyId);
		return ResponseEntity.ok().body(msg);

	}
	

	@PostMapping("/claimPolicy1")
	ResponseEntity<Message>claimPolicy(@RequestBody PolicyClaimDto policyClaimDto){
		Message message=policyService.policyClaim(policyClaimDto);
		return null;
		
	}

	
	@GetMapping("/scheme")
	@PreAuthorize("hasAnyRole('EMPLOYEE', 'ADMIN')")
	ResponseEntity<List<GetSchemeDto>>getSchemeById(@RequestParam long planId) {
        System.out.println("plan id is>>>>>>>>>>>>>>>>>>>>>> "+planId);
		List<GetSchemeDto>schemes= insuranceSchemeService.getScheme(planId);
        return ResponseEntity.ok(schemes);
     }
	
	@GetMapping("/scheme1")
	ResponseEntity<List<GetSchemeDto1>>getSchemeByPlan(@RequestParam long planId) {
        System.out.println("plan id is>>>>>>>>>>>>>>>>>>>>>> "+planId);
		List<GetSchemeDto1>schemes= insuranceSchemeService.getScheme1(planId);
        return ResponseEntity.ok(schemes);
     }
	
	
	
	@GetMapping("/schemeDetail")
	@PreAuthorize("hasAnyRole('EMPLOYEE', 'ADMIN')")
	ResponseEntity<GetSchemeDetailDto>getSchemeDetails(@RequestParam long id) {
        System.out.println("plan id is>>>>>>>>>>>>>>>>>>>>>> "+ id);
		GetSchemeDetailDto schemes= insuranceSchemeService.getSchemeByPlan(id);
        return ResponseEntity.ok(schemes);
     }
	
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/addscheme")
	public ResponseEntity<Message> addScheme(@RequestBody AddSchemeDto addSchemeDto)
	{   System.out.println("inside addScheme"+addSchemeDto);
		Message scheme = insuranceSchemeService.addScheme(addSchemeDto);
		return new ResponseEntity<>(scheme,HttpStatus.OK);
	}
	
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/Scheme")
	public ResponseEntity<Message> activeScheme(@RequestParam int schemeId)
	{   System.out.println("inside activeScheme"+schemeId);
		Message scheme = insuranceSchemeService.activeScheme(schemeId);
		return new ResponseEntity<>(scheme,HttpStatus.OK);
	}
	
	//@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/Scheme")
	public ResponseEntity<Message> editScheme(@RequestBody EditSchemeDto editSchemeDto)
	{   System.out.println("inside editScheme"+editSchemeDto);
		Message scheme = insuranceSchemeService.editScheme(editSchemeDto);
		return new ResponseEntity<>(scheme,HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/deleteScheme")
	public ResponseEntity<Message> inActiveScheme(@RequestParam int schemeId)
	{   System.out.println("inside inactiveScheme"+schemeId);
		Message scheme = insuranceSchemeService.inActiveScheme(schemeId);
		return new ResponseEntity<>(scheme,HttpStatus.OK);
	}
	
	@PostMapping("/addPlan")

	public ResponseEntity<Message> addPlan(@RequestBody PlanDto addPlanDto)
	{   System.out.println("inside plan");
		Message plan = insurancePlanService.addPlan(addPlanDto);
		return new ResponseEntity<>(plan,HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/plan")
	public ResponseEntity<Message> editPlan(@RequestBody EditPlanDto editPlanDto)
	{   System.out.println("inside plan");
		Message plan = insurancePlanService.editPlan(editPlanDto);
		return new ResponseEntity<>(plan,HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/Plan")
	public ResponseEntity<Message> activePlan(@RequestParam Long planId)
	{   System.out.println("inside plan");
		Message plan = insurancePlanService.activePlan(planId);
		return new ResponseEntity<>(plan,HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/Plan")
	public ResponseEntity<Message> inActivePlan(@RequestParam Long planId)
	{   System.out.println("inside plan");
		Message plan = insurancePlanService.inActivePlan(planId);
		return new ResponseEntity<>(plan,HttpStatus.OK);
	}
	//@PreAuthorize("hasAnyRole('EMPLOYEE', 'ADMIN')")
	@GetMapping("/allPlan")
	public ResponseEntity<Page<PlanDto>> getAllPlans(@RequestParam int pageNumber, @RequestParam int pageSize) {
	    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    System.out.println("Authenticated user: " + auth.getName());;
	    Pageable pageable = PageRequest.of(pageNumber, pageSize);
	    Page<PlanDto> plans = insurancePlanService.getAllPlans(pageable);
	    HttpHeaders headers = new HttpHeaders();
	    headers.add("plans-count", String.valueOf(plans.getTotalElements()));
	    return ResponseEntity.ok().headers(headers).body(plans);
	}
	
	@GetMapping("/allPlans")
	public ResponseEntity<Page<PlanDto>> ActivePlans(@RequestParam int pageNumber, @RequestParam int pageSize)
	{   System.out.println("inside plan");
	    Pageable pageable = PageRequest.of(pageNumber, pageSize);
		Page<PlanDto>plans = insurancePlanService.ActivePlans(pageable);
		HttpHeaders headers = new HttpHeaders();
	    headers.add("plans-count", String.valueOf(plans.getTotalElements()));
	    return ResponseEntity.ok().headers(headers).body(plans);
	}
	 
	   // @PreAuthorize("hasRole('ADMIN')")
	    @GetMapping("/getalldoc")
	    public ResponseEntity<List<Document>> getAllDocuments() {
	    	System.out.println("in get document");
	        List<Document> documents = documentService.getAllDocuments();
	        return new ResponseEntity<>(documents, HttpStatus.OK);
	    }

	    
	    @PreAuthorize("hasRole('ADMIN')")
	    @PostMapping("/adddoc")
	    public ResponseEntity<Document> addDocument(@RequestBody Document document) {
	        try {
	            Document addedDocument = documentService.addDocument(document);
	            return new ResponseEntity<>(addedDocument, HttpStatus.CREATED);
	        } catch (InsuranceException e) {
	            return new ResponseEntity<>(HttpStatus.OK);
	        }
	    }
	    
	    
	    @PostMapping("/customer")
		@PreAuthorize("hasRole('ADMIN')")
		ResponseEntity<Message>activeCustomer(@RequestParam long id){
			
			Message message = customerService.ActiveCustomer(id);
			
			return ResponseEntity.ok(message);
			
		}
	    
	    @DeleteMapping("/customer")
		@PreAuthorize("hasRole('ADMIN')")
		ResponseEntity<Message>inActiveCustomer(@RequestParam long id){
			
			Message message = customerService.inActiveCustomer(id);
			
			return ResponseEntity.ok(message);
			
		}
	    @PostMapping("/addagent")
		@PreAuthorize("hasRole('ADMIN')")
		ResponseEntity<Message> addAgent( @RequestBody AgentDto agentDto) {
	        System.out.println("agent dto>>"+agentDto);
			Message message = agentService.addAgent(agentDto);
			

			return ResponseEntity.ok(message);

		}
	    
	    
	    @PreAuthorize("hasRole('ADMIN')")
		@GetMapping("/allemployee")
		public ResponseEntity<Page<ShowEmployeeDto>> getAllEmployee(@RequestParam int pageNumber, @RequestParam int pageSize)
		{  
			Pageable pageable = PageRequest.of(pageNumber,pageSize);
			Page<ShowEmployeeDto> employee= employeeService.getAllEmployee(pageable);
			System.out.println("total employees are --"+employee.getTotalElements());
			HttpHeaders headers = new HttpHeaders();
		    headers.add("employee-Count", String.valueOf(employee.getTotalElements()));
		    return ResponseEntity.ok().headers(headers).body(employee);
		}
		
	    @PreAuthorize("hasRole('ADMIN')")
		@PostMapping("/addemployee")
	    public ResponseEntity<Message> addEmployee(@RequestBody AddEmployeeDto addEmployeeDto) {
	        System.out.println("Inside addEmployee: " + addEmployeeDto);
	        Message msg = employeeService.addEmployee(addEmployeeDto);
	        return new ResponseEntity<>(msg, HttpStatus.OK);
	    }
	    @PreAuthorize("hasRole('ADMIN')")
		@DeleteMapping("/employee")
		public ResponseEntity<Message> inActiveEmployee(@RequestParam Long employeeId)
		{   System.out.println("inside addEmployee"+employeeId);
			Message msg = employeeService.inActiveEmployee(employeeId);
			return new ResponseEntity<>(msg,HttpStatus.OK);
		}
//	    @PostMapping("/upload")
//	    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile file) {
//	        if (file.isEmpty()) {
//	            return ResponseEntity.badRequest().body("No file selected for upload");
//	        }
//
//	        // Ensure the upload directory exists
//	        File uploadDir = new File(UPLOAD_DIR);
//	        if (!uploadDir.exists() && !uploadDir.mkdirs()) {
//	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not create upload directory");
//	        }
//
//	        // Determine the file name and destination path
//	        String fileName = file.getOriginalFilename();
//	        Path destinationPath = Paths.get(UPLOAD_DIR, fileName);
//
//	        try (InputStream inputStream = file.getInputStream()) {
//	            // Copy the file to the destination path
//	            Files.copy(inputStream, destinationPath, StandardCopyOption.REPLACE_EXISTING);
//	            return ResponseEntity.ok("Image uploaded successfully");
//	        } catch (IOException e) {
//	            e.printStackTrace();
//	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
//	        }
//	    }
//	
}
