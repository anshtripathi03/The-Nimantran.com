import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config.js";

const AddressSection = ({ selectedAddress, setSelectedAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    alternatePhone: "",
    state: "",
    city: "",
    roadAreaColony: "",
    pincode: "",
    landmark: "",
    typeOfAddress: "",
  });

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/getAddresses`, { withCredentials: true });
      const add = res.data.data.addresses;
      console.log(add);
      setAddresses(add.map(a => ({ ...a, id: a._id })));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddAddress = async () => {
    const isValid = Object.values(newAddress).every((field) => field.trim() !== "");
    if (!isValid) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/addAddress`, newAddress, { withCredentials: true });
      setNewAddress({
        name: "",
        phone: "",
        alternatePhone: "",
        state: "",
        city: "",
        roadAreaColony: "",
        pincode: "",
        landmark: "",
        typeOfAddress: "",
      });
      setShowForm(false);
      fetchAddresses();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="mb-10">
      <h2 className="text-lg md:text-xl font-bold text-[#6A4E3A] mb-4">
        1️⃣ Delivery Address
      </h2>

      {/* Existing Addresses */}
      <div className="space-y-3">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`border rounded-xl p-4 font-serif transition-all cursor-pointer ${
              selectedAddress?.id === address.id
                ? "border-[#FFD700] bg-yellow-50 scale-[1.01] shadow"
                : "border-gray-300 hover:border-[#FFD700] hover:shadow-sm"
            }`}
            onClick={() => setSelectedAddress(address)}
          >
            <p className="font-medium text-[#6A4E3A]">{address.name}</p>
            <p className="text-sm text-gray-700">
              {address.roadAreaColony}, {address.city}, {address.state} - {address.pincode}
            </p>
            <p className="text-sm text-gray-700">Phone: {address.phone}</p>
          </div>
        ))}
      </div>

      {/* Add New Address Toggle */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="mt-3 text-sm text-blue-600 hover:underline font-medium"
        >
          ➕ Add New Address
        </button>
      ) : (
        <div className="mt-5 bg-[#fff8dc] border border-yellow-300 p-5 rounded-xl font-serif">
          <h3 className="text-md font-semibold text-[#6A4E3A] mb-4">New Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(newAddress).map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field}
                value={newAddress[field]}
                onChange={(e) => setNewAddress({ ...newAddress, [field]: e.target.value })}
                className="p-2 border rounded text-sm focus:outline-yellow-400"
                required
              />
            ))}
          </div>
          <div className="mt-5 flex gap-4">
            <button
              onClick={handleAddAddress}
              className="bg-gradient-to-r from-[#FFD700] to-[#FFAA00] text-white px-5 py-2 rounded-full shadow hover:scale-105 transition-transform"
            >
              Save Address
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="text-sm text-red-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSection;
