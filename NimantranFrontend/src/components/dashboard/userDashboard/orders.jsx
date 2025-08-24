import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config.js";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/user/order/getUserOrders`,
        { withCredentials: true }
      );
      
      console.log("The orders are",res)

      const mappedOrders = res.data.data.map((order) => ({
        
        orderId: order.orderId,
        status: order.status,
        date: order.orderDate,
        total: order.finalAmount,
        discount: order.discount,
        items: order.items.map((item) => ({
          id: item._id,
          name: item?.cardId?.name || "AYush",
          category: item.category,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress: order.shippingAddress,
      }
    ));
     console.log("The final orders",mappedOrders)
      setOrders(mappedOrders);
    } catch (err) {
      console.error("Error fetching orders:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cancel order
  const handleCancelOrder = async (orderId) => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/user/order/cancelOrder`,
        { orderId },
        { withCredentials: true }
      );
      alert("Order cancelled successfully!");
      fetchOrders();
    } catch (err) {
      console.error("Error cancelling order:", err.response?.data || err.message);
      toast.error("Sorry! This feature is currently unavailable.");
    }
  };

  
  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading your orders...</p>;
  }

  if (orders.length === 0) {
    return <p className="text-center py-10">No orders found.</p>;
  }

  return (
    <div className="space-y-6 p-4">
      {orders.map((order) => (
        <button className="w-full" onClick={() => navigate("/deliveryboard", { state: { order } })}>
        <div
          key={order.orderId}
          className="bg-white shadow-md rounded-2xl border p-4"
        >
          {/* Order Header */}
          <div className="flex justify-between items-center border-b pb-2 mb-3">
            <div>
              <h2 className="font-semibold">Order #{order.orderId}</h2>
              <p className="text-sm text-gray-500">
                Placed on {order.date} • Status:{" "}
                <span className="font-medium capitalize">{order.status}</span>
              </p>
            </div>
            {order.status !== "cancelled" && (
              <button
                onClick={() => handleCancelOrder(order.orderId)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
              >
                Cancel Order
              </button>
            )}
          </div>

          {/* Items List */}
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 items-center border-b pb-3 last:border-b-0"
              >
                <img
                  src={item.image}
                  className="w-20 h-20 object-cover rounded-md border"
                />
               
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <p className="text-sm">
                    Qty: {Number(item.quantity)} × ₹{item.price}
                  </p>
                </div>
                <p className="font-semibold text-lg">
                  ₹{(item.price * item.quantity)} 
                
                </p>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="flex justify-between items-center mt-4 pt-3 border-t">
            <p className="text-gray-600">Discount: ₹{order.discount}</p>
            <p className="font-bold text-xl">
              Total: ₹{order.total}
            </p>
          </div>
        </div>
        </button>
      ))}
    </div>
  );
};

export default Orders;
