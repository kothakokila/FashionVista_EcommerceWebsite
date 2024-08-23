import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './OrderHistory.css';

const OrderHistoryPage = () => {
    const userId = useSelector(state => state.auth.user?.id);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/orders/${userId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                console.log('Fetched orders:', response.data); 
                setOrders(response.data);
            } catch (err) {
                setError('Failed to fetch orders. Please try again.');
                console.error('Error fetching orders:', err);
            }
        };

        if (userId) {
            fetchOrders();
        }
    }, [userId]);

    return (
        <div className='order-history-body'>
            <div className="order-history-container">
                <h2>Order History</h2>
                {error && <p className="error">{error}</p>}
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    orders.map(order => (
                        <div key={order.orderId} className="order">
                            <h3>Order ID: {order.orderId}</h3>
                            <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                            <p>Total Cost: ${order.totalAmount.toFixed(2)}</p>
                            <h4>Items:</h4>
                            <div className="order-product-cards">
                                {order.items && order.items.length > 0 ? (
                                    order.items.map(item => (
                                        <div key={item.product.id} className="order-product-card">
                                            {item.product.images && item.product.images.length > 0 ? (
                                                <img src={item.product.images[0]} alt={item.product.name} />
                                            ) : item.product.image ? (
                                                <img src={item.product.image} alt={item.product.name} />
                                            ) : (
                                                <p>No image available</p>
                                            )}
                                            <div className="order-product-details">
                                                <h4>{item.product.name}</h4>
                                                <p>{item.product.description}</p>
                                                <p>Quantity: {item.quantity}</p>
                                                <p>Price: ${item.product.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No items found.</p>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrderHistoryPage;
