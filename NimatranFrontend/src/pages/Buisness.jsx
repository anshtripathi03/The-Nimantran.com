import React, { useState } from 'react';
import dummyCards from "../Data.jsx"
const Business = () => {
  const [isWholesaler, setIsWholesaler] = useState(true); // change to true to simulate already registered
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'wedding', 'birthday', 'baby-shower', 'business-inauguration'];

 

  const filteredCards = selectedCategory === 'All' 
    ? dummyCards 
    : dummyCards.filter(card => card.category === selectedCategory);

  return (
    <div className="min-h-screen px-6 md:px-20 py-10 bg-[#f9f1e7]">
      {isWholesaler ? (
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center text-heading">Wholesale Raw Cards</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg shadow ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700'
                } transition`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCards.map(card => (
              <div key={card.id} className="bg-white rounded-xl shadow p-4 text-center">
                <img src={card.images.front} alt={card.title} className="rounded-lg h-40 object-cover mx-auto" />
                <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
                <p className="text-sm text-gray-600">₹{card.price} per unit</p>
                <button className="mt-3 bg-primary text-white px-4 py-1 rounded hover:scale-105 transition-transform">
                  Order Bulk
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Register as a Retailer / Wholesaler</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Business Name" className="w-full px-4 py-2 border rounded" required />
            <input type="text" placeholder="GST Number" className="w-full px-4 py-2 border rounded" required />
            <input type="text" placeholder="Business Address" className="w-full px-4 py-2 border rounded" required />
            <input type="email" placeholder="Business Email" className="w-full px-4 py-2 border rounded" required />
            <input type="tel" placeholder="Contact Number" className="w-full px-4 py-2 border rounded" required />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#FFAA00] to-[#FF6A00] text-white px-6 py-2 rounded w-full"
              onClick={() => setIsWholesaler(true)}
            >
              Register
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Business;
