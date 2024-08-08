package com.fashionVista.WishlistService.dto;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private String id;
    private String name;
    private String description;
    private double price;
    private String image;
    private String category;
}
