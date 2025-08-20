import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ManageCards from "./pages/ManageCards";
import ManageOrders from "./pages/ManageOrders";
import Users from "./pages/Users";
import WholesalerApplications from "./pages/WholesalerApplications.jsx";
import Reviews from "./pages/Reviews";
import AdminLayout from "./components/AdminLayout";

// Protected Route Component
const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin/login" />;
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />

      {/* Layout wrapper for protected routes */}
      <Route
        path="/"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="cards" element={<ManageCards />} />
        <Route path="orders" element={<ManageOrders />} />
        <Route path="users" element={<Users />} />
        <Route path="wholesalers" element={<WholesalerApplications />} />
        <Route path="reviews" element={<Reviews />} />
      </Route>

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AdminRoutes;
