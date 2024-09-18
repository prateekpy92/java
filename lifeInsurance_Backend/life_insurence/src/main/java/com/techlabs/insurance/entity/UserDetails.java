package com.techlabs.insurance.entity;

import java.util.Date;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "user")
@Setter
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@ToString
public class UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long userDetailsId;
     
    @Column
    @NotEmpty(message = "First name is required")
    private String firstName;
    private String username;
    @OneToOne(mappedBy = "userDetails")
    private Agent agent;
    public Agent getAgent() {
		return agent;
	}


	public void setAgent(Agent agent) {
		this.agent = agent;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	@Column
    @NotEmpty(message = "Last name is required")
    private String lastName;

    
    @Column
    @NotEmpty(message = "Mobile number is required")
    private String mobileNumber;

    @Column
    //@Email(message = "Email should be valid")
    @NotEmpty(message = "Email is required")
    private String email;

    @Column
    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;
    private String houseNo;

    private String apartment;

    private String city;

    private String state;
    
    public String getHouseNo() {
		return houseNo;
	}


	public void setHouseNo(String houseNo) {
		this.houseNo = houseNo;
	}


	public String getApartment() {
		return apartment;
	}


	public void setApartment(String apartment) {
		this.apartment = apartment;
	}


	public String getCity() {
		return city;
	}


	public void setCity(String city) {
		this.city = city;
	}


	public String getState() {
		return state;
	}


	public void setState(String state) {
		this.state = state;
	}


	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;


	public Long getUserDetailsId() {
		return userDetailsId;
	}


	public void setUserDetailsId(Long userDetailsId) {
		this.userDetailsId = userDetailsId;
	}


	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public String getMobileNumber() {
		return mobileNumber;
	}


	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public Date getDateOfBirth() {
		return dateOfBirth;
	}


	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}


	public Address getAddress() {
		return address;
	}


	public void setAddress(Address address) {
		this.address = address;
	}
 
   

   
}
