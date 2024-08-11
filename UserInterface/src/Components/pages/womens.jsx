import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from '../ProductCard/ProductCard.jsx';
import { setProducts } from '../slices/productsSlice';
import { useDispatch } from 'react-redux';

const Womens = () => {
    const [womensProducts, setWomensProducts] = useState([]);
    const [error, setError] = useState("");
    const dispatch=useDispatch();

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8080/products/womens');
            const data = await response.json();
            setWomensProducts(data);
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
            <h1 className='text-center'>Womens Clothing</h1>
            <div className='d-flex flex-wrap'>
                {
                    womensProducts.map((product)=>(
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </div>
    )
}
export default Womens