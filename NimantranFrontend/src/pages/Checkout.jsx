import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import AddressSection from "../components/AddressSection";
import PaymentOptions from "../components/PaymentOptions";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config";
function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const {cartItems,totalAmount,discountAmount}  = useSelector((state)=>state.cart)

  const buyNowItem = location.state?.card;
  const itemsToCheckout = buyNowItem ? [buyNowItem] : cartItems;
  console.log(itemsToCheckout)
  const totalAmountPaid = buyNowItem ? buyNowItem.price : totalAmount;

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  useEffect(() => {
    if (!buyNowItem && cartItems.length === 0) {
      navigate("/cart");
    }
  }, [buyNowItem, cartItems, navigate]);

  const emptyCart = async()=>{
    try {
      const res = await axios.delete(`${API_BASE_URL}/api/user/cart/emptyCart`,{
        withCredentials:true
      })
    } catch (error) {
      console.log("Error has been occured while emptying the cart",error)
    }
  }

  const handlePayment = async() => {

    try {
        if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }

      const res = await axios.post(`${API_BASE_URL}/api/user/order/createOrder`,{ items:cartItems, totalAmount,discount:discountAmount,tax:34,shippingFee:54,finalAmount:totalAmount,paymentMethod:"COD",shippingAddress:selectedAddress  },{
        withCredentials:true
      })
          console.log("I am the order",res)

     emptyCart();
      toast.success("YOUR ORDER HAS BEEN PLACED SUCCESSFULLY")
    navigate("/cart");
    } catch (error) {
      console.log("Error has been happened",error)
    }


  };

  return (
    <div className="bg-[#f9f1e7] min-h-screen py-10 px-4 md:px-8 font-serif">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 space-y-8">

        {/* Section Title */}
        <h1 className="text-2xl md:text-3xl font-semibold text-[#6A4E3A] text-center mb-6">
          Checkout
        </h1>

        {/* Address Section */}
        <AddressSection
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />

        {/* Payment Options */}
        <PaymentOptions
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />

        {/* Items Summary */}
        <div className="divide-y divide-gray-300">
          {itemsToCheckout.map((item, index) => (
            <div
              key={index}
              className="py-4 flex flex-col md:flex-row items-center gap-4"
            >
              <img
                src={item.images?.primaryImage || item.image}
                alt={item.title}
                className="w-28 h-28 rounded-md object-cover border"
              />
              <div className="text-sm md:text-base flex-1 md:ml-4">
                <h2 className="text-lg md:text-xl font-bold text-[#6A4E3A]">
                  {item.title}
                </h2>
                <p className="text-gray-600 mt-1">
                  Category: <span className="font-medium">{item.category}</span>
                </p>
                <p className="text-gray-600">
                  Brand: <span className="font-medium">{item.brand || "TheNimantran"}</span>
                </p>
                <p className="text-gray-800 font-semibold mt-2">
                  Price: ₹{item.price}
                </p>
                <p className="text-gray-700">Quantity: 1</p>
              </div>
            </div>
          ))}
        </div>

        {/* totalAmount and Pay Button */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t pt-6">
          <p className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-0">
            totalAmount: ₹{totalAmountPaid}
          </p>
          <button
            onClick={handlePayment}
            className="bg-gradient-to-r from-[#FFD700] to-[#FFAA00] text-white px-5 py-2.5 rounded-full shadow hover:scale-105 transition-transform text-sm md:text-base"
          >
            Pay Now 💳
          </button>
        </div>

        {/* Back to Cart */}
        {!buyNowItem && (
          <div className="text-center">
            <Link
              to="/cart"
              className="text-blue-600 hover:underline text-sm inline-block mt-2"
            >
              ⬅ Back to Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;