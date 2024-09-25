package com.techlabs.insurance.entity;

import java.util.List;

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
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "insurancescheme")
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
public class InsuranceScheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schemeid")
    private Long schemeId;

    @NotEmpty(message = "Scheme name is required")
    @Column(name = "schemename")
    private String schemeName;

    @OneToOne(cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.DETACH,CascadeType.REFRESH})
    @JoinColumn(name = "schemedetailid",referencedColumnName = "detailId")
    private SchemeDetail schemeDetail;

    @ManyToOne
    @JoinColumn(name = "plan_id", referencedColumnName = "planid")
    private InsurencePlan insurancePlan;
    
    @Column(name = "scheme_image")
    private byte[] schemeImage;
    
    public InsurencePlan getInsurancePlan() {
		return insurancePlan;
	}

	public void setInsurancePlan(InsurencePlan insurancePlan) {
		this.insurancePlan = insurancePlan;
	}

	@OneToMany(cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.DETACH,CascadeType.REFRESH})
    private List<InsurancePolicy> policies;

    private boolean isactive=true;

	public Long getSchemeId() {
		return schemeId;
	}

	public void setSchemeId(Long schemeId) {
		this.schemeId = schemeId;
	}

	public String getSchemeName() {
		return schemeName;
	}

	public void setSchemeName(String schemeName) {
		this.schemeName = schemeName;
	}

	public SchemeDetail getSchemeDetail() {
		return schemeDetail;
	}

	public void setSchemeDetail(SchemeDetail schemeDetail) {
		this.schemeDetail = schemeDetail;
	}

	public List<InsurancePolicy> getPolicies() {
		return policies;
	}

	public void setPolicies(List<InsurancePolicy> policies) {
		this.policies = policies;
	}

	public boolean isIsactive() {
		return isactive;
	}

	public void setIsactive(boolean isactive) {
		this.isactive = isactive;
	}

	public byte[] getSchemeImage() {
		return schemeImage;
	}

	public void setSchemeImage(byte[] string) {
		this.schemeImage = string;
	}

	
    
    
    
}
