// ============================================
// TRADE HUB - Main Application Component
// ============================================
// This is the root component of the React application.
// It sets up routing and provides the cart context to all components.

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Import page components
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

// Import global styles
import './App.css';

// ============================================
// APP COMPONENT
// ============================================

function App() {
  return (
    // CartProvider wraps the entire app to provide cart state everywhere
    <CartProvider>
      {/* Router enables navigation between pages without page reload */}
      <Router>
        {/* Routes defines all the URL paths and their corresponding components */}
        <Routes>
          {/* Home page - displays featured products and hero section */}
          <Route path="/" element={<Home />} />

          {/* Shop page - displays all products with filtering */}
          <Route path="/shop" element={<Shop />} />

          {/* Product detail page - dynamic route with slug parameter */}
          <Route path="/product/:slug" element={<ProductDetail />} />

          {/* About page - company information */}
          <Route path="/about" element={<About />} />

          {/* Contact page - contact form and details */}
          <Route path="/contact" element={<Contact />} />

          {/* Cart page - displays cart items and totals */}
          <Route path="/cart" element={<Cart />} />

          {/* Checkout page - order form */}
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
