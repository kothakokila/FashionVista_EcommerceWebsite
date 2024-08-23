package com.fashionVista.CartService.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "inventory-service", url = "http://localhost:8082/inventory")
public interface InventoryServiceClient {

    @PostMapping("/stock")
    InventoryItem updateStock(@RequestParam("productId") String productId,
                              @RequestParam("stockQuan") int stockQuan);
}
