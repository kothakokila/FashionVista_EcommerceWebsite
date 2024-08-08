package com.fashionVista.FashionVistaGateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin("http://localhost:3000")
@EnableDiscoveryClient
public class FashionVistaGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(FashionVistaGatewayApplication.class, args);
	}
}
