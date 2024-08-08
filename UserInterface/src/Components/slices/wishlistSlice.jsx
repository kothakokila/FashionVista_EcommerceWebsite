import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: []
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setWishlistItems: (state, action) => {
            state.items = Array.isArray(action.payload) ? action.payload : [];
        },
        addToWishlist: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.productId === newItem.productId);
            if (!existingItem) {
                state.items.push(newItem);
            }
        },
        removeFromWishlist: (state, action) => {
            const wishlistItemIdToRemove = action.payload.wishlistItemId;
            state.items = state.items.filter(item => item.id !== wishlistItemIdToRemove);
        }
    }
});

export const { setWishlistItems, addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
