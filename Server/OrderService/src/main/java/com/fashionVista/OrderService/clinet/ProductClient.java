package com.fashionVista.OrderService.clinet;

import com.fashionVista.OrderService.dto.ProductDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ProductService", url = "http://localhost:8081")
public interface ProductClient {

    @GetMapping("/products/id/{id}")
    ProductDTO getProductById(@PathVariable("id") String id);
}