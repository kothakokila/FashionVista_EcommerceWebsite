import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';
import './SearchResults.css';

const SearchResults = () => {
    const { query } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    const fetchProducts = useCallback(async () => {
        console.log('Fetching products...');
        try {
            const response = await axios.get(`http://localhost:8080/products/search?query=${encodeURIComponent(query)}`);
            console.log('Products fetched:', response.data);
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            console.log('Error fetching products:', err.message);
            setError(err.message);
            setLoading(false);
        }
    }, [query]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="search-results">
            <h1>Search Results for "{query}"</h1>
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
