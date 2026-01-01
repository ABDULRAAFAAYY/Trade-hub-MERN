// ============================================
// TRADE HUB - Cart Page Component
// ============================================
// Displays cart items, quantities, and allows checkout.

import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

// API base URL for images
const API_URL = 'https://trade-hub-mern.vercel.app';

function Cart() {
    // ============================================
    // HOOKS
    // ============================================

    // Get cart data and functions from context
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    // ============================================
    // RENDER
    // ============================================
    return (
        <>
            <Header />

            {/* Cart Page Header */}
            <section id="about-header">
                <h2>#Let's_Shop</h2>
                <p>Review your cart and proceed to checkout!</p>
            </section>

            {/* Cart Table */}
            <section id="cart" className="section-p1">
                {cart.length === 0 ? (
                    // Empty cart message
                    <div className="empty-cart">
                        <h2>Your cart is empty</h2>
                        <p>Add some products to your cart to see them here.</p>
                        <Link to="/shop">
                            <button className="normal">Continue Shopping</button>
                        </Link>
                    </div>
                ) : (
                    // Cart table with items
                    <table id="cart-table" width="100%">
                        <thead>
                            <tr>
                                <td>Remove</td>
                                <td>Image</td>
                                <td>Product</td>
                                <td>Price</td>
                                <td>Quantity</td>
                                <td>Subtotal</td>
                            </tr>
                        </thead>
                        <tbody id="cart-body">
                            {cart.map((item, index) => (
                                <tr key={item.slug}>
                                    {/* Remove Button */}
                                    <td>
                                        <button
                                            style={{ backgroundColor: '#088178', color: '#fff' }}
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.slug)}
                                        >
                                            &times;
                                        </button>
                                    </td>

                                    {/* Product Image */}
                                    <td>
                                        <img
                                            src={`${API_URL}/images/${item.image}`}
                                            alt={item.name}
                                            style={{ width: '70px', height: '70px' }}
                                        />
                                    </td>

                                    {/* Product Name */}
                                    <td>{item.name}</td>

                                    {/* Price */}
                                    <td>Rs.{item.price}</td>

                                    {/* Quantity Input */}
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            min="1"
                                            onChange={(e) => updateQuantity(item.slug, parseInt(e.target.value))}
                                            className="quantity-input"
                                        />
                                    </td>

                                    {/* Subtotal */}
                                    <td>Rs.{item.price * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>

            {/* Cart Summary */}
            {cart.length > 0 && (
                <section id="cart-add" className="section-p1">
                    {/* Coupon Section */}
                    <div id="coupon">
                        <h3>Apply Coupon</h3>
                        <div>
                            <input type="text" placeholder="Enter your Coupon" />
                            <button className="normal">Apply</button>
                        </div>
                    </div>

                    {/* Total Section */}
                    <div id="subtotal">
                        <h3>Cart Total</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Cart Subtotal</td>
                                    <td>Rs.{cartTotal}</td>
                                </tr>
                            </tbody>
                        </table>
                        <Link to="/checkout">
                            <button className="normal">Proceed to Checkout</button>
                        </Link>
                    </div>
                </section>
            )}

            <Footer />
        </>
    );
}

export default Cart;
