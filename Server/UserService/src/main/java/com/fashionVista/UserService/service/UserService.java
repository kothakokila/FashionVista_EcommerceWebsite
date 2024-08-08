package com.fashionVista.UserService.service;

import com.fashionVista.UserService.model.User;
import com.fashionVista.UserService.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<User> registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return Optional.empty();
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return Optional.of(userRepository.save(user));
    }

    public Optional<User> loginUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                return Optional.of(user);
            } else {
                return Optional.empty();
            }
        }
        return Optional.empty();
    }


    private final Map<String, String> confirmationCodes = new HashMap<>();
    private final Map<String, LocalDateTime> codeTimestamps = new HashMap<>();

    public String generateConfirmationCode(String email) {
        String code = String.format("%06d", new Random().nextInt(999999));
        confirmationCodes.put(email, code);
        codeTimestamps.put(email, LocalDateTime.now());
        return code;
    }

    public boolean validateConfirmationCode(String email, String code) {
        if (!confirmationCodes.containsKey(email)) {
            return false;
        }
        LocalDateTime generatedTime = codeTimestamps.get(email);
        if (generatedTime != null && generatedTime.plusMinutes(10).isAfter(LocalDateTime.now())) {
            return code.equals(confirmationCodes.get(email));
        }
        return false;
    }

    public void clearConfirmationCode(String email) {
        confirmationCodes.remove(email);
        codeTimestamps.remove(email);
    }
}
