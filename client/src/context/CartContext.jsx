// ============================================
// TRADE HUB - Cart Context
// ============================================
// This file creates a React Context for managing cart state globally.
// Context allows us to share cart data across all components without prop drilling.

import { createContext, useContext, useState, useEffect } from 'react';

// ============================================
// CREATE CONTEXT
// ============================================
// Create a context object that will hold our cart state and functions
const CartContext = createContext();

// ============================================
// CART PROVIDER COMPONENT
// ============================================
// This component wraps our app and provides cart functionality to all children

export function CartProvider({ children }) {
    // ============================================
    // STATE INITIALIZATION
    // ============================================
    // Initialize cart from localStorage if available, otherwise empty array
    // This allows cart to persist across page refreshes
    const [cart, setCart] = useState(() => {
        // Try to get cart from localStorage
        const savedCart = localStorage.getItem('cart');
        // Parse JSON if exists, otherwise return empty array
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // ============================================
    // SYNC WITH LOCALSTORAGE
    // ============================================
    // useEffect runs whenever cart changes, saving to localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // ============================================
    // CART FUNCTIONS
    // ============================================

    // Add a product to cart
    // If product already exists, increment quantity
    const addToCart = (product) => {
        setCart(currentCart => {
            // Check if product already in cart
            const existingItem = currentCart.find(item => item.slug === product.slug);

            if (existingItem) {
                // Increment quantity of existing item
                return currentCart.map(item =>
                    item.slug === product.slug
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Add new item with quantity 1
                return [...currentCart, { ...product, quantity: 1 }];
            }
        });
    };

    // Remove a product from cart by slug
    const removeFromCart = (slug) => {
        setCart(currentCart => currentCart.filter(item => item.slug !== slug));
    };

    // Update quantity of a specific item
    const updateQuantity = (slug, quantity) => {
        // If quantity is 0 or less, remove the item
        if (quantity <= 0) {
            removeFromCart(slug);
            return;
        }

        setCart(currentCart =>
            currentCart.map(item =>
                item.slug === slug ? { ...item, quantity } : item
            )
        );
    };

    // Clear all items from cart
    const clearCart = () => {
        setCart([]);
    };

    // ============================================
    // COMPUTED VALUES
    // ============================================

    // Calculate total number of items in cart
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    // Calculate total price of all items
    const cartTotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    // ============================================
    // CONTEXT VALUE
    // ============================================
    // Object containing all cart state and functions to share
    const value = {
        cart,          // Array of cart items
        addToCart,     // Function to add item
        removeFromCart,// Function to remove item
        updateQuantity,// Function to update quantity
        clearCart,     // Function to clear cart
        cartCount,     // Total number of items
        cartTotal      // Total price
    };

    // Provide the value to all child components
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

// ============================================
// CUSTOM HOOK
// ============================================
// Custom hook for easy access to cart context
// Usage: const { cart, addToCart } = useCart();

export function useCart() {
    const context = useContext(CartContext);

    // Throw error if used outside of CartProvider
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
}
