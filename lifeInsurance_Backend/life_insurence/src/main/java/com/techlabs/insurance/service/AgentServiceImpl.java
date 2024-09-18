package com.techlabs.insurance.service;
import java.util.ArrayList;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.techlabs.insurance.dto.AccountDto;
import com.techlabs.insurance.dto.AgentClaimDto;
import com.techlabs.insurance.dto.AgentDto;
import com.techlabs.insurance.dto.AgentGetDto;
import com.techlabs.insurance.dto.CustomerGetDto;
import com.techlabs.insurance.dto.EditProfileDto;
import com.techlabs.insurance.dto.JwtAuthResponse;
import com.techlabs.insurance.dto.LoginDto;
import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.entity.Agent;
import com.techlabs.insurance.entity.Claim;
import com.techlabs.insurance.entity.ClaimStatus;
import com.techlabs.insurance.entity.Customer;
import com.techlabs.insurance.entity.Employee;
import com.techlabs.insurance.entity.InsurancePolicy;
import com.techlabs.insurance.entity.Login;
import com.techlabs.insurance.entity.Role;
import com.techlabs.insurance.entity.UserDetails;
import com.techlabs.insurance.exception.InsuranceException;
import com.techlabs.insurance.mapper.AgentMapper;
import com.techlabs.insurance.mapper.CustomerMapper;
import com.techlabs.insurance.mapper.EmployeeMapper;
import com.techlabs.insurance.mapper.PolicyMapper;
import com.techlabs.insurance.repository.AgentRepository;
import com.techlabs.insurance.repository.LoginRepository;
import com.techlabs.insurance.repository.PolicyRepository;
import com.techlabs.insurance.repository.RoleRepository;
import com.techlabs.insurance.repository.UserDetailsRepository;
import com.techlabs.insurance.security.JwtTokenProvider;


@Service
public class AgentServiceImpl implements AgentService{
	
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private AgentRepository agentRepository;
    @Autowired
    private UserDetailsRepository userDetailsRepository;
    @Autowired
    private LoginRepository loginRepository;
    @Autowired
    private PolicyRepository policyRepository;
    
    private AgentMapper agentMapper=new AgentMapper();
	
