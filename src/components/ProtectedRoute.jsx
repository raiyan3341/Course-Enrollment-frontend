// src/components/ProtectedRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {

  const { backendUser, loading } = useAuth(); 

  if (loading) 
    return (
        <div className="flex justify-center items-center min-h-[70vh] text-lg text-white p-8">
            Authenticating Session...
        </div>
    );
  
  
  if (!backendUser) return <Navigate to="/login" replace />; 
  return children;
};

export default ProtectedRoute;