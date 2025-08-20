import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {API_BASE_URL} from "../../config.js"
import axios  from "axios"
const AdminLogin = () => {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/admin/securedLogin/login`, { emailOrPhone, password },{
        withCredentials:true
      });
      console.log(res.data)
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert("Login failed. Check credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        <input
          type="emailOrPhone"
          placeholder="emailOrPhone"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
