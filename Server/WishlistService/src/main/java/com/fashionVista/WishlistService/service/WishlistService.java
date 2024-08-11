package com.fashionVista.WishlistService.service;

import com.fashionVista.WishlistService.client.ProductClient;
import com.fashionVista.WishlistService.dto.*;
import com.fashionVista.WishlistService.model.WishlistItem;
import com.fashionVista.WishlistService.repository.WishlistRepository;
import com.fashionVista.WishlistService.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WishlistService {
    @Autowired
    private WishlistRepository wishlistRepository;
    @Autowired
    private ProductClient productClient;

    public WishlistResponseDTO getWishlistByUserId(Long userId) {
        List<WishlistItem> wishlistItems = wishlistRepository.findByUserId(userId);

        List<WishlistItemDTO> wishlistItemDTOs = wishlistItems.stream().map(wishlistItem -> {
            WishlistItemDTO wishlistItemDTO = new WishlistItemDTO();
            wishlistItemDTO.setId(wishlistItem.getId());

            ProductDTO product = productClient.getProductById(wishlistItem.getProductId());
            if (product == null) {
                throw new ResourceNotFoundException("Product not found for ID: " + wishlistItem.getProductId());
            }
            wishlistItemDTO.setProduct(product);
            return wishlistItemDTO;
        }).collect(Collectors.toList());

        WishlistResponseDTO response = new WishlistResponseDTO();
        response.setUserId(userId);
        response.setWishlistItems(wishlistItemDTOs);

        return response;
    }

    public WishlistItem addItem(Long userId, WishlistItem wishlistItem) {
        List<WishlistItem> existingItems = wishlistRepository.findByUserId(userId);
        boolean itemExists = existingItems.stream()
                .anyMatch(item -> item.getProductId().equals(wishlistItem.getProductId()));

        if (itemExists) {
            return null;
        }

        ProductDTO product = productClient.getProductById(wishlistItem.getProductId());
        if (product == null) {
            throw new ResourceNotFoundException("Product not found");
        }
        wishlistItem.setProductId(product.getId());
        wishlistItem.setUserId(userId);
        return wishlistRepository.save(wishlistItem);
    }

    public void removeItem(Long userId, Long id) {
        WishlistItem wishlistItem = wishlistRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Wishlist item not found"));
        if (wishlistItem.getUserId().equals(userId)) {
            wishlistRepository.deleteById(id);
        }
    }

}