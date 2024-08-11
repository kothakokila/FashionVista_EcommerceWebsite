package com.fashionVista.WishlistService.client;


import com.fashionVista.WishlistService.dto.ProductDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "product-service", url = "http://localhost:8080")
public interface ProductClient {
    @GetMapping("/products/id/{productId}")
    ProductDTO getProductById(@PathVariable("productId") String productId);
}
