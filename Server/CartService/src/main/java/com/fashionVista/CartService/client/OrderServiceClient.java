package com.fashionVista.CartService.client;

import com.fashionVista.CartService.dto.OrderRequestDTO;
import com.fashionVista.CartService.dto.OrderResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "order-service", url = "http://localhost:8080")
public interface OrderServiceClient {

    @PostMapping("/orders/create")
    ResponseEntity<OrderResponseDTO> placeOrder(@RequestBody OrderRequestDTO orderRequest);
}
