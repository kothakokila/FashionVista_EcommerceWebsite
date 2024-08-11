// Home.jsx
import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { setProducts } from '../slices/productsSlice';
import { useDispatch } from 'react-redux';
import './home.css';
import bannerImage from '../assets/bannerImage.jpg';
import { Link } from 'react-router-dom';
import Chatbot from '../Chatbot/Chatbot';

const Home = () => {
    const [products, setProds] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState([0, 200]);

    const dispatch = useDispatch();

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8080/products');
            const data = await response.json();
            setProds(data);
            dispatch(setProducts(data));

            const uniqueCategories = [...new Set(data.map(product => product.category))];
            setCategories(uniqueCategories);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const filtered = products.filter(product =>
            (selectedCategory ? product.category === selectedCategory : true) &&
            (product.price >= priceRange[0] && product.price <= priceRange[1])
        );
        setFilteredProducts(filtered);
    }, [products, selectedCategory, priceRange]);

    const handlePriceChange = (e, type) => {
        const value = parseInt(e.target.value) || 0;
        setPriceRange(type === 'min' ? [value, priceRange[1]] : [priceRange[0], value]);
    };

    return (
        <div className='home'>
            <div className="banner">
                <img src={bannerImage} alt="Fashion Vista Banner" />
                <div className="banner-text">
                    <h1>Welcome to <span className='fst-italic animate-text'>Fashion Vista</span></h1>
                    <p>Discover your Style! Discover your Vista!</p>
                </div>
            </div>
            <div className="home-content">
                <aside className="filter-options">
                    <h2>Select Filters</h2>
                    <div className="filter-group">
                        <label htmlFor="category">Category:</label>
                        <select id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value="">All</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="priceRange">Price Range:</label>
                        <div className="price-range">
                            <input
                                type="number"
                                id="priceRangeMin"
                                placeholder="Min"
                                value={priceRange[0]}
                                onChange={(e) => handlePriceChange(e, 'min')}
                            />
                            -
                            <input
                                type="number"
                                id="priceRangeMax"
                                placeholder="Max"
                                value={priceRange[1]}
                                onChange={(e) => handlePriceChange(e, 'max')}
                            />
                        </div>
                    </div>
                </aside>
                <div className="products-list">
                    <div className="products-grid">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <p className='mt-5'>No products found within the selected criteria.</p>
                        )}
                    </div>
                </div>
            </div>
            <Chatbot />
            <footer className='footer'>
                <div className="footer-content">
                    <h2>Get to Know Us</h2>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>
            </footer>
        </div>
    );
};

export default Home;
