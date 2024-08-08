package com.fashionVista.CartService.dto;

import lombok.*;
@Data
public class CartItemDTO {
    private Long id;
    private ProductDTO product;
    private Integer quantity;
}
