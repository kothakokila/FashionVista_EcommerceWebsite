package com.fashionVista.OrderService.controller;

import com.fashionVista.OrderService.dto.OrderDTO;
import com.fashionVista.OrderService.dto.OrderRequestDTO;
import com.fashionVista.OrderService.dto.OrderResponseDTO;
import com.fashionVista.OrderService.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<OrderResponseDTO> placeOrder(@RequestBody OrderRequestDTO order) {
        OrderResponseDTO createdOrder = orderService.createOrder(order);
        return ResponseEntity.ok(createdOrder);
    }

    @GetMapping("/{userId}")
    public List<OrderDTO> getOrdersByUserId(@PathVariable Long userId) {
        return orderService.getOrdersByUserId(userId);
    }

}
