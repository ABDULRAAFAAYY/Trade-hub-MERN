// ============================================
// TRADE HUB - Checkout Page Component
// ============================================
// Order form for customer details and order placement.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

// API base URL
const API_URL = 'https://trade-hub-mern.vercel.app';

function Checkout() {
    // ============================================
    // HOOKS
    // ============================================

    const navigate = useNavigate();
    const { cart, cartTotal, clearCart } = useCart();

    // ============================================
    // STATE
    // ============================================

    // Customer form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        paymentMethod: 'cod',
        notes: ''
    });

    // Submission state
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    // ============================================
    // EVENT HANDLERS
    // ============================================

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        // Validate cart is not empty
        if (cart.length === 0) {
            setError('Your cart is empty');
            setSubmitting(false);
            return;
        }

        try {
            // Prepare order data
            const orderData = {
                customer: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city
                },
                items: cart.map(item => ({
                    productSlug: item.slug,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    image: item.image
                })),
                paymentMethod: formData.paymentMethod,
                notes: formData.notes
            };

            // Send order to API
            const response = await axios.post(`${API_URL}/api/orders`, orderData);

            // Clear cart
            clearCart();

            // Show success and redirect
            alert('Order placed successfully! Order ID: ' + response.data.data.orderId);
            navigate('/');

        } catch (err) {
            setError(err.response?.data?.message || 'Error placing order. Please try again.');
            console.error('Error placing order:', err);
        } finally {
            setSubmitting(false);
        }
    };

    // ============================================
    // REDIRECT IF CART IS EMPTY
    // ============================================

    if (cart.length === 0) {
        return (
            <>
                <Header />
                <div className="section-p1">
                    <h2>Your cart is empty</h2>
                    <p>Please add items to your cart before checking out.</p>
                    <button className="normal" onClick={() => navigate('/shop')}>
                        Go to Shop
                    </button>
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

            {/* Checkout Header */}
            <section id="about-header">
                <h2>#Checkout</h2>
                <p>Complete your order</p>
            </section>

            {/* Checkout Form */}
            <section id="form-details">
                <form onSubmit={handleSubmit}>
                    <span>BILLING DETAILS</span>
                    <h2>Enter your information</h2>

                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    {/* Phone */}
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    {/* Address */}
                    <input
                        type="text"
                        name="address"
                        placeholder="Delivery Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />

                    {/* City */}
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />

                    {/* Payment Method */}
                    <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                    >
                        <option value="cod">Cash on Delivery</option>
                        <option value="easypaisa">EasyPaisa</option>
                        <option value="jazzcash">JazzCash</option>
                    </select>

                    {/* Notes */}
                    <textarea
                        name="notes"
                        placeholder="Order Notes (optional)"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="4"
                    ></textarea>

                    {/* Error Message */}
                    {error && <p className="error">{error}</p>}

                    {/* Submit Button */}
                    <button
                        className="normal"
                        type="submit"
                        disabled={submitting}
                    >
                        {submitting ? 'Placing Order...' : `Place Order - Rs.${cartTotal}`}
                    </button>
                </form>

                {/* Order Summary */}
                <div className="people" style={{ padding: '20px' }}>
                    <h3>Order Summary</h3>
                    {cart.map(item => (
                        <div key={item.slug} style={{ marginBottom: '10px' }}>
                            <p>{item.name} x {item.quantity}</p>
                            <p><strong>Rs.{item.price * item.quantity}</strong></p>
                        </div>
                    ))}
                    <hr />
                    <p><strong>Total: Rs.{cartTotal}</strong></p>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Checkout;
