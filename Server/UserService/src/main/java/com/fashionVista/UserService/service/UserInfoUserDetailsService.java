package com.fashionVista.UserService.service;

import com.fashionVista.UserService.securityConfig.FashionVistaUserDetails;
import com.fashionVista.UserService.exceptions.UserNotFoundException;
import com.fashionVista.UserService.model.User;
import com.fashionVista.UserService.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.util.Optional;
@Component
public class UserInfoUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UserNotFoundException {
        Optional<User> user = userRepository.findByEmail(email);
        return user.map(FashionVistaUserDetails::new)
                .orElseThrow(() -> new UserNotFoundException("User with email: %s not found." + email));
    }
}
