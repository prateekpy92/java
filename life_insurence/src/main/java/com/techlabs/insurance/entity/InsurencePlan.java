package com.techlabs.insurance.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;



@Entity
@Table(name = "insurenceplan")
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class InsurencePlan {
		@Id
	    @Column(name = "planid")
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long planId; 
	    
	    @Column(name = "planname")
	    @NotEmpty(message = "Plan name is required")
	    private String planName;

	    @Column(name = "schemes")
	    @OneToMany(cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.DETACH,CascadeType.REFRESH})
        private List<InsuranceScheme> scheme;

	    @Column(name = "status")
	    private boolean isactive=true;

		public Long getPlanId() {
			return planId;
		}

		public void setPlanId(Long planId) {
			this.planId = planId;
		}

		public String getPlanName() {
			return planName;
		}

		public void setPlanName(String planName) {
			this.planName = planName;
		}

		public List<InsuranceScheme> getScheme() {
			return scheme;
		}

		public void setScheme(List<InsuranceScheme> scheme) {
			this.scheme = scheme;
		}

		public boolean isIsactive() {
			return isactive;
		}

		public void setIsactive(boolean isactive) {
			this.isactive = isactive;
		}

}
