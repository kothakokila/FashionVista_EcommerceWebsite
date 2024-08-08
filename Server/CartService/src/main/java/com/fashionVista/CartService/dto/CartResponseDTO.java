package com.fashionVista.CartService.dto;

import lombok.*;

import java.util.List;
@Data
public class CartResponseDTO {
    private Long userId;
    private List<CartItemDTO> cartItems;
}
