import { useState, useContext, useEffect } from "react";
import axios from "axios";
import {API_BASE_URL} from "../config.js"
import { AuthContext } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";

const Signup = () => {
  const { showLogin, setShowLogin, modalRef } = useContext(AuthContext);
  const { setLoading } = useLoading();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    otp: "",
    password: "",
    phone: "",
    isRetailer: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (!isVerified) {
        setError("Please verify your email before signing up.");
        return;
      }

      const res = await axios.post(`${API_BASE_URL}/api/user/auth/registerUser`, formData, {
        withCredentials: true,
      });
         console.log("I am working")
      if (res.data?.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => {
          setShowLogin({ signup: false, login: true });
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    setError("");
    if (!formData.email.trim()) {
      setError("Please enter a valid email.");
      return;
    }
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/user/auth/getLoginOtp`,
        { email: formData.email },
        { withCredentials: true }
      );

      if (res.data?.success) {
        setIsSent(true);
        setError("");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    setError("");

    try {
      const res = await axios.post(`${API_BASE_URL}/api/user/auth/checkOtp`, {
        email: formData.email,
        otp: formData.otp.trim(),
      });

      if (res.data?.success) {
        setIsVerified(true);
        setError("");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "OTP verification failed");
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowLogin({ login: false, signup: false });
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [modalRef, setShowLogin]);

  if (!showLogin.signup) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md relative"
        ref={modalRef}
      >
        <button
          type="button"
          onClick={() => setShowLogin({ login: false, signup: false })}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
          autoFocus
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-2 px-4 py-2 border rounded"
          required
        />

        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              sendOtp();
            }}
            className={`px-4 py-2 text-white rounded ${
              isSent ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={isSent}
          >
            {isSent ? "OTP Sent" : "Send OTP"}
          </button>
        </div>

        {isSent && !isVerified && (
          <div className="mb-4">
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter the OTP sent to your email"
              className="w-full mb-2 px-4 py-2 border rounded"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                verifyOtp();
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Verify OTP
            </button>
          </div>
        )}

        {isVerified && <p className="text-green-600 mb-4">Email verified ✅</p>}

        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Set your password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 border rounded"
          required
        />

        <div className="mb-6">
          <label className="block font-medium mb-1">Are you a retailer?</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="isRetailer"
                checked={formData.isRetailer === true}
                onChange={() => setFormData({ ...formData, isRetailer: true })}
              />
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="isRetailer"
                checked={formData.isRetailer === false}
                onChange={() => setFormData({ ...formData, isRetailer: false })}
              />
              No
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isVerified}
          className={`w-full text-white py-2 rounded flex items-center justify-center ${
            isVerified ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <span
            onClick={() => setShowLogin({ login: true, signup: false })}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
