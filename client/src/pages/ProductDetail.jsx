// ============================================
// TRADE HUB - Product Detail Page Component
// ============================================
// Displays detailed information about a single product.
// Fetches product data based on URL slug parameter.

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

// API base URL
const API_URL = 'https://trade-hub-mern.vercel.app';

function ProductDetail() {
    // ============================================
    // HOOKS
    // ============================================

    // Get product slug from URL parameters
    // This comes from the route: /product/:slug
    const { slug } = useParams();

    // Get addToCart function from cart context
    const { addToCart } = useCart();

    // ============================================
    // STATE
    // ============================================

    // Current product data
    const [product, setProduct] = useState(null);

    // Currently displayed main image
    const [mainImage, setMainImage] = useState('');

    // Quantity to add to cart
    const [quantity, setQuantity] = useState(1);

    // Related/featured products
    const [relatedProducts, setRelatedProducts] = useState([]);

    // Loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ============================================
    // FETCH PRODUCT DATA
    // ============================================

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);

                // Fetch single product by slug
                const response = await axios.get(`${API_URL}/api/products/${slug}`);
                const productData = response.data.data;

                setProduct(productData);
                setMainImage(productData.mainImage);

                // Fetch related products (featured)
                const relatedResponse = await axios.get(`${API_URL}/api/products/featured`);
                // Filter out current product and limit to 4
                const related = relatedResponse.data.data
                    .filter(p => p.slug !== slug)
                    .slice(0, 4);
                setRelatedProducts(related);

                setLoading(false);
            } catch (err) {
                setError('Product not found');
                setLoading(false);
                console.error('Error fetching product:', err);
            }
        };

        fetchProduct();
    }, [slug]); // Re-fetch when slug changes

    // ============================================
    // EVENT HANDLERS
    // ============================================

    // Handle add to cart button click
    const handleAddToCart = () => {
        // Add product multiple times based on quantity
        for (let i = 0; i < quantity; i++) {
            addToCart({
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.mainImage
            });
        }
        alert(`${product.name} added to cart!`);
    };

    // Handle thumbnail image click
    const handleImageClick = (image) => {
        setMainImage(image);
    };

    // ============================================
    // LOADING AND ERROR STATES
    // ============================================

    if (loading) {
        return (
            <>
                <Header />
                <div className="section-p1">
                    <p>Loading product...</p>
                </div>
                <Footer />
            </>
        );
    }

    if (error || !product) {
        return (
            <>
                <Header />
                <div className="section-p1">
                    <h2>Product Not Found</h2>
                    <p>{error}</p>
                </div>
                <Footer />
            </>
        );
    }

    // ============================================
    // RENDER
    // ============================================
    return (
        <>
            <Header />

            {/* Product Details Section */}
            <section id="prodetails" className="section-p1">
                {/* Product Images */}
                <div className="single-pro-image">
                    {/* Main Image */}
                    <img
                        src={`${API_URL}/images/${mainImage}`}
                        width="100%"
                        id="mainimg"
                        alt={product.name}
                    />

                    {/* Thumbnail Images */}
                    <div className="small-img-group">
                        {product.additionalImages && product.additionalImages.map((img, index) => (
                            <div
                                key={index}
                                className="small-img-col"
                                onClick={() => handleImageClick(img)}
                            >
                                <img
                                    src={`${API_URL}/images/${img}`}
                                    width="100%"
                                    height="100%"
                                    className="small-img"
                                    alt={`${product.name} view ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="single-pro-details">
                    <h4>{product.name}</h4>
                    <h2>Rs.{product.price}</h2>

                    {/* Quantity Input */}
                    <input
                        type="number"
                        value={quantity}
                        min="1"
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    />

                    {/* Add to Cart Button */}
                    <button
                        className="normal add-to-cart-btn"
                        onClick={handleAddToCart}
                    >
                        Add To Cart
                    </button>

                    {/* Product Description */}
                    <h4>Product Details</h4>
                    <span>{product.description}</span>
                </div>
            </section>

            {/* Related Products Section */}
            <section id="product1" className="section-p1">
                <h2>Featured Products</h2>
                <p>Best Selling Products</p>

                <div className="pro-container">
                    {relatedProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </section>

            <Footer />
        </>
    );
}

export default ProductDetail;
