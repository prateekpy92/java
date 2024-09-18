package com.techlabs.insurance.mapper;

import com.techlabs.insurance.dto.CustomerGetDto;

import com.techlabs.insurance.dto.CustomerPostDto;
import com.techlabs.insurance.dto.EditProfileDto;

import com.techlabs.insurance.entity.Address;
import com.techlabs.insurance.entity.Customer;
import com.techlabs.insurance.entity.Login;
import com.techlabs.insurance.entity.UserDetails;

public class CustomerMapper {

  

    // Map Customer entity to CustomerGetDto
    public static CustomerGetDto customerToCustomerGetDto(Customer customerDb) {
        if (customerDb == null || customerDb.getUserDetails() == null) {
            return null;
        }
        CustomerGetDto customerGetDto = new CustomerGetDto();
        customerGetDto.setId(customerDb.getCustomerId());
        customerGetDto.setFirstName(customerDb.getUserDetails().getFirstName());
        customerGetDto.setLastName(customerDb.getUserDetails().getLastName());
        customerGetDto.setMobile(customerDb.getUserDetails().getMobileNumber());
        customerGetDto.setEmail(customerDb.getUserDetails().getEmail());
        customerGetDto.setDateOfBirth(customerDb.getUserDetails().getDateOfBirth());
        customerGetDto.setStatus(customerDb.isIsactive() ? "Active" : "Inactive");
        return customerGetDto;
    }

    // Map CustomerPostDto to Customer entity
	public static Customer CustomerPostDtoToCustomer(CustomerPostDto customerDto) {
		Login login = new Login();
		login.setUsername(customerDto.getUsername());
		login.setPassword(customerDto.getPassword());
		UserDetails userDetails = new UserDetails();
		userDetails.setFirstName(customerDto.getFirstName());
		userDetails.setLastName(customerDto.getLastName());
		userDetails.setMobileNumber(customerDto.getMobileNumber());
		userDetails.setEmail(customerDto.getEmail());
		userDetails.setDateOfBirth(customerDto.getDateOfBirth());
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

    // Update Customer entity from EditProfileDto
    public static Customer editCustomerDtoToCustomer(EditProfileDto editCustomerDto, Customer customer) {
        if (editCustomerDto == null || customer == null) {
            return null;
        }
        UserDetails userDetails = customer.getUserDetails();
        if (userDetails == null) {
            userDetails = new UserDetails();
            customer.setUserDetails(userDetails);
        }
        userDetails.setFirstName(editCustomerDto.getFirstName());
        userDetails.setLastName(editCustomerDto.getLastName());
        userDetails.setMobileNumber(editCustomerDto.getMobile());
        userDetails.setEmail(editCustomerDto.getEmail());
        userDetails.setDateOfBirth(editCustomerDto.getDateOfBirth());

        return customer;
    }
    
    
    public static CustomerPostDto toDTO(Customer customer) {
        CustomerPostDto dto = new CustomerPostDto();
        dto.setUsername(customer.getLogin().getUsername());
        dto.setPassword(customer.getLogin().getPassword());
        dto.setFirstName(customer.getUserDetails().getFirstName());
        dto.setLastName(customer.getUserDetails().getLastName());
        dto.setMobileNumber(customer.getUserDetails().getMobileNumber());
        dto.setEmail(customer.getUserDetails().getEmail());
        dto.setDateOfBirth(customer.getUserDetails().getDateOfBirth());
        dto.setHouseNo(customer.getUserDetails().getHouseNo());
        dto.setApartment(customer.getUserDetails().getApartment());
        dto.setCity(customer.getUserDetails().getCity());
        dto.setState(customer.getUserDetails().getState());
       
        return dto;
    }

    public static Customer toEntity(CustomerPostDto dto, Login login, UserDetails userDetails) {
        Customer customer = new Customer();
        customer.setLogin(login);
        customer.setUserDetails(userDetails);
        return customer;
    }
}
