import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './wishlistSlice';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        wishlist: wishlistReducer,
        cart:cartReducer,
        products:productsReducer,
        auth: authReducer
    }
});

export default store;
