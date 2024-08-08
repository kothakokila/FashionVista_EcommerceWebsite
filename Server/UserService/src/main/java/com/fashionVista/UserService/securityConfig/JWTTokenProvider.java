package com.fashionVista.UserService.securityConfig;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;

@Component
public class JWTTokenProvider {

    private final SecretKey secretKey;

    public JWTTokenProvider() {
        String base64Key="q/iUqCU04fsqJcCkdbWGmAFjSGDTqV/6grcnYo0PKAo=";
        byte[] keyBytes = Base64.getDecoder().decode(base64Key);
        this.secretKey = new SecretKeySpec(keyBytes, SignatureAlgorithm.HS256.getJcaName());
    }
    public String generateToken(Authentication authentication){
        String email=authentication.getName();
        Date currentDate= new Date();
        Date expireDate=new Date(currentDate.getTime()+3600000);

        String token= Jwts.builder()
                .setSubject(email)
                .setIssuedAt(currentDate)
                .setExpiration(expireDate)
                .signWith(secretKey)
                .compact();

        return token;
    }

    public String getEmailFromToken(String token){
       Claims claims= Jwts.parser().setSigningKey(secretKey)
               .build()
               .parseClaimsJws(token).getBody();
       return claims.getSubject();
    }

    public boolean validateToken(String token){
        try{
            System.out.println("Token: " + token);
            Jwts.parser().setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);
            return true;
        }
        catch(Exception e){
            System.err.println("Token validation error: " + e.getMessage());
            return false;
        }

    }
}
