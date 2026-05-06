import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };
  
  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    const success = await addToCart(product._id);
    if (success) {
      toast.success('Added to cart!');
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <Link href={`/product/${product._id}`}>
        <div className="relative h-64 cursor-pointer">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(product.sustainabilityScore)}`}>
              🌱 {product.sustainabilityScore}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-5">
        <Link href={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-primary transition cursor-pointer">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            {product.category}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Stock: {product.stock} units
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-all duration-300 text-sm font-semibold"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;