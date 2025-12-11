// ============================================
// TRADE HUB - Shop Page Component
// ============================================
// Displays all products with category filtering options.

import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

// API base URL
const API_URL = 'http://localhost:5000';

function Shop() {
    // ============================================
    // STATE
    // ============================================

    // All products from API
    const [products, setProducts] = useState([]);

    // Loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Selected category filter
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Available categories
    const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Sports', 'Gifts', 'Lighting'];

    // ============================================
    // FETCH PRODUCTS
    // ============================================

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Build URL with optional category filter
                let url = `${API_URL}/api/products`;
                if (selectedCategory !== 'All') {
                    url += `?category=${selectedCategory}`;
                }

                const response = await axios.get(url);
                setProducts(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load products');
                setLoading(false);
                console.error('Error fetching products:', err);
            }
        };

        fetchProducts();
    }, [selectedCategory]); // Re-fetch when category changes

    // ============================================
    // RENDER
    // ============================================
    return (
        <>
            <Header />

            {/* Page Header Banner */}
            <section id="page-header">
                <h2>#Stayhome</h2>
                <p>Save time and money</p>
            </section>

            {/* Category Filter Buttons */}
            <section className="section-p1">
                <div className="category-filter">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </section>

            {/* Products Grid */}
            <section id="product1" className="section-p1">
                <div className="pro-container">
                    {/* Loading state */}
                    {loading && <p>Loading products...</p>}

                    {/* Error state */}
                    {error && <p className="error">{error}</p>}

                    {/* Products grid */}
                    {!loading && !error && products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}

                    {/* Empty state */}
                    {!loading && !error && products.length === 0 && (
                        <p>No products found in this category.</p>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Shop;
