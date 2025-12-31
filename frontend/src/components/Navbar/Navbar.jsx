import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isLoggedIn, setIsLoggedIn, userName }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setIsDropdownOpen(false);
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="container">
      <header className="navbar-custom d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom">
        
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" className="d-inline-flex text-decoration-none">
            <img src={logo} alt="Logo" height={80} />
          </Link>
        </div>

        {/* Nav links */}
        <ul className="navbar-nav-links nav mb-2 mb-md-0">
          <li><Link to="/" className="nav-link px-2 link-dark">Home</Link></li>
          
          <li
            className="nav-link px-2 link-dark position-relative dropdown-parent"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Shop
            {isDropdownOpen && (
              <ul className="dropdown-menu show position-absolute">
                <li><Link to="/shop/mens" className="dropdown-item">Mens</Link></li>
                <li><Link to="/shop/womens" className="dropdown-item">Womens</Link></li>
                <li><Link to="/shop/newArrivals" className="dropdown-item">New Arrivals</Link></li>
              </ul>
            )}
          </li>

          <li><Link to="/collections" className="nav-link px-2 link-dark">Collections</Link></li>

          {!isLoggedIn && (
            <>
              <li><Link to="/about" className="nav-link px-2 link-dark">About</Link></li>
              <li><Link to="/contact" className="nav-link px-2 link-dark">Contact Us</Link></li>
            </>
          )}

          {isLoggedIn && (
            <>
              <li><Link to="/cart" className="nav-link px-2 link-dark">Cart</Link></li>
              <li><Link to="/wishlist" className="nav-link px-2 link-dark">Wishlist</Link></li>
              <li><Link to="/orders" className="nav-link px-2 link-dark">Your Orders</Link></li>
              <li><Link to="/account" className="nav-link px-2 link-dark">Account</Link></li>
            </>
          )}
        </ul>

        {/* Auth buttons */}
        <div className="navbar-auth-btns">
          {isLoggedIn ? (
            <>
              <span className="me-3">{userName}</span>
              <button type="button" onClick={handleLogout} className="btn btn-outline-dark">Logout</button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => navigate('/login')} className="btn btn-outline-dark me-2">Login</button>
              <button type="button" onClick={() => navigate('/signup')} className="btn btn-dark">Sign-up</button>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default Navbar;
