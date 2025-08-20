import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen, FaUsers, FaFileInvoiceDollar, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config";
const AdminLayout = () => {

  const navigate = useNavigate();
  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
    { name: "Cards", path: "/admin/cards", icon: <FaBoxOpen /> },
    { name: "Orders", path: "/admin/orders", icon: <FaFileInvoiceDollar /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Wholesalers", path: "/admin/wholesalers", icon: <FaUsers /> },
    { name: "Reviews", path: "/admin/reviews", icon: <FaStar /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded hover:bg-gray-700 transition ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            className="w-full bg-red-600 px-4 py-2 rounded hover:bg-red-800"
            onClick={async() => { 
               try {
                const res = await axios.post(`${API_BASE_URL}/api/user/auth/logoutUser`,{},{
                  withCredentials:true

                 

                })

                      localStorage.removeItem("adminToken");
              navigate('/')
               } catch (error) {
                 console.log("Error occured",error)
                 
               }

        
            }}
          >
          Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;




