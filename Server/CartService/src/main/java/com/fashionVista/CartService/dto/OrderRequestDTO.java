package com.fashionVista.CartService.dto;

import lombok.Data;

import java.util.List;
@Data
public class OrderRequestDTO {
    private Long userId;
    private List<OrderItemDTO> orderItems;
}
