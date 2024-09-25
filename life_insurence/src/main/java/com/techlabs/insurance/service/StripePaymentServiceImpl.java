//package com.techlabs.insurance.service;
//
//
//
//import com.paypal.api.payments.Payment;
//import com.stripe.Stripe;
//import com.stripe.exception.StripeException;
//import com.stripe.model.PaymentIntent;
//import com.techlabs.insurance.dto.PaymentDto;
//import com.techlabs.insurance.entity.InsurancePolicy;
//import com.techlabs.insurance.entity.PaymentType;
//import com.techlabs.insurance.repository.InsurancePolicyRepository;
//import com.techlabs.insurance.repository.PaymentRepository;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//@Service
//public class StripePaymentServiceImpl implements StripePaymentService {
//
//    @Value("${stripe.secret.key}")
//    private String stripeSecretKey;
//
//    @Autowired
//    private InsurancePolicyRepository policyRepository;
//
//    @Autowired
//    private PaymentRepository paymentRepository;
//
//    @Override
//    public PaymentIntent createPaymentIntent(PaymentDto paymentDto, Payment payment) throws StripeException {
//        Stripe.apiKey = stripeSecretKey;
//
//        Map<String, Object> params = new HashMap<>();
//        params.put("amount", (int) (paymentDto.getTotalPayment() * 100)); // Stripe expects amount in cents
//        params.put("currency", "inr");
//        params.put("payment_method", paymentDto.getPaymentId());
//
//        InsurancePolicy policy = policyRepository.findById(paymentDto.getPolicyId())
//                .orElseThrow(() -> new InstantiationException("Policy not found"));
//
//        if (paymentDto.getPaymentType().equalsIgnoreCase("debit")) {
//            payment.setPaymentType(PaymentType.DEBIT_CARD.name());
//        } else {
//            payment.setPaymentType(PaymentType.CREDIT_CARD.name());
//        }
//
//        payment.setAmount(paymentDto.getAmount());
//        payment.setTax(paymentDto.getTax());
//        payment.setTotalPayment(paymentDto.getTotalPayment());
//        payment.setPaymentDate(LocalDateTime.now());
//        payment.setInsurancePolicy(policy);
//
//        policy.getPayments().add(payment);
//
//        return PaymentIntent.create(params);
//    }
//
//    @Override
//    public List<PaymentDto> getPaymentsByPolicyId(String policyId) {
//        InsurancePolicy policy = policyRepository.findById(policyId)
//                .orElseThrow(() -> new FortuneLifeException("Policy not found"));
//
//        List<Payment> payments = policy.getPayments();
//        return payments.stream()
//                .map(payment -> {
//                    PaymentDto paymentDto = new PaymentDto();
//                    // map fields from payment to paymentDto
//                    return paymentDto;
//                }).collect(Collectors.toList());
//    }
//
//    @Override
//    public Double calculateTotalRevenue(LocalDateTime startDate, LocalDateTime endDate) {
//        return paymentRepository.getTotalRevenue(startDate, endDate);
//    }
//}
//
//
