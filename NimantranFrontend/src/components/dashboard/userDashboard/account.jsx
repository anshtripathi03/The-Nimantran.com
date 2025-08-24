import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';

export default function Account() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [isWholesaler, setIsWholesaler] = useState(false)
  const navigate = useNavigate()

  const getUserData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/user/auth/me`, {
        withCredentials: true
      });
      console.log("Account details are", res);

      setUser(res.data.data);
      console.log("This is user data", res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("useffect running")
    getUserData();
    if (user?.wholesalerStatus === "approved") {
      setIsWholesaler(true);
      console.log("User is a retailer");
    } else {
      console.log("User is not a retailer");
    }
  }, []);
  return (
    <section>
      {loading?(
        <div>Loading...</div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h2 className="font-semibold mb-4">Account Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Name</label>
            <input
              className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-800"
              value={user.name}
              disabled={true}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <input
              className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-800"
              value={user.email}
              disabled={true}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <input
              className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-800"
              value={user.phone}
              disabled={true}
            />
          </div>
          <div className="flex items-end">
            <button className="px-4 mx-4 py-2 bg-gray-500 text-white rounded" onClick={() => {
              navigate("/userdashboard/updateuserinfo")
            }}>Edit</button>
            <button className="px-4 mx-4 py-2 bg-primary text-white rounded">Save</button>
          </div>
        </div>
      </div>
      )}
    </section>
  );
}
