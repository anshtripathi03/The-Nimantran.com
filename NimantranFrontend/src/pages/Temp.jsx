import { Outlet } from "react-router-dom";
import React, { useContext } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLoading } from "../context/LoadingContext";
import FullScreenLoader from "../components/FullScreenLoader";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/slices/authSlice";
import { fetchCartItems } from "../redux/slices/cartSlice";



const Temp = () => {
  const dispatch = useDispatch()

  const {user} = useSelector((state)=>state.auth)

const location = useLocation();
const { setLoading,loading } = useLoading();
useEffect(() => {
  setLoading(true)
  const timer = setTimeout(() => setLoading(false), 400)
  return () => clearTimeout(timer);
      


}, [location.pathname]);

useEffect(()=>{
  setLoading(true)
  dispatch(fetchUser())
  dispatch(fetchCartItems());
  setLoading(false)
},[dispatch])


  return (
    <div className="relative">
    
      {loading && <FullScreenLoader />}

  
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Temp;
