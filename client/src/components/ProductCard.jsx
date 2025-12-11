// ============================================
// TRADE HUB - Product Card Component
// ============================================
// This reusable component displays a single product in the shop grid.
// Shows product image, name, rating stars, and price.

import { useNavigate } from 'react-router-dom';

// API base URL for images
const API_URL = 'http://localhost:5000';

function ProductCard({ product }) {
    // ============================================
    // HOOKS
    // ============================================

    // useNavigate allows programmatic navigation
    const navigate = useNavigate();

    // ============================================
    // EVENT HANDLERS
    // ============================================

    // Navigate to product detail page when card is clicked
    const handleClick = () => {
        navigate(`/product/${product.slug}`);
    };

    // ============================================
    // RENDER STARS
    // ============================================

    // Generate star icons based on rating
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < product.rating; i++) {
            stars.push(<i key={i} className="fas fa-star"></i>);
        }
        return stars;
    };

    // ============================================
    // RENDER
    // ============================================
    return (
        <div className="pro" onClick={handleClick}>
            {/* Product Image */}
            <img
                src={`${API_URL}/images/${product.mainImage}`}
                alt={product.name}
                onError={(e) => {
                    // Fallback image if main image fails to load
                    e.target.src = '/images/placeholder.png';
                }}
            />

            {/* Product Details */}
            <div className="des">
                {/* Product Name (shortened) */}
                <h5>{product.shortName}</h5>

                {/* Star Rating */}
                <div className="star">
                    {renderStars()}
                </div>

                {/* Price */}
                <h4>Rs.{product.price}</h4>
            </div>
        </div>
    );
}

export default ProductCard;
