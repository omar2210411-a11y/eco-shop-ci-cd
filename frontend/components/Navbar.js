import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaLeaf, FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const router = useRouter();
  
  const cartItemCount = cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <FaLeaf className="text-3xl text-primary" />
            <span className="font-bold text-xl text-gray-800">EcoShop</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-primary transition">Shop</Link>
            
            {user?.role === 'admin' && (
              <Link href="/admin/dashboard" className="text-gray-600 hover:text-primary transition">Admin</Link>
            )}
            
            {user?.role === 'company' && (
              <Link href="/company/dashboard" className="text-gray-600 hover:text-primary transition">Dashboard</Link>
            )}
            
            <Link href="/cart" className="relative">
              <FaShoppingCart className="text-2xl text-gray-600 hover:text-primary transition" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Hi, {user.name}</span>
                <button onClick={logout} className="text-gray-600 hover:text-red-600 transition">
                  <FaSignOutAlt className="text-xl" />
                </button>
              </div>
            ) : (
              <Link href="/login" className="flex items-center space-x-2 text-gray-600 hover:text-primary transition">
                <FaUser />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;