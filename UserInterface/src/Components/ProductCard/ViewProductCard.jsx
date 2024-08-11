import React, { useState } from 'react';
import './ViewProductCard.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../slices/wishlistSlice';
import { addItemToCart } from '../Cart/cartActions';

const ViewProductCard = () => {
    const { id } = useParams();
    const product = useSelector((state) =>
        state.products.items.find((item) => item.id === id)
    );

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const userId = useSelector(state => state.auth.user.id);
    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

    const handleAddtoWishlist = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/wishlist/${userId}`, { productId: product.id }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                dispatch(addToWishlist(response.data));
                alert('Item added to wishlist!');
            } else if (response.status === 409) {
                alert('Item is already in the wishlist!');
            } 
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    alert('Item is already in the wishlist!');
                } else {
                    alert('Failed to add item to wishlist. Please try again.');
                }
            } 
        }
    };

    const handleAddToCart = () => {
        dispatch(addItemToCart({ userId, ...product, quantity: quantity }));
        setQuantity(1); 
        alert('Item added to cart!');
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        
        <div className="view-product-card">
            <div className="view-product-image-container">
                <img className="view-product-image" src={product.image} alt={product.name} />
            </div>
        <div className="view-product-details">
            <h2 className="view-product-title">{product.name}</h2>
            <p className="view-product-description">{product.description}</p>
            <div className="view-product-price-and-quantity">
                <p className="view-product-price">${product.price}</p>
                <div className="view-product-quantity">
                    <label htmlFor={`quantity_${product.id}`}>Quantity:</label>
                    <input
                        type="number"
                        id={`quantity_${product.id}`}
                        value={quantity}
                        onChange={(e) => {
                            let value = parseInt(e.target.value, 10);
                            if (isNaN(value) || value < 1) {
                                value = 1;
                            }
                            setQuantity(value);
                        }}
                    />
                </div>
            </div>
            <div className="view-product-actions">
                <i className="fas fa-heart view-icon-wishlist" onClick={handleAddtoWishlist}></i>
                <i className="fas fa-cart-plus view-icon-cart" onClick={handleAddToCart}></i>
            </div>
        </div>
    </div>
    );
};

export default ViewProductCard;

