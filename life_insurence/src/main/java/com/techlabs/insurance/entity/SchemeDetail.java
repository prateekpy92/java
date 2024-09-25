package com.techlabs.insurance.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;



@Entity
@Table(name = "schemedetail")
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
public class SchemeDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "detailid")
    private Long detailId;

    
    @Column(name = "schemeimage")
    @Lob
    private String schemeImage;

    @NotEmpty(message = "Description is required")
    @Column(name = "description")
    private String description;

    @PositiveOrZero(message = "Minimum amount must be a non-negative number")
    @Column(name = "minamount")
    private Double minAmount;

    @PositiveOrZero(message = "Maximum amount must be a non-negative number")
    @Column(name = "maxamount")
    private Double maxAmount;

    @PositiveOrZero(message = "Minimum investment time must be a non-negative number")
    @Column(name = "mininvestmenttime")
    private int minInvestmentTime;

    @PositiveOrZero(message = "Maximum investment time must be a non-negative number")
    @Column(name = "maxinvestmenttime")
    private Integer maxInvestmentTime;

    @PositiveOrZero(message = "Minimum age must be a non-negative number")
    @Column(name = "minage")
    private int minAge;

    @PositiveOrZero(message = "Maximum age must be a non-negative number")
    @Column(name = "maxage")
    private Integer maxAge;

    @PositiveOrZero(message = "Profit ratio must be a non-negative number")
    @Column(name = "profitratio")
    private Double profitRatio;

    @PositiveOrZero(message = "Registration commission ratio must be a non-negative number")
    @Column(name = "registrationcommratio")
    private Double registrationCommRatio;

    @PositiveOrZero(message = "Installment commission ratio must be a non-negative number")
    @Column(name = "installmentcommratio")
    private Double installmentCommRatio;

    
    @ManyToMany(cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.DETACH,CascadeType.REFRESH})
    @JoinTable(name = "schemeDetail_document",joinColumns = @JoinColumn(name = "detailId"),inverseJoinColumns = @JoinColumn(name = "documentId"))
    private Set<SchemeDocument> documents =new HashSet<>();


	public Long getDetailId() {
		return detailId;
	}


	public void setDetailId(Long detailId) {
		this.detailId = detailId;
	}


//	public String getSchemeImage() {
//		return schemeImage;
//	}
//
//
//	public void setSchemeImage(String schemeImage) {
//		this.schemeImage = schemeImage;
//	}


	public String getDescription() {
		return description;
	}


	public String getSchemeImage() {
		return schemeImage;
	}


	public void setSchemeImage(String string) {
		this.schemeImage = string;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public Double getMinAmount() {
		return minAmount;
	}


	public void setMinAmount(Double minAmount) {
		this.minAmount = minAmount;
	}


	public Double getMaxAmount() {
		return maxAmount;
	}


	public void setMaxAmount(Double maxAmount) {
		this.maxAmount = maxAmount;
	}


	public int getMinInvestmentTime() {
		return minInvestmentTime;
	}


	public void setMinInvestmentTime(int minInvestmentTime) {
		this.minInvestmentTime = minInvestmentTime;
	}


	public Integer getMaxInvestmentTime() {
		return maxInvestmentTime;
	}


	public void setMaxInvestmentTime(Integer maxInvestmentTime) {
		this.maxInvestmentTime = maxInvestmentTime;
	}


	public int getMinAge() {
		return minAge;
	}


	public void setMinAge(int minAge) {
		this.minAge = minAge;
	}


	public Integer getMaxAge() {
		return maxAge;
	}


	public void setMaxAge(Integer maxAge) {
		this.maxAge = maxAge;
	}


	public Double getProfitRatio() {
		return profitRatio;
	}


	public void setProfitRatio(Double profitRatio) {
		this.profitRatio = profitRatio;
	}


	public Double getRegistrationCommRatio() {
		return registrationCommRatio;
	}


	public void setRegistrationCommRatio(Double registrationCommRatio) {
		this.registrationCommRatio = registrationCommRatio;
	}


	public Double getInstallmentCommRatio() {
		return installmentCommRatio;
	}


	public void setInstallmentCommRatio(Double installmentCommRatio) {
		this.installmentCommRatio = installmentCommRatio;
	}


	public Set<SchemeDocument> getDocuments() {
		return documents;
	}


	public void setDocuments(Set<SchemeDocument> documents) {
		this.documents = documents;
	}

}
        