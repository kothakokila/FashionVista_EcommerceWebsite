import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from 'reselect';

const initialState = {
    items: [],
    totalAmount: 0
};

const TAX_RATE = 0.07;

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            state.items = action.payload;
            state.totalAmount = action.payload.reduce((total, item) => {
            return total + (item.product ? item.product.price * item.quantity : 0);
            }, 0);
        },
        addToCart: (state, action) => {
            const newItem = action.payload;
            if (!newItem || !newItem.product || !newItem.product.id) {
                return;
            }
            const existingItem = state.items.find(item => item.product.id === newItem.product.id);
            if (existingItem) {
                existingItem.quantity += newItem.quantity;
            } else {
                state.items.push(newItem);
            }
            state.totalAmount += newItem.product.price * newItem.quantity;
        },
        removeFromCart: (state, action) => {
            const idToRemove = action.payload.id;
            const removedItem = state.items.find(item => item.id === idToRemove);
            if (removedItem) {
                state.totalAmount -= removedItem.product.price * removedItem.quantity;
                state.items = state.items.filter(item => item.id !== idToRemove);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
        },
    },
});

export const { setCartItems, addToCart, removeFromCart, clearCart } = cartSlice.actions;

const selectCartState = (state) => state.cart;

export const selectTotalWithTax = createSelector(
    [selectCartState],
    (cart) => {
        const subtotal = cart.totalAmount;
        const tax = subtotal * TAX_RATE;
        return {
            subtotal,
            tax,
            total: subtotal + tax
        };
    }
);

export default cartSlice.reducer;