    @Override
	public JwtAuthResponse agentLogin(LoginDto logindto) {
		try
		{
//			
			System.out.println("login dto value is +"+logindto);
			
			
			
			JwtAuthResponse response=new JwtAuthResponse();
			Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(logindto.getUserName(), logindto.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String token = jwtTokenProvider.generateToken(authentication);
			System.out.println("login dto value is rrrrrrrrrrr+"+token);
			response.setAccessToken(token);
			response.setUsername(authentication.getName());
			System.out.println("authentication is "+authentication);
			response.setRoleType(authentication.getAuthorities().iterator().next().toString());
			System.out.println("login dto value is rrrrrrrrrrr+"+response);
			if(!response.getRoleType().equals(logindto.getRoleType()))
			{
				throw new InsuranceException("Agent not exist!");
			}
			return response;
			
			
		}
		catch (BadCredentialsException e)
		{
			throw new InsuranceException("Bad Request");
		}
		
	}

    @Override
	public AgentGetDto getAgentByUsername(String username) {
		
		
		List<Agent>agents=agentRepository.findAll();
		Agent agentDb=null;
		
		for(Agent agent:agents) {
			System.out.println(agent.getLogin().getUsername());
			if(agent.getLogin().getUsername().equals(username)) {
				
				agentDb=agent;
				break;
			}
		}
		
		if(agentDb==null) {
			throw new InsuranceException("Agent is not found");
		}
		
		return agentMapper.agentToAgentGetDto(agentDb);
		
	}

    @Override
    public Message addAgent(AgentDto agentDto) {
        List<Login> admindb = loginRepository.findAll();
        
        for (Login log : admindb) {
            if (agentDto.getUsername().equals(log.getUsername())) {
                throw new InsuranceException("Username already used!");
            }
        }
        
        UserDetails userDetails = agentMapper.agentDtoToUserDetails(agentDto);
        
        // Ensure userDetails is not null
        if (userDetails == null) {
            throw new IllegalArgumentException("UserDetails object must not be null");
        }
        
        userDetails = userDetailsRepository.save(userDetails);
        
        Login login = new Login();
        login.setUsername(agentDto.getUsername());
        login.setPassword(passwordEncoder.encode(agentDto.getPassword()));
        
        Set<Role> role = new HashSet<>();
        Role userRole = roleRepository.findByRolename("ROLE_AGENT").orElseThrow(() -> 
            new InsuranceException("Role not found!"));
        role.add(userRole);
        
        login.setRoles(role);
        
        Agent agent = new Agent();
        agent.setLogin(login);
        agent.setUserDetails(userDetails);
        
        agent = agentRepository.save(agent);
        
        Message message = new Message();
        message.setStatus(HttpStatus.OK);
        message.setMessage("Agent Saved Successfully!");
        
        return message;
    }


    @Override
    public Page<AgentGetDto> getAllAgents(Pageable pageable) {
        Page<Agent> agents = agentRepository.findAll(pageable);
        Page<AgentGetDto> agentList = agents.map(agent -> agentMapper.agentToAgentGetDto(agent));
        
        if (agentList.isEmpty()) {
            throw new InsuranceException("No Agent Found!");
        }
        
        return agentList;
    }
	@Override
	public Message editAgent(EditProfileDto agentProfileDto) {
		
        Optional<Agent> agent = agentRepository.findById(agentProfileDto.getId()); 
		
		
	    if(!agent.isPresent() || !agent.get().isIsactive())
		throw new InsuranceException("Customer doesn't exists!");
		
		Message message=new Message();
		Agent ag = agentMapper.agentProfileDtoToAgent(agentProfileDto,agent.get());
		
		System.out.println("final>>>>>>>>>>>>>>>>>>>>"+agent);
     	agentRepository.save(ag);
		message.setStatus(HttpStatus.OK);
		message.setMessage("employee Updated Successfully!");
		return message;
	}

	@Override
	public Message inActiveAgent(long id) {
		
		Optional<Agent>agent = agentRepository.findById(id);
		if(!agent.isPresent())
		{
			throw new InsuranceException("Agent doesn't exists!");
		}
		Message message = new Message();
		if(agent.get().isIsactive())
		{
			agent.get().setIsactive(false);
		    agentRepository.save(agent.get());
			message.setStatus(HttpStatus.OK);
			message.setMessage("Agent Inactivated successfully!");
			return message;
		}
		
		else
		{
		agent.get().setIsactive(true);
	    agentRepository.save(agent.get());
		message.setStatus(HttpStatus.OK);
		message.setMessage("Agent activated successfully!");
		return message;
		}
	}

	@Override
	public Message ActiveAgent(long id) {
		
		Optional<Agent>agent = agentRepository.findById(id);
		if(!agent.isPresent())
		{
			throw new InsuranceException("Agent doesn't exists!");
		}
		
		if(agent.get().isIsactive()==true)
		{
			throw new InsuranceException("Agent is already Active!");
		}
		
		agent.get().setIsactive(true);
	    agentRepository.save(agent.get());
		Message message = new Message();
		message.setStatus(HttpStatus.OK);
		message.setMessage("Agent Activated successfully!");
		return message;
	}
{
}

@Override
public Message makeClaim(AgentClaimDto agentClaimDto) {
	
	List<Agent>agents=agentRepository.findAll();
	Agent agentDb=null;
	
	
	
	for(Agent agent:agents) {
		System.out.println(agent.getLogin().getUsername());
		if(agent.getLogin().getUsername().equals(agentClaimDto.getUsername())) {
			
			agentDb=agent;
			break;
		}
	}
	
	System.out.println(agentDb);
	
	if(agentDb==null) {
		throw new InsuranceException("Agent is not found");
	}
	
	if(agentDb.getTotalCommission()>=agentClaimDto.getClaimAmount()) {
		
		Claim claim=new Claim();
		claim.setClaimAmount(agentClaimDto.getClaimAmount());
		claim.setStatus(ClaimStatus.PENDING.toString());
		claim.setBankName(agentClaimDto.getBankName());
		claim.setBranchName(agentClaimDto.getBranchName());
		claim.setBankAccountNumber(agentClaimDto.getBankAccountNumber());
		claim.setIfscCode(agentClaimDto.getIfscCode());
		agentDb.getClaims().add(claim);			
	}
	else {
		throw new InsuranceException("Claim Amount must be less than total commission");
	}
	
	agentRepository.save(agentDb);
	
	return new Message(HttpStatus.OK,"claim submitted");
}

@Override
public Agent getAgentDetail(String username) {
	List<Agent>agents=agentRepository.findAll();
	Agent agentDb=null;
	
	
	
	for(Agent agent:agents) {
		System.out.println(agent.getLogin().getUsername());
		if(agent.getLogin().getUsername().equals(username)) {
			
			agentDb=agent;
			break;
		}
	}
	
	System.out.println(agentDb);
	
	if(agentDb==null) {
		throw new InsuranceException("Agent is not found");
	}
	return agentDb;
}

@Override
public Page<AccountDto> getAllAccounts(Pageable pageable, long id) {
	List<InsurancePolicy> ag = policyRepository.findAll();
	
	List<AccountDto>ac=new ArrayList<>();
	 for(InsurancePolicy p:ag)
	 {
		 if(p.getAgent()!=null)
		 {
		 if(p.getAgent().getAgentId()==id)
		 ac.add(PolicyMapper.policyToAccountDto1(p));
		 }
	 }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), ac.size());
        Page<AccountDto> allPolicies = new PageImpl<>(ac.subList(start, end), pageable, ac.size());

        return allPolicies;
}

@Override
public AgentDto getAgentById(Long id) {
	// TODO Auto-generated method stub
	return null;
}

@Override
public void createAgent(AgentDto agentDto) {
	// TODO Auto-generated method stub
	
}

@Override
public void updateAgent(Long id, AgentDto agentDto) {
	// TODO Auto-generated method stub
	
}

@Override
public void deleteAgent(Long id) {
	// TODO Auto-generated method stub
	
}

}

