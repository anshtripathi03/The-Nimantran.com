import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Routes, Route, RouterProvider } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext"; 
import { LoadingProvider } from "./context/LoadingContext";
import { ToastContainer } from 'react-toastify';
import Temp from "./pages/Temp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Category from "./pages/Category";
import CardDetail from "./pages/CardDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import CardPage from "./pages/CardPage";
import WholesalerDashboard from "./components/dashboard/WholesalerDashboard";
import UserDashboard from "./components/dashboard/UserDashboard";
import BuyNowPage from "./pages/BuyNowPage";
import CardForm from "./pages/CardForm.jsx";
import DeliveryChecker from "./components/DeliveryChecker";
import Business from "./pages/Business.jsx";
import EcommerceUserDashboard from "./components/dashboard/userDashboard/user.jsx"
// Import Admin Routes
import AdminRoutes from "./admin/AdminRoutes"; 
import store from "./redux/store.js";
import UpdateUserInfo from "./components/dashboard/userDashboard/UpdateUserInfo.jsx";
import DeliveryBoard from "./components/dashboard/userDashboard/deliverboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* ---------- Main User Frontend Routes ---------- */}
      <Route path="/" element={<Temp />}>
        <Route index element={<Home />} />
        <Route path="add" element={<CardForm />} />
        <Route path="delivery-check" element={<DeliveryChecker />} />
        <Route path="business" element={<Business />} />
        <Route path="dashboard/wholeseller" element={<WholesalerDashboard />} />
        <Route path="dashboard/user" element={<EcommerceUserDashboard/>} />
        <Route path="category/:category" element={<CardPage />} />
        <Route path="search" element={<CardPage />} />
        <Route path="card/:id" element={<CardDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="buy-now" element={<BuyNowPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="userdashboard/updateuserinfo" element={<UpdateUserInfo />} />
        <Route path="/deliveryboard" element={<DeliveryBoard />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* ---------- Admin Panel Routes ---------- */}
      <Route path="/admin/*" element={<AdminRoutes />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoadingProvider>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
         <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
      </AuthProvider>
    </Provider>
  </LoadingProvider>
);
