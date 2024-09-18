package com.techlabs.insurance.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.techlabs.insurance.dto.AccountDto;
import com.techlabs.insurance.dto.AgentDto;
import com.techlabs.insurance.dto.CustomerGetDto;
import com.techlabs.insurance.dto.CustomerPostDto;

import com.techlabs.insurance.dto.EditProfileDto;
import com.techlabs.insurance.dto.JwtAuthResponse;
import com.techlabs.insurance.dto.LoginDto;
import com.techlabs.insurance.dto.Message;
import com.techlabs.insurance.entity.Agent;
import com.techlabs.insurance.entity.Customer;
import com.techlabs.insurance.entity.InsurancePolicy;
import com.techlabs.insurance.entity.Login;
import com.techlabs.insurance.entity.Role;
import com.techlabs.insurance.entity.UserDetails;
import com.techlabs.insurance.exception.InsuranceException;
import com.techlabs.insurance.mapper.AgentMapper;
import com.techlabs.insurance.mapper.CustomerMapper;

import com.techlabs.insurance.mapper.PolicyMapper;
import com.techlabs.insurance.repository.AgentRepository;
import com.techlabs.insurance.repository.CustomerRepository;
import com.techlabs.insurance.repository.LoginRepository;
import com.techlabs.insurance.repository.RoleRepository;
import com.techlabs.insurance.repository.UserDetailsRepository;
import com.techlabs.insurance.security.JwtTokenProvider;

import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
@Service
public class CustomerServiceImpl implements CustomerService {
   @Autowired
   private CustomerRepository customerRepository;
   @Autowired
   private PasswordEncoder passwordEncoder;
   @Autowired
	private RoleRepository roleRepository;
   @Autowired
   private JwtTokenProvider jwtTokenProvider;
   @Autowired
   private AuthenticationManager authenticationManager;
   @Autowired
   private LoginRepository loginRepository;
   @Autowired
   private AgentRepository agentRepository;
   @Autowired
   private JavaMailSender mailSender;
   @Autowired
   private AgentMapper agentMapper;
   

   @Autowired
   private UserDetailsRepository userDetailsRepository;

   private static final Logger logger = LoggerFactory.getLogger(CustomerServiceImpl.class);
   
  
   
