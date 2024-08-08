package com.fashionVista.CartService.dto;

import lombok.Data;

@Data
public class ProductDTO {
    private String id;
    private String name;
    private String description;
    private double price;
    private String image;
    private String category;
}
