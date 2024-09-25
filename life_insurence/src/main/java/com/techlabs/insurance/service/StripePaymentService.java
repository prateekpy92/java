//package com.techlabs.insurance.service;
//
//import com.stripe.exception.StripeException;
//import com.stripe.model.PaymentIntent;
//import com.techlabs.insurance.dto.PaymentDto;
//import com.techlabs.insurance.entity.Payment;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//public interface StripePaymentService {
//	PaymentIntent createPaymentIntent(PaymentDto paymentDto, Payment payment) throws StripeException;
//
//	List<PaymentDto> getPaymentsByPolicyId(String policyId);
//
//	Double calculateTotalRevenue(LocalDateTime startDate, LocalDateTime endDate);
//}
