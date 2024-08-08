import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from '../Product_Card/ProductCard';
import { setProducts } from '../slices/productsSlice';
import { useDispatch } from 'react-redux';

const Beauty = () => {
    const [beautyProducts, setBeautyProducts] = useState([]);
    const [error, setError] = useState("");
    const dispatch=useDispatch();

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8080/products/beauty');
            const data = await response.json();
            setBeautyProducts(data);
            dispatch(setProducts(data));
        } catch (error) {
            setError(error);
        } 
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (error) return <div>Error: {error.message}</div>;

    return(
        <div className='container'>
            <h1 className='text-center'>Beauty Products</h1>
            <div className='d-flex flex-wrap'>
                {
                    beautyProducts.map((product)=>(
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </div>
    )
}
export default Beauty