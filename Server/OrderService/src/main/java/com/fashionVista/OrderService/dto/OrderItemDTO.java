package com.fashionVista.OrderService.dto;

import lombok.Data;

@Data
public class OrderItemDTO {
    private ProductDTO product;
    private Integer quantity;
}
