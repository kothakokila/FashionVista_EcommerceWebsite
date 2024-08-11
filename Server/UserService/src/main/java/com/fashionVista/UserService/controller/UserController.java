package com.fashionVista.UserService.controller;

import com.fashionVista.UserService.dto.AuthResponse;
import com.fashionVista.UserService.dto.UserDTO;
import com.fashionVista.UserService.model.User;
import com.fashionVista.UserService.model.UserResetPasswordRequest;
import com.fashionVista.UserService.repository.UserRepository;
import com.fashionVista.UserService.securityConfig.JWTTokenProvider;
import com.fashionVista.UserService.service.EmailService;
import com.fashionVista.UserService.service.UserService;
import jakarta.ws.rs.Path;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTTokenProvider jwtTokenProvider;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        Optional<User> savedUser = userService.registerUser(user);
        if (savedUser.isPresent()) {
            emailService.sendEmail(savedUser.get().getEmail(), savedUser.get().getFirstName());
            return ResponseEntity.ok(savedUser.get());
        } else {
            return ResponseEntity.status(400).body("User already exists with the email entered. Please login!");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        Optional<User> userOptional = userService.loginUser(loginUser.getEmail(), loginUser.getPassword());
        if (userOptional.isPresent()) {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginUser.getEmail(), loginUser.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtTokenProvider.generateToken(authentication);
            User user = userOptional.get();
            UserDTO userDTO = new UserDTO(
                    user.getId(),
                    user.getEmail(),
                    user.getPassword(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getRole()
            );
            AuthResponse authResponse = new AuthResponse(userDTO, token);
            return ResponseEntity.ok(authResponse);
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

    @PostMapping("/forget-password")
    public ResponseEntity<?> forgetPassword(@RequestBody User forgetUser) {
        Optional<User> user = userRepository.findByEmail(forgetUser.getEmail());
        if (user.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        } else {
            String confirmationCode = userService.generateConfirmationCode(forgetUser.getEmail());
            emailService.sendConfirmationCodeEmail(user.get().getEmail(), user.get().getFirstName(), confirmationCode);
            return ResponseEntity.ok("Confirmation code sent");
        }
    }

    @PostMapping("/validate-confirmation-code")
    public ResponseEntity<?> validateConfirmationCode(@RequestParam String email, @RequestParam String code) {
        boolean isValid = userService.validateConfirmationCode(email, code);
        if (isValid) {
            Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, new ArrayList<>());
            String token = jwtTokenProvider.generateToken(authentication);
            return ResponseEntity.ok(new AuthResponse(token));
        } else {
            return ResponseEntity.status(400).body("Invalid confirmation code.");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody UserResetPasswordRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }

        User user = userOptional.get();
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
        userService.clearConfirmationCode(email);
        emailService.sendPasswordResetSuccessful(user.getEmail(), user.getFirstName());
        return ResponseEntity.ok("Password has been reset");
    }
}
