import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();
  
  const getProductDetails = async (productId) => {
    // This would fetch product details from API
    // For now, we'll use the cart items stored in context
    return cart.items.find(item => item.productId === productId);
  };
  
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };
  
  const calculateTotal = () => {
    // This is simplified - in production, you'd fetch product prices
    return cart.items.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
  };
  
  if (!user) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Please login to view your cart</h2>
          <Link href="/login" className="btn-primary inline-block">
            Login Now
          </Link>
        </div>
      </div>
    );
  }
  
  if (cart.items?.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Start shopping for sustainable products!</p>
          <Link href="/" className="btn-primary inline-block">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cart.items.map((item) => (
              <div key={item.productId} className="bg-white rounded-lg shadow-md p-4 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <Image
                      src={item.image || 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400'}
                      alt={item.name || 'Product'}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{item.name || 'Product'}</h3>
                    <p className="text-primary font-bold">${(item.price || 0).toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Link href="/checkout">
                <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition font-semibold">
                  Proceed to Checkout
                </button>
              </Link>
              
              <Link href="/" className="flex items-center justify-center mt-4 text-gray-600 hover:text-primary">
                <FaArrowLeft className="mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}