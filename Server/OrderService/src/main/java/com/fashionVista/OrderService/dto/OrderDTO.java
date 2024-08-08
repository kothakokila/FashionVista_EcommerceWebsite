package com.fashionVista.OrderService.dto;

import lombok.Data;

import java.util.List;
@Data
public class OrderDTO {
    private Long orderId;
    private String orderDate;
    private double totalAmount;
    private List<OrderItemDTO> items;
}
