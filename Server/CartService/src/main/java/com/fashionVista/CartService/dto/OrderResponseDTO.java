package com.fashionVista.CartService.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderResponseDTO {
    private Long id;
    private Long userId;
    private String orderDate;
    private Double totalAmount;
    private List<OrderItemDTO> items;
}