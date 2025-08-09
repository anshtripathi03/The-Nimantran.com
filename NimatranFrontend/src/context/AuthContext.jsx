import { createContext, useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useLoading } from "./LoadingContext";
export const AuthContext = createContext();

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
  const res = await axios.post("/api/auth/me",{
     withCredentials: true,
  });
  setShowLogin({login:false ,signup:false})
  setUser(res.data.data)
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
      
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
