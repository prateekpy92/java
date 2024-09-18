package com.techlabs.insurance.security;

import java.security.Key;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.techlabs.insurance.exception.MaleformedJwtException;
import com.techlabs.insurance.exception.UserAPIException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;


@Component
public class JwtTokenProvider {
	
	
//	@Value("${app.jwt-secret}")
	private String jwtSecret="eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NzAxMTAyMywiaWF0IjoxNjk3MDExMDIzfQ";
	
//	@Value("${app.jwt-expiration-millisecond}")
	private long jwtExpirationTime=604800000;
	
	public String generateToken(Authentication authentication)
	{
		System.out.println(authentication);
		String username = authentication.getName();
	
		Date currentDate = new Date();
		
		Date expireDate = new Date(currentDate.getTime()+jwtExpirationTime);
		
		String token = Jwts.builder().setSubject(username).setIssuedAt(new Date()).setExpiration(expireDate).
				claim("role",authentication.getAuthorities()).signWith(key()).compact();
		
		return token;
	}

	private Key key()
	{
		return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
	}
	
	
	public String getUsername(String token)
	{
		Claims claims = Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token).getBody();
		
		System.out.println(claims.get("role"));
		
		String username = claims.getSubject();
		
		return username;
	}
	

	 public boolean validateToken(String token) {
    	 try {
    		 Jwts.parserBuilder()
    		         .setSigningKey(key())
    		         .build()
    		         .parse(token);
    		 return true;
    	 }
    	 catch(MaleformedJwtException ex) {
    		 throw new UserAPIException(HttpStatus.BAD_REQUEST,"Invalid JWT token");
    	 }catch(ExpiredJwtException ex) {
    		 throw new UserAPIException(HttpStatus.BAD_REQUEST,"expired JWT token");
    	 }catch(UnsupportedJwtException ex) {
    		 throw new UserAPIException(HttpStatus.BAD_REQUEST,"unsupported JWT token");
    	 }catch(IllegalArgumentException ex) {
    		 throw new UserAPIException(HttpStatus.BAD_REQUEST,"JWT claim string is empty");
    	 }
    	 catch(Exception e) {
    		 throw new UserAPIException(HttpStatus.BAD_REQUEST,"invalid credential");
    	 }
     }

	public Object getRole(String token) {
           Claims claims = Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token).getBody();
		   String role = (String) claims.get("role");
		   return role;
		
	}
     

}
