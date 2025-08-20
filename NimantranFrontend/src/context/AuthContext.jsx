import { createContext, useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useLoading } from "./LoadingContext.jsx";
export const AuthContext = createContext();
import {API_BASE_URL} from "../config.js"

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState({
    login: false,
    signup: false,
  });
  const {setLoading} = useLoading()
  const modalRef = useRef(null);
  
  const fetchUser = async () =>{

try {
  setLoading(true)
  const res = await axios.get(`${API_BASE_URL}/api/user/auth/me`,{
     withCredentials: true,
  });
    setUser( () =>res?.data?.data)

  setShowLogin({login:false ,signup:false})
  // console.log(res.data.data)
  // console.log(user)
} catch (error) {
    setUser(null)
    setShowLogin({login:true,signup:false})
}
finally{
  setLoading(false)
}

  }
  useEffect(()=>{
    fetchUser();
  },[])



  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        showLogin,
        setShowLogin,
        modalRef,
        fetchUser
      
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
