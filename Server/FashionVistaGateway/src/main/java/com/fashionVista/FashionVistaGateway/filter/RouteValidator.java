package com.fashionVista.FashionVistaGateway.filter;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

@Component
public class RouteValidator {

    // Define open API endpoints
    private static final List<String> OPEN_API_ENDPOINTS = List.of(
            "/user/signup",
            "/user/login",
            "/user/forget-password",
            "/user/validate-confirmation-code",
            "/user/reset-password"
    );

    public Predicate<ServerHttpRequest> isSecured = request ->
            OPEN_API_ENDPOINTS
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().startsWith(uri));
}