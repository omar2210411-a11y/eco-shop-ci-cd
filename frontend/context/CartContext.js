import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchCart(userId);
    } else {
      setLoading(false);
    }
  }, []);
  
  const fetchCart = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/cart/${userId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const addToCart = async (productId, quantity = 1) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please login to add items to cart');
      return false;
    }
    
    try {
      const response = await axios.post(`${API_URL}/cart/add`, { userId, productId, quantity });
      setCart(response.data);
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  };
  
  const removeFromCart = async (productId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
    
    try {
      const response = await axios.post(`${API_URL}/cart/remove`, { userId, productId });
      setCart(response.data);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };
  
  const updateQuantity = async (productId, quantity) => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
    
    try {
      const response = await axios.post(`${API_URL}/cart/update`, { userId, productId, quantity });
      setCart(response.data);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };
  
  const clearCart = () => {
    setCart({ items: [] });
  };
  
  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};