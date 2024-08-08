package com.fashionVista.CartService.controller;

import com.fashionVista.CartService.dto.CartResponseDTO;
import com.fashionVista.CartService.dto.OrderRequestDTO;
import com.fashionVista.CartService.exceptions.ResourceNotFoundException;
import com.fashionVista.CartService.model.CartItem;
import com.fashionVista.CartService.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<CartResponseDTO> getCartByUserId(@PathVariable Long userId) {
        CartResponseDTO cartResponse = cartService.getCartByUserId(userId);
        return ResponseEntity.ok(cartResponse);
    }

    @PostMapping("/{userId}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<CartItem> addItem(@PathVariable Long userId, @RequestBody CartItem cartItem) {
        CartItem addedItem = cartService.addItem(userId, cartItem);
            return ResponseEntity.ok(addedItem);
    }

    @DeleteMapping("/{userId}/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> removeItem(@PathVariable Long userId, @PathVariable Long id) {
        try {
            cartService.removeItem(userId, id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body("Cart item not found");
        }
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{userId}/placeOrder")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> placeOrder(@PathVariable Long userId) {
        try {
            OrderRequestDTO orderRequest = cartService.placeOrder(userId);
            return ResponseEntity.ok(orderRequest);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

}
