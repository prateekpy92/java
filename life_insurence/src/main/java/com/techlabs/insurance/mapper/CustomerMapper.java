package com.techlabs.insurance.mapper;

import com.techlabs.insurance.dto.CustomerGetDto;
import com.techlabs.insurance.dto.CustomerPostDto;
import com.techlabs.insurance.dto.EditProfileDto;
import com.techlabs.insurance.entity.Address;
import com.techlabs.insurance.entity.Customer;
import com.techlabs.insurance.entity.Login;
import com.techlabs.insurance.entity.UserDetails;

public class CustomerMapper {

	public static CustomerGetDto customerToCustomerGetDto(Customer customerDb) {
		  if (customerDb == null || customerDb.getUserDetails() == null) {
		        return null; 
		    }
		System.out.println("Mapping Customer: " + customerDb);
		CustomerGetDto customerGetDto = new CustomerGetDto();
		customerGetDto.setId(customerDb.getCustomerId());
		customerGetDto.setFirstName(customerDb.getUserDetails().getFirstName());
		customerGetDto.setLastName(customerDb.getUserDetails().getLastName());
		customerGetDto.setMobile(customerDb.getUserDetails().getMobileNumber());
		customerGetDto.setEmail(customerDb.getUserDetails().getEmail());
		customerGetDto.setDateOfBirth(customerDb.getUserDetails().getDateOfBirth());
		customerGetDto.setStatus(customerDb.isIsactive()==true?"Active":"InActive");
		return customerGetDto;
	}

	public static Customer CustomerPostDtoToCustomer(CustomerPostDto customerDto) {
	    // Create Login entity
	    Login login = new Login();
	    login.setUsername(customerDto.getUsername());
	    login.setPassword(customerDto.getPassword());

	    // Create UserDetails entity
	    UserDetails userDetails = new UserDetails();
	    userDetails.setFirstName(customerDto.getFirstName());
	    userDetails.setLastName(customerDto.getLastName());
	    userDetails.setMobileNumber(customerDto.getMobileNumber());
	    userDetails.setEmail(customerDto.getEmail());
	    userDetails.setDateOfBirth(customerDto.getDateOfBirth());
	    userDetails.setHouseNo(customerDto.getHouseNo());
	    userDetails.setApartment(customerDto.getApartment());
	    userDetails.setCity(customerDto.getCity());
	    userDetails.setState(customerDto.getState());
	    userDetails.setUsername(customerDto.getUsername()); // Set username here

	    // Create Address entity (if needed)
	    Address address = new Address();
	    address.setApartment(customerDto.getApartment());
	    address.setCity(customerDto.getCity());
	    address.setHouseNo(customerDto.getHouseNo());
	    address.setPincode(customerDto.getPincode());
	    address.setState(customerDto.getState());
	    userDetails.setAddress(address);

	   
	    Customer customer = new Customer();
	    customer.setUserDetails(userDetails);
	    customer.setLogin(login);

	    return customer;
	}


	public static Customer editCustomerDtoToCustomer(EditProfileDto editCustomerDto, Customer customer) {
		if (customer == null) {
	        return null; 
	    }
		UserDetails userDetails = new UserDetails();
		userDetails.setFirstName(editCustomerDto.getFirstName());
		userDetails.setLastName(editCustomerDto.getLastName());
		userDetails.setMobileNumber(editCustomerDto.getMobile());
		userDetails.setEmail(editCustomerDto.getEmail());
		userDetails.setDateOfBirth(editCustomerDto.getDateOfBirth());
		customer.setUserDetails(userDetails);
		return customer;
	   
	}
	
	public static Customer mapToCustomer(CustomerPostDto dto) {
        Customer customer = new Customer();
        
        // Set the username
        customer.setUsername(dto.getUsername());

        // Create and set the Login object with the password
        Login login = new Login();
        login.setPassword(dto.getPassword()); // Assuming Login has a method for setting the password
        customer.setLogin(login);

        // Create UserDetails if necessary
        UserDetails userDetails = new UserDetails();
       
        customer.setUserDetails(userDetails);

        // Create Address
        Address address = new Address();
        address.setHouseNo(dto.getHouseNo());
        address.setApartment(dto.getApartment());
        address.setCity(dto.getCity());
        address.setState(dto.getState());
        address.setPincode(dto.getPincode());
        
        // Set the address in the customer
        userDetails.setAddress(address);

        return customer;
    }


}
