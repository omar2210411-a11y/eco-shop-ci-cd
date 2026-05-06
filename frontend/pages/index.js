import { useEffect, useState } from 'react';
import Link from 'next/link';

import Navbar from '../components/Navbar';

export default function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetch('https://hospitable-balance-production-f76b.up.railway.app/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));

  }, []);

  const addToCart = (product) => {

    const cart =
      JSON.parse(localStorage.getItem('cart')) || [];

    const existing = cart.find(
      (item) => item._id === product._id
    );

    if (existing) {

      existing.quantity += 1;

    } else {

      cart.push({
        ...product,
        quantity: 1,
      });

    }

    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    );

    alert('Added To Cart');

  };

  return (

    <div className="bg-[#faf9f6] min-h-screen">

      <Navbar />

      {/* HERO */}

      <section className="bg-gradient-to-r from-[#2d6a4f] to-[#40916c] text-white py-28 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-6xl font-bold mb-6 max-w-3xl leading-tight">

             Sustainable Choices
                for a Better Planet
          </h1>

          <p className="text-xl text-green-100 max-w-2xl mb-10">

            Discover eco-friendly products designed
            to reduce waste and support ethical production.

          </p>

          <button className="bg-white text-[#2d6a4f] px-8 py-4 rounded-full font-semibold hover:scale-105 transition">

            Shop Now

          </button>

        </div>

      </section>

      {/* PRODUCTS */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-4xl font-bold mb-14 text-center">

          Our Best Sellers

        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map((product) => (

            <div
              key={product._id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-300"
            >

              {/* PRODUCT IMAGE */}

              <Link href={`/product/${product._id}`}>

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover cursor-pointer"
                />

              </Link>

              <div className="p-6">

                <p className="text-sm text-[#40916c] mb-2">

                  {product.category}

                </p>

                {/* PRODUCT NAME */}

                <Link href={`/product/${product._id}`}>

                  <h3 className="text-2xl font-bold mb-3 hover:text-[#2d6a4f] cursor-pointer transition">

                    {product.name}

                  </h3>

                </Link>

                <div className="flex items-center justify-between mb-5">

                  <span className="text-2xl font-bold text-[#2d6a4f]">

                    ${product.price}

                  </span>

                  <span className="bg-[#d8f3dc] text-[#2d6a4f] px-3 py-1 rounded-full text-sm font-semibold">

                    🌱 95

                  </span>

                </div>

                {/* ADD TO CART */}

                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-[#2d6a4f] text-white py-3 rounded-full hover:bg-[#40916c] transition"
                >

                  Add To Cart

                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>

  );
}