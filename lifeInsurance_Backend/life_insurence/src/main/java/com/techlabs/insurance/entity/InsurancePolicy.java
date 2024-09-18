package com.techlabs.insurance.entity;




import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "insurance_policies")
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class InsurancePolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "policyno")
    private Long policyNo;
    
    @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.DETACH,CascadeType.REFRESH})
    @JoinColumn(name = "schemeid", referencedColumnName="schemeId")
    private InsuranceScheme insuranceScheme;

    @Column(name = "issuedate")
    private LocalDate issueDate;

    @Column(name = "maturitydate")
    private Date maturityDate;

    @Column(name = "premiumtype")
    private PremiumType premiumType;

    @Column(name = "sumassured")
    private Double sumAssured;

    @Column(name = "premiumamount")
    private Double premiumAmount;

    @Column(name = "status")
    private PolicyStatus status = PolicyStatus.PENDING;

    @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.DETACH,CascadeType.REFRESH})
    @JoinColumn(name = "agentId", referencedColumnName="agentId")
    private Agent agent;

    @OneToMany(cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.DETACH,CascadeType.REFRESH})
    private List<Nominee> nominees;

    @OneToMany(cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.DETACH,CascadeType.REFRESH})
    private List<Payment> payments;

    @OneToOne(cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.DETACH,CascadeType.REFRESH})
    @JoinColumn(name = "claim")
    private Claim claims;

    @OneToMany(cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.DETACH,CascadeType.REFRESH})
    private Set<SubmittedDocument> submittedDocuments = new HashSet<>();

    
    
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    
    
	public Customer getCustomer() {
		return customer;
	}

	public LocalDate getIssueDate() {
		return issueDate;
	}

	public Date getMaturityDate() {
		return maturityDate;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public void setIssueDate(LocalDate issueDate) {
		this.issueDate = issueDate;
	}

	public void setMaturityDate(Date maturityDate) {
		this.maturityDate = maturityDate;
	}

	public Long getPolicyNo() {
		return policyNo;
	}

	public void setPolicyNo(Long policyNo) {
		this.policyNo = policyNo;
	}

	public InsuranceScheme getInsuranceScheme() {
		return insuranceScheme;
	}

	public void setInsuranceScheme(InsuranceScheme insuranceScheme) {
		this.insuranceScheme = insuranceScheme;
	}

	

	

	
	public PremiumType getPremiumType() {
		return premiumType;
	}

	public void setPremiumType(PremiumType premiumType) {
		this.premiumType = premiumType;
	}

	public Double getSumAssured() {
		return sumAssured;
	}

	public void setSumAssured(Double sumAssured) {
		this.sumAssured = sumAssured;
	}

	public Double getPremiumAmount() {
		return premiumAmount;
	}

	public void setPremiumAmount(Double premiumAmount) {
		this.premiumAmount = premiumAmount;
	}

	public PolicyStatus getStatus() {
		return status;
	}

	public void setStatus(PolicyStatus status) {
		this.status = status;
	}

	public Agent getAgent() {
		return agent;
	}

	public void setAgent(Agent agent) {
		this.agent = agent;
	}

	public List<Nominee> getNominees() {
		return nominees;
	}

	public void setNominees(List<Nominee> nominees) {
		this.nominees = nominees;
	}

	public List<Payment> getPayments() {
		return payments;
	}

	public void setPayments(List<Payment> payments) {
		this.payments = payments;
	}

	public Claim getClaims() {
		return claims;
	}

	public void setClaims(Claim claims) {
		this.claims = claims;
	}

	public Set<SubmittedDocument> getSubmittedDocuments() {
		return submittedDocuments;
	}

	public void setSubmittedDocuments(Set<SubmittedDocument> submittedDocuments) {
		this.submittedDocuments = submittedDocuments;
	}
      
    
}
