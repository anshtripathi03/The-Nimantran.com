import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Routes,Route , RouterProvider} from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext"; 
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
import Buisness from "./pages/Buisness";
import WholesalerDashboard from "./components/dashboard/WholesalerDashboard";
import UserDashboard from "./components/dashboard/UserDashboard"
import BuyNowPage from "./pages/BuyNowPage";
import { LoadingProvider } from "./context/LoadingContext";
import AddProductForm from "./pages/AddProductForm";



   
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Temp />}>
      <Route path="" element={<Home />} />
      <Route path="add" element = { <AddProductForm/>} />
      <Route path="buisness" element={<Buisness />} />
      <Route path="dashboard/wholeseller" element={<WholesalerDashboard />} />
      <Route path="dashboard/user" element={<UserDashboard />} />
      <Route path="category/:category" element={<CardPage />} />
      <Route path="search" element={<CardPage />} /> {/* ✅ Added */}
      <Route path="card/:id" element={<CardDetail />} />
      <Route path="cart" element={<Cart />} />
      <Route path="/buy-now" element={<BuyNowPage/>} />

      <Route path="checkout" element={<Checkout />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
 <LoadingProvider>
 <CartProvider>
  <AuthProvider>
<RouterProvider router = {router } />
  </AuthProvider>
 </CartProvider>
 </LoadingProvider>


);
