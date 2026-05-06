
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaLeaf, FaBox, FaRecycle, FaTruck } from 'react-icons/fa';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);
  
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Product not found');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      router.push('/login');
      return;
    }
    
    const success = await addToCart(product._id, quantity);
    if (success) {
      toast.success(`Added ${quantity} item(s) to cart!`);
    }
  };
  
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };
  
  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto max-h-96 object-contain"
            />
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-3">{product.category}</p>
            
            <div className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
              ${product.price.toFixed(2)}
            </div>
            
            <div className={`inline-flex items-center px-3 py-1 rounded-full ${getScoreColor(product.sustainabilityScore)} mb-6`}>
              <FaLeaf className="mr-2" />
              <span className="font-semibold text-sm">Sustainability Score: {product.sustainabilityScore}/100</span>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
            
            {/* Environmental Impact */}
            <div className="bg-gray-50 rounded-lg p-5 mb-6">
              <h3 className="font-semibold text-lg mb-3">Environmental Impact</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <FaRecycle className="text-green-700 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-sm">Materials:</span>
                    <p className="text-gray-600 text-sm">{product.environmentalImpact?.materials || 'Eco-friendly materials'}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaBox className="text-green-700 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-sm">Packaging:</span>
                    <p className="text-gray-600 text-sm">{product.environmentalImpact?.packaging || 'Sustainable packaging'}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaTruck className="text-green-700 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-sm">Carbon Footprint:</span>
                    <p className="text-gray-600 text-sm">{product.environmentalImpact?.carbonFootprint || 'Low carbon footprint'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quantity and Cart */}
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2">
                Stock: {product.stock} units available
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 border-r hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 min-w-[50px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 border-l hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition font-semibold"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
