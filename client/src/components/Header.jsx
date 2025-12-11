// ============================================
// TRADE HUB - Header Component
// ============================================
// This component displays the navigation bar at the top of every page.
// It includes the logo, navigation links, and cart icon with item count.

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
    // ============================================
    // HOOKS
    // ============================================

    // useLocation gives us the current URL path
    // Used to highlight the active navigation link
    const location = useLocation();

    // Get cart count from context
    const { cartCount } = useCart();

    // State for mobile menu toggle
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // ============================================
    // HELPER FUNCTIONS
    // ============================================

    // Check if a link is currently active
    const isActive = (path) => location.pathname === path;

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Close mobile menu when a link is clicked
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // ============================================
    // RENDER
    // ============================================
    return (
        <>
            {/* Dark overlay when mobile menu is open */}
            {isMobileMenuOpen && (
                <div
                    className="mobile-overlay"
                    onClick={closeMobileMenu}
                />
            )}

            <section id="header">
                {/* Logo - links to home page */}
                <Link to="/">
                    <img
                        src="/images/headerlogo.png"
                        className="logo"
                        alt="Trade Hub Logo"
                    />
                </Link>

                {/* Main navigation */}
                <div>
                    <ul id="navbar" className={isMobileMenuOpen ? 'active' : ''}>
                        {/* Home link */}
                        <li>
                            <Link
                                className={isActive('/') ? 'active' : ''}
                                to="/"
                                onClick={closeMobileMenu}
                            >
                                Home
                            </Link>
                        </li>

                        {/* Shop link */}
                        <li>
                            <Link
                                className={isActive('/shop') ? 'active' : ''}
                                to="/shop"
                                onClick={closeMobileMenu}
                            >
                                Shop
                            </Link>
                        </li>

                        {/* About link */}
                        <li>
                            <Link
                                className={isActive('/about') ? 'active' : ''}
                                to="/about"
                                onClick={closeMobileMenu}
                            >
                                About
                            </Link>
                        </li>

                        {/* Contact link */}
                        <li>
                            <Link
                                className={isActive('/contact') ? 'active' : ''}
                                to="/contact"
                                onClick={closeMobileMenu}
                            >
                                Contact us
                            </Link>
                        </li>

                        {/* Cart link in mobile menu */}
                        <li className="mobile-cart-link">
                            <Link
                                to="/cart"
                                onClick={closeMobileMenu}
                            >
                                Cart {cartCount > 0 && `(${cartCount})`}
                            </Link>
                        </li>

                        {/* Cart icon for large screens */}
                        <li id="lg-bag">
                            <Link to="/cart">
                                <i className="fa-solid fa-bag-shopping"></i>
                                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                            </Link>
                        </li>

                        {/* Close button for mobile menu */}
                        <a href="#" id="close" onClick={(e) => { e.preventDefault(); closeMobileMenu(); }}>
                            <i className="fa-solid fa-xmark"></i>
                        </a>
                    </ul>
                </div>

                {/* Mobile menu icons */}
                <div id="mobile">
                    {/* Cart icon for mobile */}
                    <Link to="/cart">
                        <i className="fa-solid fa-bag-shopping"></i>
                        {cartCount > 0 && <span className="cart-count mobile">{cartCount}</span>}
                    </Link>

                    {/* Hamburger menu icon */}
                    <i
                        id="bar"
                        className="fas fa-bars"
                        onClick={toggleMobileMenu}
                    ></i>
                </div>
            </section>
        </>
    );
}

export default Header;
