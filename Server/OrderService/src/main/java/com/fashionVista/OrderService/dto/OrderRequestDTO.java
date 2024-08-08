package com.fashionVista.OrderService.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequestDTO {
    private Long userId;
    private List<OrderItemDTO> orderItems;
}
