import axios from 'axios';
import { addToCart } from '../slices/cartSlice';

export const addItemToCart = (product) => async (dispatch, getState) => {
    const { token } = getState().auth;
    try {
        const { user } = getState().auth; 
        const response = await axios.post('http://localhost:8080/cart/'+user.id, {
            userId: user.id,
            productId: product.id,
            quantity: product.quantity
        },
        {
            headers: { Authorization: `Bearer ${token}` }
        }
      );
        dispatch(addToCart(response.data));
    } catch (error) {
        console.error('Failed to add item to cart:', error);
    }
};
