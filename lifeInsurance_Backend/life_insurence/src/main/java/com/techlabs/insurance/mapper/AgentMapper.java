package com.techlabs.insurance.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.techlabs.insurance.dto.AgentDto;
import com.techlabs.insurance.dto.AgentGetDto;
import com.techlabs.insurance.dto.EditProfileDto;
import com.techlabs.insurance.entity.Address;
import com.techlabs.insurance.entity.Agent;
import com.techlabs.insurance.entity.Login;
import com.techlabs.insurance.entity.UserDetails;
import com.techlabs.insurance.repository.UserDetailsRepository;

@Component
public class AgentMapper {

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    // Converts AgentDto to UserDetails
    public UserDetails agentDtoToUserDetails(AgentDto agentDto) {
        if (agentDto == null) {
            throw new IllegalArgumentException("AgentDto must not be null");
        }
        
        UserDetails userDetails = new UserDetails();
        userDetails.setFirstName(agentDto.getFirstName());
        userDetails.setLastName(agentDto.getLastName());
        userDetails.setMobileNumber(agentDto.getMobileNumber());
        userDetails.setEmail(agentDto.getEmail());
        userDetails.setDateOfBirth(agentDto.getDateOfBirth());

        Address address = new Address();
        address.setHouseNo(agentDto.getHouseNo());
        address.setApartment(agentDto.getApartment());
        address.setCity(agentDto.getCity());
        address.setState(agentDto.getState());
        address.setPincode(agentDto.getPincode());
        userDetails.setAddress(address);

        return userDetails;
    }

    // Converts Agent entity to AgentGetDto
    public AgentGetDto agentToAgentGetDto(Agent agentDb) {
        if (agentDb == null || agentDb.getUserDetails() == null) {
            return null; // Return null or an empty DTO as needed
        }

        AgentGetDto agentGetDto = new AgentGetDto();
        agentGetDto.setId(agentDb.getAgentId());
        agentGetDto.setFirstName(agentDb.getUserDetails().getFirstName());
        agentGetDto.setLastName(agentDb.getUserDetails().getLastName());
        agentGetDto.setEmail(agentDb.getUserDetails().getEmail());
        agentGetDto.setDateOfBirth(agentDb.getUserDetails().getDateOfBirth());
        agentGetDto.setMobileNumber(agentDb.getUserDetails().getMobileNumber());
        agentGetDto.setUsername(agentDb.getLogin() != null ? agentDb.getLogin().getUsername() : null);
        agentGetDto.setStatus(agentDb.isIsactive() ? "Active" : "Inactive");

        double totalCommission = agentDb.getTotalCommission();
        double roundedCommission = Math.round(totalCommission * 100.0) / 100.0;
        agentGetDto.setCommission(roundedCommission);

        return agentGetDto;
    }

    // Updates Agent from EditProfileDto
    public Agent updateAgentFromEditProfileDto(EditProfileDto agentProfileDto, Agent agent) {
        if (agent == null) {
            return null; // Handle null agent
        }

        UserDetails userDetails = agent.getUserDetails();
        if (userDetails == null) {
            userDetails = new UserDetails(); // Create a new UserDetails if none exists
        }

        userDetails.setFirstName(agentProfileDto.getFirstName());
        userDetails.setLastName(agentProfileDto.getLastName());
        userDetails.setMobileNumber(agentProfileDto.getMobile());
        userDetails.setEmail(agentProfileDto.getEmail());
        userDetails.setDateOfBirth(agentProfileDto.getDateOfBirth());
        agent.setUserDetails(userDetails);

        return agent;
    }

public  Agent agentProfileDtoToAgent(EditProfileDto agentProfileDto, Agent agent) {
		
		Login login = agent.getLogin();
		UserDetails userDetails = new UserDetails();
		userDetails.setFirstName(agentProfileDto.getFirstName());
		userDetails.setLastName(agentProfileDto.getLastName());
		userDetails.setMobileNumber(agentProfileDto.getMobile());
		userDetails.setEmail(agentProfileDto.getEmail());
		userDetails.setDateOfBirth(agentProfileDto.getDateOfBirth());
		agent.setUserDetails(userDetails);
		return agent;
	}

    // Converts AgentDto to Agent (assuming a UserDetails object)
    public UserDetails agentDtoToAgent(AgentDto agentDto) {
        if (agentDto == null) {
            return null; // Handle null AgentDto
        }

        UserDetails userDetails = new UserDetails();
        userDetails.setFirstName(agentDto.getFirstName());
        userDetails.setLastName(agentDto.getLastName());
        userDetails.setMobileNumber(agentDto.getMobileNumber());
        userDetails.setEmail(agentDto.getEmail());
        userDetails.setDateOfBirth(agentDto.getDateOfBirth());

        Address address = new Address();
        address.setHouseNo(agentDto.getHouseNo());
        address.setApartment(agentDto.getApartment());
        address.setCity(agentDto.getCity());
        address.setState(agentDto.getState());
        address.setPincode(agentDto.getPincode());
        userDetails.setAddress(address);

        return userDetails;
    }
    
    public static AgentDto toDTO(Agent agent) {
        AgentDto agentDto = new AgentDto();
        agentDto.setUsername(agent.getLogin().getUsername());
        agentDto.setPassword(agent.getLogin().getPassword()); // Use hashed password in actual implementation
        agentDto.setFirstName(agent.getUserDetails().getFirstName());
        agentDto.setLastName(agent.getUserDetails().getLastName());
        agentDto.setMobileNumber(agent.getUserDetails().getMobileNumber());
        agentDto.setEmail(agent.getUserDetails().getEmail());
        agentDto.setDateOfBirth(agent.getUserDetails().getDateOfBirth());
        agentDto.setHouseNo(agent.getUserDetails().getHouseNo());
        agentDto.setApartment(agent.getUserDetails().getApartment());
        agentDto.setCity(agent.getUserDetails().getCity());
        agentDto.setState(agent.getUserDetails().getState());
       
        return agentDto;
    }

    public static Agent toEntity(AgentDto agentDto, Login login, UserDetails userDetails) {
        Agent agent = new Agent();
        agent.setLogin(login);
        agent.setUserDetails(userDetails);
        return agent;
    }
}
