import { Outlet } from "react-router-dom";
import React, { useContext } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLoading } from "../context/LoadingContext";
import FullScreenLoader from "../components/FullScreenLoader";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";



const Temp = () => {

const location = useLocation();
const { setLoading,loading } = useLoading();
useEffect(() => {
  setLoading(true)
  const timer = setTimeout(() => setLoading(false), 400)
  return () => clearTimeout(timer);
}, [location.pathname]);
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
