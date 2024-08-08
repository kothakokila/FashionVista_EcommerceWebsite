import React from 'react';
import { useEffect} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartProductCard from './CartProductCard.jsx';
import { setCartItems, clearCart, selectTotalWithTax } from '../slices/cartSlice.jsx';
import './cart.css';

const Cart = () => {
    const userId = useSelector(state => state.auth.user?.id);
    const firstName=useSelector(state => state.auth.user?.firstName);
    const lastName=useSelector(state => state.auth.user?.lastName);
    const cartItems = useSelector(state => state.cart.items);
    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
    const { subtotal, tax, total } = useSelector(selectTotalWithTax);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchCartItems = async () => {
            if (userId) {
                try {
                    const response = await axios.get('http://localhost:8080/cart/' + userId, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    dispatch(setCartItems(response.data.cartItems));
                } catch (error) {
                    console.error('Failed to fetch cart items:', error);
                }
        }
    };

        if (userId) {
            fetchCartItems();
        }
    }, [dispatch, userId, token]);

    const handleClearCart = async () => {
        try {
             await axios.delete(`http://localhost:8080/cart/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

                dispatch(clearCart());
        } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    };

    const handleCheckout=()=>{
        navigate('/payment', { state: { totalCost: total, cartItems, firstName, lastName } });
    }


    return (
        <div className="cart-container">
                <ul className="cart-list">
                    {cartItems.map(item => (
                        <li key={item.id}>
                            <CartProductCard product={item} />
                        </li>
                    ))}
                </ul>
                {
                    cartItems.length > 0 ? (
                        <div className="cart-summary">
                            <p>Subtotal: ${subtotal.toFixed(2)}</p>
                            <p>Tax: ${tax.toFixed(2)}</p>
                            <p className='total'>Total Amount: ${total.toFixed(2)}</p>
                            <button className="btn-clear-cart" onClick={handleClearCart}>Clear Cart</button>
                            <button className="btn-checkout" onClick={handleCheckout}>Checkout</button>
                        </div>
                    ): (
                        <div className='no-items'>
                            <img className="image" src="https://family1st.io/assets/img/empty_cart.png" alt="no-items-in-cart"/>
                            <h1>Oops!....No Items in the cart</h1>
                            <p>Please continue shopping</p>
                        </div>
                    )
                }
        </div>
    );
};

export default Cart;
