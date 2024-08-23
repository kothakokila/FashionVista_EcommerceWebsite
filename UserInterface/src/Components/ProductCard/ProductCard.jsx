import React, { useState, useEffect } from 'react';
import './ProductCard.css';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from '../Cart/cartActions';
import { addToWishlist } from '../slices/wishlistSlice';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, showRemoveButton, onRemove, onAddToCart }) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.user.id);
    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

    const [quantity, setQuantity] = useState(1);
    const [inStock, setInStock] = useState(true);

    useEffect(() => {
        const checkStock = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/inventory/${product.id}`);

                if (response.status === 200) {
                    setInStock(response.data.stockQuantity > 0);
                }
            } catch (error) {
                console.error('Failed to check inventory:', error);
                setInStock(false);
            }
        };

        checkStock();
    }, [product.id, token]);

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
        if (inStock) {
            dispatch(addItemToCart({ userId, ...product, quantity: quantity }));
            setQuantity(1);
            alert('Item added to cart!');
            if (onAddToCart) {
                onAddToCart(product.id);
            }
        } else {
            alert('Item is out of stock and cannot be added to the cart.');
        }
    }

    return (
            <div className="product-card">
                <Link to={`/product/${product.id}`}>
                <img
                    className="product-image"
                    src={product.images[0]} 
                    alt={product.name}
                />
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">${product.price}</p>
                    {inStock ? null : <p className="out-of-stock">Out of Stock</p>}
                    <div className="quantity-input">
                        <label htmlFor={`quantity_${product.id}`}>Qn:</label>
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
                            disabled={!inStock}
                        />
                    </div>
                    <div className="btn-container">
                        {showRemoveButton ? (
                            <i className="fas fa-trash icon-only icon-wishlist" onClick={() => onRemove(product)}></i>
                        ) : (
                            <i className="fas fa-heart icon-only icon-wishlist" onClick={handleAddtoWishlist}></i>
                        )}
                        <i className="fas fa-cart-plus icon-only icon-cart" onClick={handleAddToCart}></i>
                    </div>
                </div>
            </div>
        );
    };
    

export default ProductCard;


