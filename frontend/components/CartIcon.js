import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const CartIcon = () => {
  const { cart } = useCart();
  const itemCount = cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  
  return (
    <Link href="/cart" className="relative">
      <FaShoppingCart className="text-2xl text-gray-600 hover:text-primary transition" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;