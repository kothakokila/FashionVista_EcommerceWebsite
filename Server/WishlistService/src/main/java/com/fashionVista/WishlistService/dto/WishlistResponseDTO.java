package com.fashionVista.WishlistService.dto;

import java.util.List;
import lombok.*;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WishlistResponseDTO {
    private Long userId;
    private List<WishlistItemDTO> wishlistItems;
}
