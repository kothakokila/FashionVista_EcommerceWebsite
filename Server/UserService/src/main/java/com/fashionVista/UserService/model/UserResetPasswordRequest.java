package com.fashionVista.UserService.model;

import lombok.Data;

@Data
public class UserResetPasswordRequest {
    private String email;
    private String code;
    private String password;
}
