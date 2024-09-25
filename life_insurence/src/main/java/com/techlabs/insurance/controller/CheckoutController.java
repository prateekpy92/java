//package com.techlabs.insurance.controller;
//
//
//
//import java.util.Map;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.lowagie.text.DocumentException;
//import com.stripe.exception.StripeException;
//import com.stripe.model.PaymentIntent;
//import com.stripe.model.checkout.Session;
//import com.techlabs.insurance.dto.InstallmentPaymentRequestDto;
//import com.techlabs.insurance.dto.PolicyClaimDto;
//import com.techlabs.insurance.service.CustomerServiceImpl;
//import com.techlabs.insurance.service.PolicyServiceImpl;
//import com.techlabs.insurance.service.StripeService;
//
//import io.swagger.v3.oas.annotations.Operation;
//
//@RestController
//@RequestMapping("guardian-life-assurance/checkout")
//public class CheckoutController {
//
//	@Autowired
//	private StripeService stripeService;
//	@Autowired
//	private CustomerServiceImpl customerServiceImpl;
//
//	@Autowired
//	private PolicyServiceImpl policyServiceImpl;
//
//
//	@PostMapping("/sessions")
//	@PreAuthorize("hasRole('CUSTOMER')")
//	@Operation(summary = "Create a Checkout Session", description = "Creates a checkout session for payments. Requires the amount and request data to initiate a Stripe checkout session. Returns the checkout session URL.")
//	public ResponseEntity<String> createCheckoutSession(@RequestBody Map<String, Object> requestBody) {
//		double amount = Double.parseDouble(requestBody.get("amount").toString());
//		String successUrl = "http://localhost:3000/success";
//		String cancelUrl = "http://localhost:3000/cancel";
//		 if (!(requestBody.get("requestData") instanceof Map)) {
//	            return ResponseEntity.badRequest().body("Invalid request data format.");
//	        }
//		Map<String, Object> requestData = (Map<String, Object>) requestBody.get("requestData");
//
//		try {
//			Session session = stripeService.createCheckoutSession(amount, successUrl, cancelUrl, requestData);
//			return ResponseEntity.ok(session.getUrl());
//		} catch (Exception e) {
//			return ResponseEntity.badRequest().body("Failed to create checkout session: " + e.getMessage());
//		}
//	}
//
//	@PostMapping("/customers/{customerId}/policies/{policyNo}/installments/{installmentId}/sessions")
//	@PreAuthorize("hasRole('CUSTOMER')")
//	@Operation(summary = "Create Installment Checkout Session", description = "Creates a Stripe checkout session for paying a specific installment. Requires customer ID, installment ID, and payment details.")
//	public ResponseEntity<String> createInstallmentCheckoutSession(@PathVariable(name = "customerId") Long customerId,
//			@PathVariable(name = "installmentId") Long installmentId,
//			@RequestBody InstallmentPaymentRequestDto paymentRequest) {
//
//		System.out.println("CustomerId: " + customerId + ", InstallmentId: " + installmentId + ", AmountDue: "
//				+ paymentRequest.getAmount());
//		try {
//
//			String checkoutSessionUrl = stripeService.createInstallmentCheckoutSession(customerId, installmentId,
//					paymentRequest);
//
//			return ResponseEntity.ok(checkoutSessionUrl);
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//					.body("Failed to create checkout session: " + e.getMessage());
//		}
//	}
//
//	@PostMapping("/payments/verify")
//	@PreAuthorize("hasRole('CUSTOMER')")
//	@Operation(summary = "Verify Payment", description = "Verifies the payment session using the session ID. If successful, processes policy purchase or installment payment based on the session metadata.")
//	public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> paymentData) throws DocumentException {
//	    String sessionId = paymentData.get("sessionId");
//
//	    try {
//	        Session session = Session.retrieve(sessionId);
//	        System.out.println("Session retrieved: " + session);
//
//	        if ("paid".equals(session.getPaymentStatus())) {
//	            String paymentIntentId = session.getPaymentIntent();
//	            PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
//	            String chargeId = paymentIntent.getCharges().getData().get(0).getId();
//
//	            String paymentType = session.getMetadata().get("type");
//
//	            if ("policyPurchase".equals(paymentType)) {
//	                // Extract relevant data from the session metadata
//	                PolicyClaimDto policyClaimDto = new PolicyClaimDto();
//	                policyClaimDto.setPolicyId(Long.parseLong(session.getMetadata().get("insuranceSchemeId")));
//	                policyClaimDto.setClaimAmount(Double.parseDouble(session.getMetadata().get("premiumAmount")));
//	                policyClaimDto.setBankName(paymentData.get("bankName"));  // Assuming bank details come from paymentData
//	                policyClaimDto.setBranchName(paymentData.get("branchName"));
//	                policyClaimDto.setBankAccountNumber(paymentData.get("bankAccountNumber"));
//	                policyClaimDto.setIfscCode(paymentData.get("ifscCode"));
//
//	                // Call your service method to process the claim
//	                Long customerId = Long.parseLong(session.getMetadata().get("customerId"));
//	                Long policyId = policyServiceImpl.processPolicyPurchase(policyClaimDto, customerId);
//
//	                return ResponseEntity.ok(Map.of("success", true, "policyId", policyId, "customerId", customerId, "paymentType", paymentType));
//
//	            } else if ("installmentPayment".equals(paymentType)) {
//	                // Handle installment payment as before
//	                // ...
//	            } else {
//	                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//	                        .body(Map.of("success", false, "message", "Unrecognized payment type"));
//	            }
//	        } else {
//	            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//	                    .body(Map.of("success", false, "message", "Payment verification failed."));
//	        }
//	    } catch (StripeException e) {
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//	                .body(Map.of("error", "Error verifying payment: " + e.getMessage()));
//	    } catch (Exception e) {
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//	                .body(Map.of("error", "An unexpected error occurred: " + e.getMessage()));
//	    }
//		return null;
//	}
//	}
