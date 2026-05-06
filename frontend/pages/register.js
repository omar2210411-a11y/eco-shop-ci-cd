import Link from 'next/link';

import { Leaf } from 'lucide-react';

export default function RegisterPage() {

  return (

    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center px-6">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10">

        {/* LOGO */}

        <div className="flex justify-center mb-6">

          <div className="bg-[#d8f3dc] p-4 rounded-full">

            <Leaf className="text-[#2d6a4f]" size={40} />

          </div>

        </div>

        {/* TITLE */}

        <h1 className="text-4xl font-bold text-center text-[#2d6a4f] mb-3">

          Create Account

        </h1>

        <p className="text-center text-gray-500 mb-8">

          Join EcoStore and start shopping sustainably

        </p>

        {/* FORM */}

        <form className="space-y-6">

          {/* NAME */}

          <div>

            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#40916c]"
            />

          </div>

          {/* EMAIL */}

          <div>

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#40916c]"
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Create password"
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#40916c]"
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-[#2d6a4f] text-white py-4 rounded-full text-lg font-semibold hover:bg-[#40916c] transition"
          >
            Register
          </button>

        </form>

        {/* LOGIN LINK */}

        <p className="text-center text-gray-500 mt-8">

          Already have an account?{' '}

          <Link
            href="/login"
            className="text-[#2d6a4f] font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );
}