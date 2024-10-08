package com.fashionVista.UserService.repository;

import com.fashionVista.UserService.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmailAndPassword(String email, String password);

    Optional<User> findById(Long userId);

    Optional<User> findByEmail(String email);
}
