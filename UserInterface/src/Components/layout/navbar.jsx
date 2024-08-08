import React from 'react';
import { Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import './navbar.css';
import logo from '../assets/fashionvista_logo.jpg'

const Navbar=() => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/user/login');
    };

    return(
           <nav className="navbar m-1">
                <div className="navbar-logo">
                    <Link to="/home">
                        <img src={logo} alt="Fashion Vista Logo" className="logo-image" />
                    </Link>
                </div>
                <div className="navbar-links">
                    <Link to="/mens">Mens</Link>
                    <Link to="/womens">Womens</Link>
                    <Link to="/kids">Kids</Link>
                    <Link to="/accessories">Accessories</Link>
                    <Link to="/home-living">Home & Living</Link>
                    <Link to="/beauty">Beauty</Link>
                </div>
                <div className="navbar-search">
                    <form>
                        <input
                            type="text"
                            placeholder="Search products..."
                        />
                        <button type="submit" className="search-icon">
                            <i className="fas fa-search"></i>
                        </button>
                    </form>
                </div>
                <div className="navbar-icons">
                    <Link to="/wishlist" data-testid="wishlist-link"><i className="fas fa-heart"></i></Link>
                    <Link to="/cart" data-testid="cart-link"><i className="fas fa-shopping-cart"></i></Link>
                    <Link to="/orderHistory" data-testid="cart-link"><i className="fas fa-box"></i></Link>
                    <a href="/user/login" onClick={handleLogout}> 
                        <i className="fas fa-user"></i>
                    </a>
                </div>

            </nav>
    )
}

export default Navbar;