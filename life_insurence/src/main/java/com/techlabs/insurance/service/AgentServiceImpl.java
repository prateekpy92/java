package com.techlabs.insurance.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
import com.techlabs.insurance.repository.CustomerRepository;
import com.techlabs.insurance.repository.LoginRepository;
import com.techlabs.insurance.repository.PolicyRepository;
import com.techlabs.insurance.repository.RoleRepository;
import com.techlabs.insurance.repository.UserDetailsRepository;
import com.techlabs.insurance.security.JwtTokenProvider;

@Service
public class AgentServiceImpl implements AgentService {

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
    

    @Autowired
    private CustomerRepository customerRepository;

    private AgentMapper agentMapper = new AgentMapper();

    @Override
    public JwtAuthResponse agentLogin(LoginDto logindto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(logindto.getUserName(), logindto.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtTokenProvider.generateToken(authentication);

            JwtAuthResponse response = new JwtAuthResponse();
            response.setAccessToken(token);
            response.setUsername(authentication.getName());
            response.setRoleType(authentication.getAuthorities().iterator().next().toString());

            if (!response.getRoleType().equals(logindto.getRoleType())) {
                throw new InsuranceException("Agent role mismatch!");
            }

            return response;

        } catch (BadCredentialsException e) {
            throw new InsuranceException("Invalid credentials provided");
        }
    }

    public Page<Customer> getCustomersByAgentUsername(String username, int pageNumber, int pageSize) {
        Agent agent = agentRepository.findByLogin_Username(username)
            .orElseThrow(() -> new InsuranceException("Agent not found"));
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return customerRepository.findByAgent(agent, pageable);
    }
    public Agent getAgentEntityByUsername(String username) {
        return agentRepository.findAll().stream()
            .filter(agent -> agent.getLogin().getUsername().equals(username))
            .findFirst()
            .orElseThrow(() -> new InsuranceException("Agent not found"));
    }


    @Override
    public Message addAgent(AgentDto agentDto) {
        if (loginRepository.existsByUsername(agentDto.getUsername())) {
            throw new InsuranceException("Username already used!");
        }

        UserDetails userDetails = agentMapper.agentDtoToUserDetails(agentDto);
        if (userDetails == null) {
            throw new IllegalArgumentException("UserDetails object must not be null");
        }

        userDetails = userDetailsRepository.save(userDetails);

        Login login = new Login();
        login.setUsername(agentDto.getUsername());
        login.setPassword(passwordEncoder.encode(agentDto.getPassword()));

        Role userRole = roleRepository.findByRolename("ROLE_AGENT")
            .orElseThrow(() -> new InsuranceException("Role not found!"));
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        login.setRoles(roles);

        Agent agent = new Agent();
        agent.setLogin(login);
        agent.setUserDetails(userDetails);
        agentRepository.save(agent);

        Message message = new Message(HttpStatus.OK, "Agent Saved Successfully!");
        return message;
    }

    @Override
    public Page<AgentGetDto> getAllAgents(Pageable pageable) {
        Page<Agent> agents = agentRepository.findAll(pageable);
        Page<AgentGetDto> agentDtos = agents.map(agentMapper::agentToAgentGetDto);

        if (agentDtos.isEmpty()) {
            throw new InsuranceException("No Agent Found!");
        }

        return agentDtos;
    }

    @Override
    public Message editAgent(EditProfileDto agentProfileDto) {
        Agent agent = agentRepository.findById(agentProfileDto.getId())
            .orElseThrow(() -> new InsuranceException("Agent not found or inactive"));

        agentMapper.agentProfileDtoToAgent(agentProfileDto, agent);
        agentRepository.save(agent);

        return new Message(HttpStatus.OK, "Agent updated successfully!");
    }

    @Override
    public Message inActiveAgent(long id) {
        Agent agent = agentRepository.findById(id)
            .orElseThrow(() -> new InsuranceException("Agent doesn't exist"));

        agent.setIsactive(false);
        agentRepository.save(agent);

        return new Message(HttpStatus.OK, "Agent inactivated successfully!");
    }

    @Override
    public Message ActiveAgent(long id) {
        Agent agent = agentRepository.findById(id)
            .orElseThrow(() -> new InsuranceException("Agent doesn't exist"));

        if (agent.isIsactive()) {
            throw new InsuranceException("Agent is already active!");
        }

        agent.setIsactive(true);
        agentRepository.save(agent);

        return new Message(HttpStatus.OK, "Agent activated successfully!");
    }

    @Override
    public Message makeClaim(AgentClaimDto agentClaimDto) {
        Agent agent = agentRepository.findAll().stream()
            .filter(a -> a.getLogin().getUsername().equals(agentClaimDto.getUsername()))
            .findFirst()
            .orElseThrow(() -> new InsuranceException("Agent not found"));

        if (agent.getTotalCommission() < agentClaimDto.getClaimAmount()) {
            throw new InsuranceException("Claim Amount must be less than total commission");
        }

        Claim claim = new Claim();
        claim.setClaimAmount(agentClaimDto.getClaimAmount());
        claim.setStatus(ClaimStatus.PENDING.toString());
        claim.setBankName(agentClaimDto.getBankName());
        claim.setBranchName(agentClaimDto.getBranchName());
        claim.setBankAccountNumber(agentClaimDto.getBankAccountNumber());
        claim.setIfscCode(agentClaimDto.getIfscCode());
        agent.getClaims().add(claim);

        agentRepository.save(agent);

        return new Message(HttpStatus.OK, "Claim submitted");
    }

    @Override
    public Page<AccountDto> getAllAccounts(Pageable pageable, long id) {
        List<InsurancePolicy> policies = policyRepository.findAll();
        List<AccountDto> accountDtos = new ArrayList<>();

        for (InsurancePolicy policy : policies) {
            if (policy.getAgent() != null && policy.getAgent().getAgentId() == id) {
                accountDtos.add(PolicyMapper.policyToAccountDto1(policy));
            }
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), accountDtos.size());

        return new PageImpl<>(accountDtos.subList(start, end), pageable, accountDtos.size());
    }

	@Override
	public Agent getAgentDetail(String username) {
		// TODO Auto-generated method stub
		return null;
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

	@Override
	public AgentGetDto getAgentByUsername(String username) {
		// TODO Auto-generated method stub
		return null;
	}
}
