package com.techlabs.insurance.security;

import java.util.Set;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.techlabs.insurance.entity.Login;
import com.techlabs.insurance.repository.LoginRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	private LoginRepository loginRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		System.out.println("entry1");
		
		Login login = loginRepo.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("user not found :"+username));
		
		Set<GrantedAuthority> authority = login.getRoles().stream().map((role)->new SimpleGrantedAuthority(role.getRolename())).
				collect(Collectors.toSet());
		
		return new org.springframework.security.core.userdetails.User(login.getUsername(),login.getPassword(),authority);
	}

}
