package com.fashionVista.FashionVistaGateway.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
//import reactor.core.publisher.Mono;
import org.springframework.http.HttpStatus;


@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationFilter.class);
    @Autowired
    private RouteValidator validator;

//    @Autowired
//    private RestTemplate template;
    @Autowired
    private JWTTokenProvider jwtTokenProvider;

    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            if (validator.isSecured.test(exchange.getRequest())) {
                if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing Authorization header");
                }

                String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    String token = authHeader.substring(7);
                    logger.info("Extracted token: {}", token);

                    try {
                        if (!jwtTokenProvider.validateToken(token)) {
                            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid Token");
                        }
                    } catch (Exception e) {
                        logger.error("Token validation failed", e);
                        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized access", e);
                    }
                } else {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid Authorization header format");
                }
            }

            return chain.filter(exchange);
        };
    }

    public static class Config {
    }
}