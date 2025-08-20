import React, { useState } from "react";
import { API_BASE_URL } from "../config";
export default function DeliveryChecker() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [manualPincode, setManualPincode] = useState("");

  const getUserCoordinates = () => {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject("Geolocation not supported");
      }
    });
  };

  const checkDelivery = async () => {
    setLoading(true);
    setStatus("");
    try {
      const coords = await getUserCoordinates();
      const res = await fetch(`${API_BASE_URL}/api/check-delivery?lat=${coords.latitude}&lng=${coords.longitude}`);
      const data = await res.json();
      setStatus(data.message);
    } catch (error) {
      setStatus("Unable to auto-detect. Please enter pincode.");
    }
    setLoading(false);
  };

  const checkByPincode = async () => {
    if (!manualPincode) return;
    setLoading(true);
    setStatus("");
    const res = await fetch(`${API_BASE_URL}/api/check-delivery-pincode?pincode=${manualPincode}`);
    const data = await res.json();
    setStatus(data.message);
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg max-w-md mx-auto mt-4">
      <h2 className="text-lg font-semibold mb-3">Check Delivery Availability</h2>

      <button
        onClick={checkDelivery}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold"
        disabled={loading}
      >
        {loading ? "Checking..." : "Detect My Location"}
      </button>

      <div className="flex items-center gap-2 mt-3">
        <input
          type="text"
          placeholder="Enter Pincode"
          value={manualPincode}
          onChange={(e) => setManualPincode(e.target.value)}
          className="border p-2 flex-1 rounded-lg"
        />
        <button
          onClick={checkByPincode}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Check
        </button>
      </div>

      {status && <p className="mt-3 text-center font-medium">{status}</p>}
    </div>
  );
}
