import React from 'react';
import './CartProductCard.css';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeFromCart } from '../slices/cartSlice';

const CartProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.user?.id);
    const { product: productDetails, quantity } = product;
    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

    if (!productDetails) {
        console.error("Product details are undefined");
        return null; 
    }

    const { image, name, description, price } = productDetails;

    const handleRemoveFromCart = async () => {
        try {
            if (userId) {
                await axios.delete(`http://localhost:8080/cart/${userId}/${product.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                dispatch(removeFromCart({ id: product.id }));
            }
    
        } catch (error) {
            console.error('Failed to remove item from cart:', error);
        }
    };

    return (
        <div className='cart-body'>
        <div className="cart-product-card">
            <div className='image-container'>
                <img className="cart-product-image" src={image} alt={name} />
            </div>
            <div className="cart-product-details">
                <h5 className="cart-product-title">{name}</h5>
                <p className="cart-product-description">{description}</p>
                <p className="cart-product-price">${price}</p>
                <p className="cart-product-quantity">Quantity: {quantity}</p>
                <i className="fas fa-trash cart-product-remove" onClick={handleRemoveFromCart}></i>
            </div>
        </div>
        </div>
    );
};

export default CartProductCard;
