package com.fashionVista.CartService.dto;

import lombok.Data;

@Data
public class InventoryItemDTO {
    private String id;
    private String productId;
    private int stockQuan;
}
