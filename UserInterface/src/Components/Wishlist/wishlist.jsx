import React, { useEffect } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, setWishlistItems } from '../slices/wishlistSlice';
import ProductCard from '../Product_Card/ProductCard';

const Wishlist = () => {
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const userId = useSelector((state) => state.auth.user?.id);
    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchWishlistItems = async () => {
            try {
                const response = await axios.get('http://localhost:8080/wishlist/' + userId, {
                    headers: { Authorization: `Bearer ${token}` }});
                dispatch(setWishlistItems(response.data.wishlistItems));
            } catch (error) {
                console.error('Failed to fetch wishlist items:', error);
            }
        };

        fetchWishlistItems();
    }, [dispatch, userId, token]);

    const handleRemove = async (item) => {
        if (!item || !item.id) {
            console.error('Invalid item or missing id:', item);
            return;
        }

        try {
            await axios.delete(`http://localhost:8080/wishlist/${userId}/${item.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            dispatch(removeFromWishlist({ wishlistItemId: item.id }));
        } catch (error) {
            console.error('Failed to remove item from wishlist:', error);
        }
    };

    const handleAddToCart = (productId) => {
        dispatch(removeFromWishlist({ wishlistItemId: productId }));
    };

    return (
        <div className='container'>
            <h1>Wishlist</h1>
            {wishlistItems.length === 0 ? (
                <p>Your wishlist is currently empty. Add some items to your wishlist to see them here.</p>
            ) : (
                <div className='d-flex flex-wrap'>
                    {wishlistItems.map((item) => {
                        if (!item.product) {
                            return (
                                <div key={item?.id || 'undefined'} className='alert alert-warning'>
                                    Product details are missing for item ID: {item?.id || 'undefined'}
                                </div>
                            );
                        }

                        return (
                            <ProductCard 
                                key={item.id} 
                                product={item.product} 
                                showRemoveButton={true} 
                                onRemove={() => handleRemove(item)} 
                                onAddToCart={handleAddToCart} 
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Wishlist;