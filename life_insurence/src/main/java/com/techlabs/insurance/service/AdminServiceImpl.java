package com.techlabs.insurance.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.techlabs.insurance.dto.AddEmployeeDto;
import com.techlabs.insurance.dto.AdminGetDto;
import com.techlabs.insurance.dto.AdminPostDto;
import com.techlabs.insurance.dto.ClaimApproveDto;
import com.techlabs.insurance.dto.JwtAuthResponse;
import com.techlabs.insurance.dto.LoginDto;
import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.entity.Admin;
import com.techlabs.insurance.entity.Agent;
import com.techlabs.insurance.entity.Claim;
import com.techlabs.insurance.entity.ClaimStatus;
import com.techlabs.insurance.entity.Employee;
import com.techlabs.insurance.entity.InsurancePolicy;
import com.techlabs.insurance.entity.Login;
import com.techlabs.insurance.entity.PolicyStatus;
import com.techlabs.insurance.entity.Role;
import com.techlabs.insurance.entity.UserDetails;
import com.techlabs.insurance.exception.InsuranceException;
import com.techlabs.insurance.mapper.UserMapper;
import com.techlabs.insurance.repository.AdminRepository;
import com.techlabs.insurance.repository.AgentRepository;
import com.techlabs.insurance.repository.CustomerRepository;
import com.techlabs.insurance.repository.EmployeeRepository;
import com.techlabs.insurance.repository.LoginRepository;
import com.techlabs.insurance.repository.PolicyRepository;
import com.techlabs.insurance.repository.RoleRepository;
import com.techlabs.insurance.security.JwtTokenProvider;

@Service
public class AdminServiceImpl implements AdminService {
    
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private AgentRepository agentRepository;
    @Autowired
    private LoginRepository loginRepository;
    @Autowired
    private PolicyRepository policyRepository;

    @Override
    public JwtAuthResponse adminLogin(LoginDto loginDto) {
        try {
            JwtAuthResponse response = new JwtAuthResponse();
            System.out.println("login dto value is " + loginDto);
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getUserName(), loginDto.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtTokenProvider.generateToken(authentication);
            response.setTokenType("Bearer");
            response.setAccessToken(token);
            response.setUsername(authentication.getName());
            System.out.println("authentication is " + authentication);
            response.setRoleType(authentication.getAuthorities().iterator().next().toString());

            if (!response.getRoleType().equals(loginDto.getRoleType())) {
                throw new InsuranceException("Admin not exist!");
            }
            return response;
        } catch (BadCredentialsException e) {
            throw new InsuranceException("Bad Request");
        }
    }

    @Override
    public AdminGetDto addAdmin(AdminPostDto adminPostDto) {
        List<Login> admindb = loginRepository.findAll();
        System.out.println("addadmin dto value " + adminPostDto);

        for (Login log : admindb) {
            if (adminPostDto.getUsername().equals(log.getUsername())) {
                throw new InsuranceException("Username already used!");
            }
        }

        UserDetails details = UserMapper.adminPostDtoToUserDetails(adminPostDto);

        Login login = new Login();
        login.setUsername(adminPostDto.getUsername());
        login.setPassword(passwordEncoder.encode(adminPostDto.getPassword()));

        Set<Role> roles = new HashSet<>();
        Optional<Role> optionalRole = roleRepository.findByRolename("ROLE_ADMIN");
        if (optionalRole.isEmpty()) {
            throw new InsuranceException("Role 'ROLE_ADMIN' not found in the database. Please ensure that the role exists.");
        }
        Role userRole = optionalRole.get();
        roles.add(userRole);
        login.setRoles(roles);

        Admin admin = new Admin();
        admin.setUserDetails(details);
        admin.setLogin(login);

        adminRepository.save(admin);
        return UserMapper.userToUserGetDto(details);
    }


    @Override
    public Page<AdminGetDto> getAllAdmin(Pageable pageable) {
        Page<Admin> admins = adminRepository.findByIsactiveTrue(pageable);
        Page<AdminGetDto> adminList = admins.map(user -> UserMapper.userToUserGetDto(user.getUserDetails()));

        if (adminList.isEmpty()) {
            throw new InsuranceException("No Admin found");
        }

        return adminList;
    }

