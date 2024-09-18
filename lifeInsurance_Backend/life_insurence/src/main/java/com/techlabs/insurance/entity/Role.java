package com.techlabs.insurance.entity;





import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "roles")
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class Role {
	@Id
	@Column(name="roleid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleid;
	
	@Column(name="rolename")
    private String rolename;
	
	 @ManyToMany(mappedBy = "roles")
	    private Set<Login> logins = new HashSet<>();

	public Long getRoleid() {
		return roleid;
	}

	public void setRoleid(Long roleid) {
		this.roleid = roleid;
	}

	public String getRolename() {
		return rolename;
	}

	public void setRolename(String rolename) {
		this.rolename = rolename;
	}

    
	

}

