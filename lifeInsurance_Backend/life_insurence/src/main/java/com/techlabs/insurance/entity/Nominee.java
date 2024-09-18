package com.techlabs.insurance.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "nominee")
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor

public class Nominee {

	    @Id
	    @Column
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long nomineeId;

	    @NotEmpty(message = "Nominee Name is required")
	    @Column
	    private String nomineeName;

	    @NotEmpty(message = "Relationship is required")
	    @Column
	    private String relationship;

		public Long getNomineeId() {
			return nomineeId;
		}

		public void setNomineeId(Long nomineeId) {
			this.nomineeId = nomineeId;
		}

		public String getNomineeName() {
			return nomineeName;
		}

		public void setNomineeName(String nomineeName) {
			this.nomineeName = nomineeName;
		}

		public String getRelationship() {
			return relationship;
		}

		public void setRelationship(String relationship) {
			this.relationship = relationship;
		}

		
    

   
}