   @Override
	public JwtAuthResponse customerLogin(LoginDto logindto) {
		try
		{
//			
			System.out.println("login dto value is +"+logindto);
			
			 logger.debug("login dto value is {}", logindto);
			
			JwtAuthResponse response=new JwtAuthResponse();
			Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(logindto.getUserName(), logindto.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String token = jwtTokenProvider.generateToken(authentication);
			response.setTokenType("Bearer");
			response.setAccessToken(token);
			response.setUsername(authentication.getName());
			System.out.println("authentication is "+authentication);
			response.setRoleType(authentication.getAuthorities().iterator().next().toString());
			if(!response.getRoleType().equals(logindto.getRoleType()))
			{
				throw new InsuranceException("Customer not exist!");
			}
			return response;
			
			
		}
		catch (BadCredentialsException e)
		{
			throw new InsuranceException("Bad Request");
		}
		
	}
   
   
	@Override
	public CustomerGetDto getcustomerByUsername(String username) {
		List<Customer>customers=customerRepository.findAll();
		Customer customerDb=null;
		
		for(Customer ct:customers) {
			System.out.println(ct.getLogin().getUsername());
			if(ct.getLogin().getUsername().equals(username)) {
				
				customerDb=ct;
				break;
			}
		}
		
		if(customerDb==null) {
			throw new InsuranceException("Customer not found");
		}
		
		return CustomerMapper.customerToCustomerGetDto(customerDb);
		
	}

	
	@Override
	public Page<CustomerGetDto> getAllCustomer(Pageable pageable) {
		
		Page<Customer> customers = customerRepository.findAll(pageable);
	    Page<CustomerGetDto> customerList = customers.map(CustomerMapper::customerToCustomerGetDto);
		//Page<CustomerGetDto>customerList = customers.map(customer->(CustomerMapper.customerToCustomerGetDto(customer)));
		
		if(customerList.isEmpty())
		{
			throw new InsuranceException("No Customer Found!");
		}
		
		return customerList;
	}

	
	@Override
	public Message inActiveCustomer(long id) {
		Optional<Customer>customer = customerRepository.findById(id);
		if(!customer.isPresent())
		{
			throw new InsuranceException("Customer doesn't exists!");
		}
		Message message = new Message();
		if(customer.get().isIsactive())
		{
			customer.get().setIsactive(false);
			customerRepository.save(customer.get());
			message.setStatus(HttpStatus.OK);
			message.setMessage("Customer InActived successfully!");
			return message;
		}
		
		customer.get().setIsactive(true);
		customerRepository.save(customer.get());
		message.setStatus(HttpStatus.OK);
		message.setMessage("Customer Actived successfully!");
		return message;
	}

	
	@Override
	public Message ActiveCustomer(long id) {
		Optional<Customer>customer = customerRepository.findById(id);
		if(!customer.isPresent())
		{
			throw new InsuranceException("Customer doesn't exists!");
		}
		
		if(customer.get().isIsactive()==true)
		{
			throw new InsuranceException("Customer is already Active!");
		}
		
		customer.get().setIsactive(true);
		customerRepository.save(customer.get());
		Message message = new Message();
		message.setStatus(HttpStatus.OK);
		message.setMessage("Customer Activated successfully!");
		return message;
	}

	@Override
	public Message editCustomer(EditProfileDto editCustomerDto) {
        Optional<Customer> customer = customerRepository.findById(editCustomerDto.getId()); 
		
		
	    if(!customer.isPresent() || !customer.get().isIsactive())
		throw new InsuranceException("Customer doesn't exists!");
		
		Message message=new Message();
		Customer ct = CustomerMapper.editCustomerDtoToCustomer(editCustomerDto,customer.get());
		
		System.out.println("final>>>>>>>>>>>>>>>>>>>>"+customer);
		customerRepository.save(ct);
		message.setStatus(HttpStatus.OK);
		message.setMessage("employee Updated Successfully!");
		return message;
	}

	@Override
	public Message addcustomer(CustomerPostDto customerDto) {
		List<Login> admindb = loginRepository.findAll();
		System.out.println("addadmin dto value "+customerDto);
		
		for(Login log:admindb)
		{
			if(customerDto.getUsername().equals(log.getUsername()))
			{
				throw new InsuranceException("username already used!");
			}
		}
		
		    Customer ct = CustomerMapper.CustomerPostDtoToCustomer(customerDto);
		    Login login = new Login();
			login.setUsername(customerDto.getUsername());
			login.setPassword(passwordEncoder.encode(customerDto.getPassword()));

		Set<Role> role = new HashSet<>();
	      
		  Role userRole = roleRepository.findByRolename("ROLE_CUSTOMER").get(); 
		  role.add(userRole); 
		  login.setRoles(role);
		  ct.setLogin(login);
		  customerRepository.save(ct);
		Message message = new Message();
		message.setStatus(HttpStatus.OK);
		message.setMessage("Customer Saved Successfully!");
		return message;
	}


	@Override
	public Page<AccountDto> getCustomerAccounts(Pageable pageable, long id) {
		Customer ct = customerRepository.findById(id).get();
		
		List<InsurancePolicy>policies = ct.getPolicies();
		List<AccountDto>ac=new ArrayList<>();
		 for(InsurancePolicy p:policies)
		 {
			 ac.add(PolicyMapper.policyToAccountDto1(p));
		 }

	        int start = (int) pageable.getOffset();
	        int end = Math.min((start + pageable.getPageSize()), ac.size());
	        Page<AccountDto> allPolicies = new PageImpl<>(ac.subList(start, end), pageable, ac.size());

	        return allPolicies;
	}


	@Override
	public void saveDocument(Long customerId, MultipartFile aadhaarCard, MultipartFile panCard) throws IOException {
		// TODO Auto-generated method stub
		
	}

	

	   

//	    @Override
//	    public void registerCustomer(CustomerRegistrationDto registrationDto) {
//	        if (loginRepository.existsByUsername(registrationDto.getUsername())) {
//	            throw new InsuranceException("Username already exists");
//	        }
//
//	        // Encode password
//	        String encodedPassword = passwordEncoder.encode(registrationDto.getPassword());
//	        registrationDto.setPassword(encodedPassword);
//
//	        // Map DTO to entity
//	        Customer customer = CustomerRegistrationMapper.dtoToCustomer(registrationDto);
//	        
//	        // Save customer
//	        customerRepository.save(customer);
//	    }

//	    @Override
//	    public CustomerGetDto getcustomerByUsername1(String username) {
//	        Customer customer = customerRepository.findByLoginUsername(username)
//	            .orElseThrow(() -> new InsuranceException("Customer not found"));
//	        
//	        return CustomerMapper.customerToCustomerGetDto(customer);
//	    }
	    
//	    public List<AgentDto> findAgentsByCity(String city) {
//	        List<Agent> agents = AgentRepository.findByCity(city);
//	        if (agents == null) {
//	            agents = Collections.emptyList(); 
//	        }
//	        return agents.stream()
//	                .map(AgentMapper::agentToAgentDto)
//	                .collect(Collectors.toList());
//	    }
//	    @Override
//	    public List<AgentDto> findAgentsByState(String state) {
//	        List<Agent> agents = AgentRepository.findByState(state);
//	        if (agents == null) {
//	            agents = Collections.emptyList(); 
//	        }
//	        return agents.stream()
//	                .map(AgentMapper::agentToAgentDto)
//	                .collect(Collectors.toList());
//	    }
//	    @Override
//	    public List<Customer> findCustomersByEmail(String email) {
//	        List<Customer> customers = customerRepository.findByUserDetailsEmail(email);
//	        if (customers.isEmpty()) {
//	            throw new InsuranceException("Customer not found");
//	        }
//	        return customers;
//	    }
	
	@Transactional
	public Customer registerCustomer(CustomerPostDto customerPostDto) {
	    // Create UserDetails object
	    UserDetails userDetails = new UserDetails();
	    userDetails.setFirstName(customerPostDto.getFirstName());
	    userDetails.setLastName(customerPostDto.getLastName());
	    userDetails.setMobileNumber(customerPostDto.getMobileNumber());
	    userDetails.setEmail(customerPostDto.getEmail());
	    userDetails.setDateOfBirth(customerPostDto.getDateOfBirth());
	    userDetails.setUsername(customerPostDto.getUsername());
	    userDetails.setHouseNo(customerPostDto.getHouseNo());
	    userDetails.setApartment(customerPostDto.getApartment());
	    userDetails.setCity(customerPostDto.getCity());
	    userDetails.setState(customerPostDto.getState());

	    // Create Login object
	    Login login = new Login();
	    login.setUsername(customerPostDto.getUsername());
	    login.setPassword(passwordEncoder.encode(customerPostDto.getPassword()));

	    // Convert role names to Role entities and ensure roles are unique
	    Set<Role> roles = customerPostDto.getRoles().stream()
	        .map(roleName -> roleRepository.findByRolename(roleName)
	                .orElseThrow(() -> new InsuranceException("Role '" + roleName + "' not found!")))
	        .collect(Collectors.toSet());

	    login.setRoles(roles);

	    // Save Login and UserDetails
	    login = loginRepository.save(login);
	    userDetails = userDetailsRepository.save(userDetails);

	    // Create Customer object
	    Customer customer = new Customer();
	    customer.setLogin(login);
	    customer.setUserDetails(userDetails);
	    customer.setIsactive(true); // Set customer as active by default

	    // Save customer and return
	    return customerRepository.save(customer);
	}


	@Override
	public CustomerPostDto getCustomerById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public void createCustomer(CustomerPostDto customerPostDto) {
		// TODO Auto-generated method stub
		
	}


	@Override
	public void updateCustomer(Long id, CustomerPostDto customerPostDto) {
		// TODO Auto-generated method stub
		
	}


	@Override
	public void deleteCustomer(Long id) {
		// TODO Auto-generated method stub
		
	}


}
