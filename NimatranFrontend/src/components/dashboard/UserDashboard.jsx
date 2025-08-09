import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { PackageSearch, MapPin } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../context/LoadingContext";
import { API_BASE_URL } from "../../config.js";

const UserDashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log("Logout failed", error);
      alert("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/auth/sendOtp`, { withCredentials: true });
      if (res.data.success) {
        alert("OTP sent to your email!");
      } else {
        alert(res.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error occurred", error);
      alert("Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const primaryAddress = user?.addresses?.[0];

  return (
    <div className="bg-[#f9f1e7] min-h-screen p-6 rounded-lg space-y-6">
      <h2 className="text-3xl font-serif font-bold text-[#d89f00]">
        Welcome, {user?.name || "User"}
      </h2>

      {/* Contact Info */}
      <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-yellow-400">
        <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <MapPin className="text-yellow-600" />
          Your Details
        </h3>
        <div className="ml-8 text-gray-700 space-y-1">
          <p><strong>Email:</strong> {user?.email || "N/A"}</p>
          <p><strong>Phone:</strong> {user?.phone || "N/A"}</p>
          <p>
            <strong>Role:</strong>{" "}
            <span className="bg-yellow-100 px-2 py-1 rounded-full text-yellow-800 font-medium">
              {user?.role?.toUpperCase() || "USER"}
            </span>
          </p>

          <div className="flex gap-4 mt-2">
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
              Logout
            </button>
            <button onClick={sendOtp} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
              Send OTP
            </button>
          </div>

          <p>
            <strong>Joined on:</strong>{" "}
            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN") : "N/A"}
          </p>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-yellow-400">
        <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <MapPin className="text-yellow-600" />
          Delivery Address
        </h3>
        <div className="ml-8 text-gray-700 space-y-1">
          {primaryAddress ? (
            <>
              <p>{primaryAddress.roadAreaColony}</p>
              <p>{primaryAddress.city}, {primaryAddress.state} - {primaryAddress.pincode}</p>
              <p>{primaryAddress.landmark}</p>
            </>
          ) : (
            <p>No address added yet.</p>
          )}
        </div>
      </div>

      {/* Order History */}
      <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-yellow-400">
        <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <PackageSearch className="text-yellow-600" />
          Order History
        </h3>
        {user?.orderHistory?.length ? (
          <div className="ml-6 space-y-4">
            {user.orderHistory.map((order, idx) => (
              <div key={idx} className="border border-gray-200 p-4 rounded-lg bg-[#fdf9f3]">
                <p><strong>Order ID:</strong> {order?.orderId}</p>
                <p><strong>Date:</strong> {new Date(order?.date).toLocaleDateString("en-IN")}</p>
                <p><strong>Status:</strong> <span className="text-yellow-700 font-medium">{order?.status}</span></p>
                <p><strong>Total:</strong> ₹{order?.totalAmount}</p>
                <div className="mt-2">
                  <strong>Items:</strong>
                  <ul className="list-disc ml-6">
                    {order?.items?.map((item, i) => (
                      <li key={i}>
                        {item.title} (x{item.quantity}) - ₹{item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 ml-6">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
