import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Navbar from '../../components/Navbar';

export default function ProductDetail() {

  const router = useRouter();

  const { id } = router.query;

  const [product, setProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {

    if (id) {

      fetch(`https://hospitable-balance-production-f76b.up.railway.app/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));

    }

  }, [id]);

  const addToCart = () => {

    const cart =
      JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {

      existingProduct.quantity += quantity;

    } else {

      cart.push({
        ...product,
        quantity,
      });

    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Product Added To Cart');
  };

  if (!product) {

    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );

  }

  return (

    <div className="bg-[#faf9f6] min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">

        {/* PRODUCT IMAGE */}

        <div>

          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-3xl shadow-xl"
          />

        </div>

        {/* PRODUCT INFO */}

        <div>

          <span className="text-[#40916c] font-medium text-lg">
            {product.category}
          </span>

          <h1 className="text-5xl font-bold mt-3 mb-6 text-[#1a1a1a]">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-6">

            <span className="text-4xl font-bold text-[#2d6a4f]">
              ${product.price}
            </span>

            <span className="bg-[#52b788] text-white px-4 py-2 rounded-full text-sm font-semibold">
              {product.sustainabilityScore || 90}% Sustainable
            </span>

          </div>

          <p className="text-gray-600 leading-relaxed mb-8 text-lg">
            {product.description}
          </p>

          {/* ENVIRONMENTAL IMPACT */}

          <div className="bg-white rounded-3xl p-6 shadow-sm mb-8">

            <h3 className="text-2xl font-bold mb-4">
              Environmental Impact
            </h3>

            <div className="space-y-3 text-gray-700">

              <p>
                🌱 Materials: Sustainable Bamboo & Recycled Materials
              </p>

              <p>
                📦 Packaging: Plastic-Free Packaging
              </p>

              <p>
                ♻️ Carbon Footprint: Low Emissions Production
              </p>

            </div>

          </div>

          {/* QUANTITY */}

          <div className="flex items-center gap-4 mb-8">

            <button
              onClick={() =>
                setQuantity(Math.max(1, quantity - 1))
              }
              className="w-12 h-12 rounded-full bg-gray-200 text-xl hover:bg-gray-300 transition"
            >
              -
            </button>

            <span className="text-2xl font-semibold">
              {quantity}
            </span>

            <button
              onClick={() =>
                setQuantity(quantity + 1)
              }
              className="w-12 h-12 rounded-full bg-gray-200 text-xl hover:bg-gray-300 transition"
            >
              +
            </button>

          </div>

          {/* ADD TO CART */}

          <button
            onClick={addToCart}
            className="w-full bg-[#2d6a4f] text-white py-5 rounded-full text-lg font-semibold hover:bg-[#40916c] transition"
          >
            Add to Cart
          </button>

          {/* STOCK */}

          <p className="mt-6 text-gray-500">
            In Stock: {product.stock || 15} items available
          </p>

        </div>

      </div>

    </div>

  );
}
