package com.techlabs.insurance.mapper;

import com.techlabs.insurance.dto.AdminGetDto;
import com.techlabs.insurance.dto.AdminPostDto;
import com.techlabs.insurance.entity.Address;
import com.techlabs.insurance.entity.UserDetails;

public class UserMapper {
	
	
public static AdminGetDto userToUserGetDto(UserDetails user) {
		
		AdminGetDto userGet = new AdminGetDto();
		userGet.setId(user.getUserDetailsId());
		userGet.setFirstName(user.getFirstName());
		userGet.setLastName(user.getLastName());
		userGet.setEmail(user.getEmail());
		userGet.setMobile(user.getMobileNumber());
		
		return userGet;
	}


public static UserDetails adminPostDtoToUserDetails(AdminPostDto adminPostDto)
{
	UserDetails userdetails = new UserDetails();
	userdetails .setFirstName(adminPostDto.getFirstName());
	userdetails .setLastName(adminPostDto.getLastName());
	userdetails .setMobileNumber(adminPostDto.getMobile());
	userdetails .setEmail(adminPostDto.getEmail());
	userdetails.setDateOfBirth(adminPostDto.getDateOfBirth());
	Address address = new Address();
	address.setHouseNo(adminPostDto.getHouseNo());
	address.setApartment(adminPostDto.getApartment());
	address.setCity(adminPostDto.getCity());
	address.setState(adminPostDto.getState());
	address.setPincode(adminPostDto.getPincode());
	userdetails .setAddress(address);
	return userdetails;
}

}
