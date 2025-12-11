// ============================================
// TRADE HUB - Home Page Component
// ============================================
// The main landing page featuring hero section, features, and featured products.

import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import FeatureBox from '../components/FeatureBox';
import { Link } from 'react-router-dom';

// API base URL
const API_URL = 'http://localhost:5000';

function Home() {
    // ============================================
    // STATE
    // ============================================

    // State to store featured products from API
    const [featuredProducts, setFeaturedProducts] = useState([]);

    // Loading state for API call
    const [loading, setLoading] = useState(true);

    // Error state for API failures
    const [error, setError] = useState(null);

    // ============================================
    // FETCH FEATURED PRODUCTS
    // ============================================

    useEffect(() => {
        // Async function to fetch products from API
        const fetchFeaturedProducts = async () => {
            try {
                // Make GET request to featured products endpoint
                const response = await axios.get(`${API_URL}/api/products/featured`);

                // Update state with fetched products
                setFeaturedProducts(response.data.data);
                setLoading(false);
            } catch (err) {
                // Handle error
                setError('Failed to load products');
                setLoading(false);
                console.error('Error fetching products:', err);
            }
        };

        fetchFeaturedProducts();
    }, []); // Empty dependency array means this runs once on mount

    // ============================================
    // RENDER
    // ============================================
    return (
        <>
            {/* Header Navigation */}
            <Header />

            {/* Hero Section */}
            <section id="hero">
                <h4>Trade-in-offer</h4>
                <h2>SUPER VALUE DEALS</h2>
                <h1>On all products</h1>
                <Link to="/shop">
                    <button>Shop now</button>
                </Link>
            </section>

            {/* Features Section */}
            <section id="feature" className="section-p1">
                <FeatureBox
                    image="/images/freeship.png"
                    title="Free Shipping"
                />
                <FeatureBox
                    image="/images/images.jfif"
                    title="Online Order"
                />
                <FeatureBox
                    image="/images/24-hrs-7-days-always-open-service-availability-poster_1017-52820.avif"
                    title="24/7 Support"
                />
                <FeatureBox
                    image="/images/repair.png"
                    title="Repairing Services"
                />
            </section>

            {/* Featured Products Section */}
            <section id="product1" className="section-p1">
                <h2>Featured Products</h2>
                <p>Best Selling Products</p>

                <div className="pro-container">
                    {/* Show loading spinner while fetching */}
                    {loading && <p>Loading products...</p>}

                    {/* Show error message if fetch failed */}
                    {error && <p className="error">{error}</p>}

                    {/* Map through products and render ProductCard for each */}
                    {!loading && !error && featuredProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </section>

            {/* Repair Services Banner */}
            <section id="banner" className="section-m1">
                <h4>Repair Services</h4>
                <h2>Applied on all Accessories</h2>
                <button className="normal">
                    <Link
                        style={{ textDecoration: 'none', color: 'black' }}
                        to="/shop"
                    >
                        Explore More
                    </Link>
                </button>
            </section>

            {/* Footer */}
            <Footer />
        </>
    );
}

export default Home;
