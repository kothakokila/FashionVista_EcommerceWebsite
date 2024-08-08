package com.fashionVista.UserService.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private UserDTO user;
    private String token;

    public AuthResponse(String token) {
        this.token = token;
    }
}
