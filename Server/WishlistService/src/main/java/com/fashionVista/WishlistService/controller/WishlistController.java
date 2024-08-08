package com.fashionVista.WishlistService.controller;

import com.fashionVista.WishlistService.dto.WishlistResponseDTO;
import com.fashionVista.WishlistService.exceptions.ResourceNotFoundException;
import com.fashionVista.WishlistService.model.WishlistItem;
import com.fashionVista.WishlistService.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {
    @Autowired
    private WishlistService wishlistService;

    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<WishlistResponseDTO> getWishlistByUserId(@PathVariable Long userId) {
        WishlistResponseDTO wishlistResponse = wishlistService.getWishlistByUserId(userId);
        return ResponseEntity.ok(wishlistResponse);
    }

    @PostMapping("/{userId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addItem(@PathVariable Long userId, @RequestBody WishlistItem wishlistItem) {
        WishlistItem addedItem = wishlistService.addItem(userId, wishlistItem);
        if (addedItem != null) {
            return ResponseEntity.ok(addedItem);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Item already exists in the wishlist");
        }
    }

    @DeleteMapping("/{userId}/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> removeItem(@PathVariable Long userId, @PathVariable Long id) {
        try {
            wishlistService.removeItem(userId, id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body("Wishlist item not found");
        }
    }

}