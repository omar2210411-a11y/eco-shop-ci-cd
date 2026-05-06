import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function CompanyAddProduct() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400',
    category: 'Home',
    stock: '',
    sustainabilityScore: '',
    environmentalImpact: {
      materials: '',
      packaging: '',
      carbonFootprint: ''
    }
  });

  if (!user || user.role !== 'company') {
    router.push('/');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        sustainabilityScore: parseInt(formData.sustainabilityScore),
        companyId: user.id
      };
      
      await axios.post(`${API_URL}/products`, productData);
      toast.success('Product added successfully!');
      router.push('/company/dashboard');
    } catch (error) {
      toast.error('Error adding product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Add New Product</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Price ($) *</label>
              <input
                type="number"
                name="price"
                required
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Category *</label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home">Home</option>
                <option value="Beauty">Beauty</option>
                <option value="Food">Food</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Stock Quantity *</label>
              <input
                type="number"
                name="stock"
                required
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Sustainability Score (0-100) *</label>
              <input
                type="number"
                name="sustainabilityScore"
                required
                min="0"
                max="100"
                value={formData.sustainabilityScore}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-gray-700 mb-2">Description *</label>
            <textarea
              name="description"
              required
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
            ></textarea>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Environmental Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Materials *</label>
                <input
                  type="text"
                  name="environmentalImpact.materials"
                  required
                  value={formData.environmentalImpact.materials}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                  placeholder="e.g., Recycled plastic, organic cotton"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Packaging *</label>
                <input
                  type="text"
                  name="environmentalImpact.packaging"
                  required
                  value={formData.environmentalImpact.packaging}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                  placeholder="e.g., Compostable, Recycled box"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Carbon Footprint *</label>
                <input
                  type="text"
                  name="environmentalImpact.carbonFootprint"
                  required
                  value={formData.environmentalImpact.carbonFootprint}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                  placeholder="e.g., 0.5 kg CO2"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition font-semibold disabled:opacity-50"
            >
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}