    @Override
    public String validateuser(String token) {
        return jwtTokenProvider.getRole(token).toString();
    }

    @Override
    public List<Agent> getAgentClaims() {
        List<Agent> agents = agentRepository.findAll();
        List<Agent> agentDb = new ArrayList<>();
        for (Agent agent : agents) {
            List<Claim> claims = agent.getClaims();
            boolean hasPendingClaims = claims.stream()
                .anyMatch(claim -> ClaimStatus.PENDING.toString().equals(claim.getStatus()));
            if (hasPendingClaims) {
                agentDb.add(agent);
            }
        }
        return agentDb;
    }

    @Override
    public List<InsurancePolicy> getpolicyClaims() {
        List<InsurancePolicy> policies = policyRepository.findAll();
        List<InsurancePolicy> policyDb = new ArrayList<>();
        for (InsurancePolicy insurancePolicy : policies) {
            if (insurancePolicy.getClaims() != null && 
                (insurancePolicy.getStatus() == PolicyStatus.DROP || 
                 insurancePolicy.getStatus() == PolicyStatus.COMPLETE)) {
                policyDb.add(insurancePolicy);
            }
        }
        return policyDb;
    }

    @Override
    public Message agentClaimApprove(ClaimApproveDto claimApproveDto) {
        Optional<Agent> optionalAgent = agentRepository.findById(claimApproveDto.getAgentId());
        if (optionalAgent.isEmpty()) {
            throw new InsuranceException("Agent not found");
        }
        Agent agent = optionalAgent.get();

        Claim claim = agent.getClaims().stream()
            .filter(c -> c.getClaimId() == claimApproveDto.getClaimId())
            .findFirst()
            .orElseThrow(() -> new InsuranceException("Claim not found"));

        if (agent.getTotalCommission() < claim.getClaimAmount()) {
            throw new InsuranceException("Claim amount must be less than earnings");
        }

        agent.setTotalCommission(agent.getTotalCommission() - claim.getClaimAmount());
        claim.setStatus(ClaimStatus.APPROVED.toString());

        agentRepository.save(agent);

        return new Message(HttpStatus.OK, "Claim approved");
    }

    @Override
    public Message agentPolicyClaimApprove(long policyId) {
        Optional<InsurancePolicy> optionalPolicy = policyRepository.findById(policyId);
        if (optionalPolicy.isEmpty()) {
            throw new InsuranceException("Policy not found");
        }
        InsurancePolicy insurancePolicy = optionalPolicy.get();
        insurancePolicy.getClaims().setStatus(ClaimStatus.APPROVED.toString());
        insurancePolicy.setStatus(PolicyStatus.CLAIMED);

        policyRepository.save(insurancePolicy);
        return new Message(HttpStatus.OK, "Policy claimed successfully");
    }

    @Override
    public Message agentClaimReject(ClaimApproveDto claimApproveDto) {
        Optional<Agent> optionalAgent = agentRepository.findById(claimApproveDto.getAgentId());
        if (optionalAgent.isEmpty()) {
            throw new InsuranceException("Agent not found");
        }
        Agent agent = optionalAgent.get();

        Claim claim = agent.getClaims().stream()
            .filter(c -> c.getClaimId() == claimApproveDto.getClaimId())
            .findFirst()
            .orElseThrow(() -> new InsuranceException("Claim not found"));

        claim.setStatus(ClaimStatus.REJECT.toString());
        agentRepository.save(agent);

        return new Message(HttpStatus.OK, "Claim rejected");
    }

    @Override
    public Message agentPolicyClaimReject(long policyId) {
        Optional<InsurancePolicy> optionalPolicy = policyRepository.findById(policyId);
        if (optionalPolicy.isEmpty()) {
            throw new InsuranceException("Policy not found");
        }
        InsurancePolicy insurancePolicy = optionalPolicy.get();
        insurancePolicy.getClaims().setStatus(ClaimStatus.REJECT.toString());
        insurancePolicy.setStatus(PolicyStatus.REJECT);

        policyRepository.save(insurancePolicy);
        return new Message(HttpStatus.OK, "Policy rejected");
    }
}
