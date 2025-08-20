
import React from "react";
import { FaBoxOpen, FaTags, FaTruck, FaUserShield } from "react-icons/fa";
import Login from "./Login";
import BusinessRegister from "./BusinessRegister";
const WholesalerJoin = () => {
  return (
    <div className="min-h-screen bg-[#f9f1e7] flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFAA00] text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
          Join TheNimantran Wholesale Club
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl font-light">
          Buy premium invitation cards at wholesale prices and grow your business with us.
        </p>
      </section>

      {/* Benefits Section */}
      <section className="w-full max-w-6xl py-16 px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
          <FaTags className="text-4xl text-[#FFAA00] mx-auto mb-4" />
          <h3 className="font-semibold text-xl mb-2">Wholesale Prices</h3>
          <p className="text-gray-600 text-sm">
            Get access to exclusive discounts and bulk rates.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
          <FaBoxOpen className="text-4xl text-[#FFAA00] mx-auto mb-4" />
          <h3 className="font-semibold text-xl mb-2">Wide Collection</h3>
          <p className="text-gray-600 text-sm">
            Explore thousands of designs across all occasions.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
          <FaTruck className="text-4xl text-[#FFAA00] mx-auto mb-4" />
          <h3 className="font-semibold text-xl mb-2">Fast Delivery</h3>
          <p className="text-gray-600 text-sm">
            Nationwide doorstep delivery with tracking support.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
          <FaUserShield className="text-4xl text-[#FFAA00] mx-auto mb-4" />
          <h3 className="font-semibold text-xl mb-2">Trusted Partner</h3>
          <p className="text-gray-600 text-sm">
            1000+ wholesalers already trust TheNimantran.
          </p>
        </div>
      </section>

    
      <section className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-serif text-center mb-6">
          Get Started as a Wholesaler
        </h2>
        
         <BusinessRegister/>
      </section>
    </div>
  );
};

export default WholesalerJoin;
