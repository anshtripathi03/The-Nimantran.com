import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import {useSelector,useDispatch} from "react-redux"
import { AuthContext } from "../context/AuthContext";
import { fetchUser } from "../redux/slices/authSlice";
const BusinessRegister = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    contactNumber: "",
    gstNumber: "",
    businessAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await axios.post(`${API_BASE_URL}/api/wholesaler/apply`, formData,{
        withCredentials:true
      });
      setSuccessMsg("Registration request sent successfully! Wait for admin approval.");
      setFormData({
        businessName: "",
        ownerName: "",
        email: "",
        contactNumber: "",
        gstNumber: "",
        businessAddress: "",
      });
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  const {user  } = useSelector((state)=>{     return  state.auth})
  const {setShowLogin} = useContext(AuthContext)  

   return(
    <>
        { user === null ?   <div className="flex justify-center items-center flex-col"> <div className=" text-red-600">Please Login first to Register</div>      <button
              onClick={() => setShowLogin((prev) => ({ ...prev, login: true }))}
              className="px-3 py-2 rounded-md text-black  bg-green-600 hover:bg-yellow-300"
            >
           Login
            </button>  </div>: <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Business Registration</h2>

        {successMsg && <p className="text-green-600">{successMsg}</p>}
        {errorMsg && <p className="text-red-600">{errorMsg}</p>}

        <input
          type="text"
          name="businessName"
          placeholder="Business Name"
          value={formData.businessName}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <input
          type="text"
          name="ownerName"
          placeholder="Owner Name"
          value={formData.ownerName}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <input
          type="tel"
          name="contactNumber"
          placeholder="contactNumber Number"
          value={formData.contactNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <input
          type="text"
          name="gstNumber"
          placeholder="GST Number"
          value={formData.gstNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <textarea
          name="businessAddress"
          placeholder="Business businessAddress"
          value={formData.businessAddress}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        ></textarea>

     

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {loading ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>}
    </>
   )
  
  
  
};

export default BusinessRegister;
