import React, { useState, useEffect, useContext } from "react";
import BusinessRegisterForm from "./BusinessRegister.jsx";
import WholesaleCards from "./WholesaleCards.jsx";
import axios from "axios";
import { API_BASE_URL } from "../config.js";
import { useLoading } from "../context/LoadingContext.jsx";
import { useNavigate } from "react-router-dom";
import ErrorToast from "../components/ErrorToast.jsx";
import WholesalerJoin from "./WholesalerJoin.jsx";
import {useSelector,useDispatch} from "react-redux"
import { fetchUser } from "../redux/slices/authSlice.js";
const Business = () => {
  const [error, setError] = useState(null);
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const {user} = useSelector((state)=>state.auth)



const dispatch = useDispatch()
  useEffect(() => {
    
    dispatch(fetchUser())
   

  }, [dispatch]);
  console.log(user)


  const handleStatusUpdate = (newStatus) => {
    setWholesaler(prev => ({
      ...prev,
      wholesalerStatus: newStatus
    }));
  };

return (
  <div className="bg-[#f9f1e7] min-h-screen p-4 md:p-6">





    {  (user && user.wholesalerStatus === "approved" ) ?
        <WholesaleCards /> :<WholesalerJoin />  
    
    }
  </div>
);

};

export default Business;