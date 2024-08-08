import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from '../Product_Card/ProductCard';
import { setProducts } from '../slices/productsSlice';
import { useDispatch } from 'react-redux';

const Mens = () => {
    const [mensProducts, setMensProducts] = useState([]);
    const [error, setError] = useState(null);
    const dispatch=useDispatch();

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8080/products/mens');
            const data = await response.json();
            setMensProducts(data);
            dispatch(setProducts(data));
        } catch (error) {
            setError(error);
        } 
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="container">
            <h1 className='text-center'>Mens Clothing</h1>
            <div className="products-list d-flex flex-wrap">
                {mensProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Mens;