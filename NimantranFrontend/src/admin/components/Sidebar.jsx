import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Manage Cards", path: "/admin/cards" },
    { name: "Manage Orders", path: "/admin/orders" },
    { name: "Users", path: "/admin/users" },
    { name: "Wholesaler Applications", path: "/admin/applications" },
    { name: "Reviews", path: "/admin/reviews" },
  ];

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <ul>
        {menu.map(item => (
          <li key={item.name} className="mb-4">
            <Link to={item.path} className={`block p-2 rounded ${location.pathname === item.path ? "bg-blue-900 text-white" : "text-gray-700 hover:bg-gray-200"}`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
