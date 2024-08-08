package com.fashionVista.OrderService.dto;

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
