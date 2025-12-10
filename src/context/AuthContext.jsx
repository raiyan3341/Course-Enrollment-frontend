import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../components/firebase/Firebase.config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged 
} from "firebase/auth";
import api from "../api/axiosConfig";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [backendUser, setBackendUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        try {
    
          const token = await user.getIdToken();
          
          const res = await api.get("/auth/profile", {
            headers: { "x-firebase-token": token } 
          });
          
          setBackendUser(res.data);
   
          if (res.data?.token) localStorage.setItem("backend_token", res.data.token);
        } catch (err) {
          setBackendUser(null);
         
          localStorage.removeItem("backend_token"); 
        }
      } else {
        setBackendUser(null);
        localStorage.removeItem("backend_token");
      }
      setLoading(false);
    });
    return unsub;
  }, []);


 
  const register = async (payload) => {
    const { email, password, name, ...rest } = payload;

  
    const fbUser = await createUserWithEmailAndPassword(auth, email, password);


    await updateProfile(fbUser.user, { displayName: name });

    const res = await api.post("/auth/register", { email, password, name, ...rest });
    
    
    if (res.data.token) localStorage.setItem("backend_token", res.data.token);

    setBackendUser(res.data.user || res.data); // backend user object
    return res.data;
  };

 
  const login = async ({ email, password }) => {
   
    await signInWithEmailAndPassword(auth, email, password);
 
    const res = await api.post("/auth/login", { email, password });
    
  
    if (res.data.token) localStorage.setItem("backend_token", res.data.token);

    setBackendUser(res.data.user || res.data); 
    
    return res.data;
  };

  const logout = async () => {
    await signOut(auth);
    setBackendUser(null);
    localStorage.removeItem("backend_token");
    
  };

  const authInfo = {
    firebaseUser,
    backendUser,
    loading,
    setBackendUser,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};