package com.techlabs.insurance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.paypal.api.payments.Order;
import com.paypal.base.rest.PayPalRESTException;
import com.techlabs.insurance.dto.AccountDto;
import com.techlabs.insurance.dto.GetPolicyDto;
import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.dto.PaymentDto;
import com.techlabs.insurance.dto.PolicyClaimDto;
import com.techlabs.insurance.dto.PostPolicyDto;
import com.techlabs.insurance.entity.Customer;
import com.techlabs.insurance.entity.Payment;

import com.techlabs.insurance.service.PaypalService;
import com.techlabs.insurance.service.PolicyService;

@RestController
@RequestMapping("/insuranceapp")
public class PolicyController {
    
    @Autowired
    private PolicyService policyService;

    @PreAuthorize("hasRole('AGENT','CUSTOMER')")
    @PostMapping("/addpolicy")
    public ResponseEntity<Message> addPolicy(@RequestBody PostPolicyDto postPolicyDto) {
        System.out.println(postPolicyDto);
        Message message = policyService.savePolicy(postPolicyDto);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/policy")
    public ResponseEntity<GetPolicyDto> getPolicies(  @RequestParam(name = "pageNumber") int pageNumber,
    	    @RequestParam(name = "pageSize") int pageSize,
    	    @RequestParam(name = "username") String username) {
        List<GetPolicyDto> policies = policyService.getPolices(username);
        HttpHeaders headers = new HttpHeaders();
        headers.add("policy-Count", String.valueOf(policies.size()));
        return ResponseEntity.ok().headers(headers).body(policies.get(pageNumber));
    }
    
    @GetMapping("/allpolicy")
    public ResponseEntity<Page<AccountDto>> getAllPolicies(@RequestParam int pageNumber, @RequestParam int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize); 
        Page<AccountDto> acc = policyService.getAllAccounts(pageable);
        HttpHeaders headers = new HttpHeaders();
        headers.add("customer-account", String.valueOf(acc.getTotalElements()));
        return ResponseEntity.ok().headers(headers).body(acc);
    }
    @PreAuthorize("hasRole('CUSTOMER')")
    @PostMapping("/payments")
    public ResponseEntity<Message> payment(@RequestBody PaymentDto paymentDto) {
    	 System.out.println("Received PaymentDto: " + paymentDto);
    	 String username = paymentDto.getUsername();
         if (username == null || username.isEmpty()) {
             throw new IllegalArgumentException("Username is required");
         }
    	 List<PaymentDto> payments = PolicyService.getpayments(paymentDto.getUsername());Message message = policyService.payment(paymentDto);
        return ResponseEntity.ok().body(message);
    }
    
    @GetMapping("/PendingPolicy")
    public ResponseEntity<GetPolicyDto> getPendingPolicies(@RequestParam int pageNumber) {
        List<GetPolicyDto> policies = policyService.getPendingPolices();
        HttpHeaders headers = new HttpHeaders();
        headers.add("policy-Count", String.valueOf(policies.size()));
        return ResponseEntity.ok().headers(headers).body(policies.get(pageNumber));
    }
   
    @GetMapping("/payments")
    public ResponseEntity<List<Payment>> getPayments(@RequestParam Long policyId) {
        List<Payment> payments = policyService.getpayments(policyId);
        return ResponseEntity.ok().body(payments);
    }
    
    @GetMapping("/approvePolicy")
    public ResponseEntity<Message> approvePolicy(@RequestParam Long policyId) {
        Message msg = policyService.aproovPolicy(policyId);
        return ResponseEntity.ok().body(msg);
    }
    
    @GetMapping("/rejectPolicy")
    public ResponseEntity<Message> rejectPolicy(@RequestParam Long policyId) {
        Message msg = policyService.rejectPolicy(policyId);
        return ResponseEntity.ok().body(msg);
    }

    @PostMapping("/claimPolicy")
    public ResponseEntity<Message> claimPolicy(@RequestBody PolicyClaimDto policyClaimDto) {
        Message message = policyService.policyClaim(policyClaimDto);
        return ResponseEntity.ok().body(message);
    }

    @GetMapping("/customers-by-agent/{agentId}")
    public ResponseEntity<Page<Customer>> getCustomersByAgentId(
            @PathVariable("agentId") long agentId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<Customer> customers = policyService.getCustomersByAgentId(agentId, PageRequest.of(page, size));
        if (customers == null || customers.isEmpty()) {
            return ResponseEntity.noContent().build(); 
        }
        return ResponseEntity.ok(customers); 
}

    @GetMapping("/customers-by-agent-username/{agentUsername}")
    public Page<Customer> getCustomersByAgentUsername(
            @PathVariable("agentUsername") String agentUsername,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        return policyService.getCustomersByAgentUsername(agentUsername, pageable);
    }
    @PostMapping("/policy/{policyId}/withdraw")
    public ResponseEntity<Message> withdrawPolicy(@PathVariable Long policyId) {
        Message response = policyService.withdrawPolicy(policyId);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
    

//    @Autowired
//    private PaypalService service;
//
//    public static final String SUCCESS_URL = "pay/success";
//    public static final String CANCEL_URL = "pay/cancel";
//
//    @PostMapping("/pay")
//    public String payment(@ModelAttribute("order") Order order, RedirectAttributes redirectAttributes) {
//        try {
//            Payment payment = service.createPayment(
//                order.getPrice(),
//                order.getCurrency(),
//                order.getMethod(),
//                order.getIntent(),
//                order.getDescription(),
//                "http://localhost:8081/" + CANCEL_URL,
//                "http://localhost:8081/" + SUCCESS_URL
//            );
//
//            for (com.paypal.api.payments.Links link : payment.getLinks()) {
//                if (link.getRel().equals("approval_url")) {
//                    return "redirect:" + link.getHref();
//                }
//            }
//        } catch (PayPalRESTException e) {
//            // Log the exception and provide user feedback
//            e.printStackTrace();
//            redirectAttributes.addFlashAttribute("errorMessage", "Payment processing failed. Please try again.");
//        }
//        return "redirect:/";
//    }
//
//    @GetMapping(CANCEL_URL)
//    public String cancelPay() {
//        return "cancel";
//    }
//
//    @GetMapping(SUCCESS_URL)
//    public String successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId, RedirectAttributes redirectAttributes) {
//        try {
//            Payment payment = service.executePayment(paymentId, payerId);
//            if (payment.getState().equals("approved")) {
//                return "success";
//            }
//        } catch (PayPalRESTException e) {
//            // Log the exception and provide user feedback
//            e.printStackTrace();
//            redirectAttributes.addFlashAttribute("errorMessage", "Payment execution failed. Please try again.");
//        }
//        return "redirect:/";
//    }
}