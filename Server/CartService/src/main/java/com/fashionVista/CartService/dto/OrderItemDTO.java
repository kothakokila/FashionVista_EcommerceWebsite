package com.fashionVista.CartService.dto;

import lombok.Data;

@Data
public class OrderItemDTO {
    private ProductDTO product;
    private Integer quantity;
}
