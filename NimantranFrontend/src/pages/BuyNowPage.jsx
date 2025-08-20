import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BuyNowPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const card = location.state?.card;
 console.log("hello")
 console.log(card)

  if (!card) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-semibold text-red-600">No product selected!</h2>
        <button onClick={() => navigate("/")} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Go to Home
        </button>
      </div>
    );
  }
  const quantity = 1;
  const total = card.price * quantity;

  const handlePlaceOrder = () => {
    // Simulate order placement
    alert("Order placed successfully!");
    navigate("/"); // Redirect to homepage or orders page
  };
  return (
    <div className="p-6 md:p-20 bg-[#f9f1e7] font-serif min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#6A4E3A]">🛍 Buy Now</h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={card.images.front} alt={card.name} className="w-full h-64 object-cover rounded" />

        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#6A4E3A]">{card.name}</h2>
            <p className="text-gray-600 mt-2">Category: {card.category}</p>
            <p className="text-gray-600 mt-1">Brand: {card.brand}</p>
            <p className="text-gray-800 font-semibold mt-3">Price: ₹{card.price}</p>
            <p className="text-gray-800 mt-1">Quantity: {quantity}</p>
            <hr className="my-4" />
            <p className="text-xl font-bold">Total: ₹{total}</p>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFAA00] text-white font-semibold rounded shadow hover:scale-105 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyNowPage;
