package com.fashionVista.CartService.service;

import com.fashionVista.CartService.client.OrderServiceClient;
import com.fashionVista.CartService.client.ProductServiceClient;
import com.fashionVista.CartService.dto.*;
import com.fashionVista.CartService.exceptions.ResourceNotFoundException;
import com.fashionVista.CartService.model.CartItem;
import com.fashionVista.CartService.repository.CartRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

    private static final Logger logger = LoggerFactory.getLogger(CartService.class);

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductServiceClient productClient;

    @Autowired
    private OrderServiceClient orderClient;


    public CartResponseDTO getCartByUserId(Long userId) {

        List<CartItem> cartItems = cartRepository.findByUserId(userId);
        List<CartItemDTO> cartItemDTOs = cartItems.stream().map(cartItem -> {
            CartItemDTO cartItemDTO = new CartItemDTO();
            cartItemDTO.setId(cartItem.getId());
            cartItemDTO.setQuantity(cartItem.getQuantity());

            ProductDTO product = productClient.getProductById(cartItem.getProductId());
            if (product != null) {
                cartItemDTO.setProduct(product);
            } else {
                logger.warn("Product not found for ID: {}", cartItem.getProductId());
            }

            return cartItemDTO;
        }).collect(Collectors.toList());

        CartResponseDTO response = new CartResponseDTO();
        response.setUserId(userId);
        response.setCartItems(cartItemDTOs);

        return response;
    }

    public CartItem addItem(Long userId, CartItem cartItem) {

        ProductDTO product = productClient.getProductById(cartItem.getProductId());
        if (product == null) {
            throw new ResourceNotFoundException("Product not found");
        }

        CartItem existingCartItem = cartRepository.findByUserIdAndProductId(userId, cartItem.getProductId());
        if (existingCartItem != null) {
            existingCartItem.setQuantity(existingCartItem.getQuantity() + cartItem.getQuantity());
            return cartRepository.save(existingCartItem);
        } else {
            cartItem.setUserId(userId);
            return cartRepository.save(cartItem);
        }
    }

    public void removeItem(Long userId, Long id) {
        CartItem cartItem = cartRepository.findById(id)
                .filter(item -> item.getUserId().equals(userId))
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));
        cartRepository.delete(cartItem);
    }

    public void clearCart(Long userId) {
        List<CartItem> cartItems = cartRepository.findByUserId(userId);
        if (!cartItems.isEmpty()) {
            cartRepository.deleteAll(cartItems);
        }
    }

    public OrderRequestDTO placeOrder(Long userId) {

        List<CartItem> cartItems = cartRepository.findByUserId(userId);
        if (cartItems.isEmpty()) {
            throw new ResourceNotFoundException("Cart is empty");
        }

        OrderRequestDTO orderRequest = new OrderRequestDTO();
        orderRequest.setUserId(userId);
        orderRequest.setOrderItems(cartItems.stream().map(cartItem -> {
            OrderItemDTO orderItem = new OrderItemDTO();
            orderItem.setQuantity(cartItem.getQuantity());;

            ProductDTO product = productClient.getProductById(cartItem.getProductId());
            if (product != null) {
                orderItem.setProduct(product);
            } else {
                throw new ResourceNotFoundException("Product not found for ID: " + cartItem.getProductId());
            }

            return orderItem;
        }).collect(Collectors.toList()));

        try {
            ResponseEntity<OrderResponseDTO> responseEntity = orderClient.placeOrder(orderRequest);
            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                clearCart(userId);
                return orderRequest;
            } else {
                throw new RuntimeException("Failed to place order: " + responseEntity.getStatusCode() + " - " + responseEntity.getBody());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error while communicating with OrderService: " + e.getMessage(), e);
        }
    }
}

