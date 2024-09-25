package com.techlabs.insurance.entity;


import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import com.techlabs.insurance.dto.PaymentStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "payments")
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor

public class Payment {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paymentid")
    private Long paymentId;

    @Enumerated(EnumType.STRING)
    @Column(name = "paymenttype")
    private PaymentType paymentType;
    

    @Column(name = "amount")
    private Double amount;

    @Column(name = "payment_date")
    @CreationTimestamp
    private Date paymentDate;

    @Column(name = "tax")
    private Double tax=0.0;

    @Column(name = "totalpayment")
    private Double totalPayment=0.0;
    
    @Column(name="card_number")
    private String cardNumber;
    
    @Column(name="cvv")
    private int cvv=0;
    
    @Column(name="expiry")
    private String expiry;
    
   
    @Column(name = "payment_status")
    private PaymentStatus paymentStatus=PaymentStatus.UNPAID;
    
    @ManyToOne
    @JoinColumn(name = "policyno", nullable = false)
    private InsurancePolicy policy;
  
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

	public Customer getCustomer() {
		return customer;
	}


	public void setCustomer(Customer customer) {
		this.customer = customer;
	}


	public InsurancePolicy getPolicy() {
		return policy;
	}


	public void setPolicy(InsurancePolicy policy) {
		this.policy = policy;
	}


	public Long getPaymentId() {
		return paymentId;
	}


	public void setPaymentId(Long paymentId) {
		this.paymentId = paymentId;
	}


	public PaymentType getPaymentType() {
		return paymentType;
	}


	public void setPaymentType(PaymentType paymentType) {
		this.paymentType = paymentType;
	}


	public Double getAmount() {
		return amount;
	}


	public void setAmount(Double amount) {
		this.amount = amount;
	}


	public Date getPaymentDate() {
		return paymentDate;
	}


	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}


	public Double getTax() {
		return tax;
	}


	public void setTax(Double tax) {
		this.tax = tax;
	}


	public Double getTotalPayment() {
		return totalPayment;
	}


	public void setTotalPayment(Double totalPayment) {
		this.totalPayment = totalPayment;
	}


	public String getCardNumber() {
		return cardNumber;
	}


	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}


	public int getCvv() {
		return cvv;
	}


	public void setCvv(int cvv) {
		this.cvv = cvv;
	}


	public String getExpiry() {
		return expiry;
	}


	public void setExpiry(String expiry) {
		this.expiry = expiry;
	}


	public PaymentStatus getPaymentStatus() {
		return paymentStatus;
	}


	public void setPaymentStatus(PaymentStatus paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	
}
