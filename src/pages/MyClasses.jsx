// src/pages/MyClasses.jsx

import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const MyClasses = () => {
  const { backendUser, loading } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const navigate = useNavigate();

 
  useEffect(() => {
    const loadEnrollments = async () => {
      setLoadingData(true);
      try {
        
        const res = await api.get("/users/enrollments");
        setEnrollments(res.data);
      } catch (err) {
        console.error("Error loading enrollments:", err.response?.data?.message || err.message);
       
        if (err.response?.status === 401) {
          navigate("/login", { replace: true });
        }
      } finally {
        setLoadingData(false);
      }
    };

   
    if (backendUser) loadEnrollments();
  }, [backendUser, navigate]);

  
  if (loading || loadingData)
    return (
      <div className="flex justify-center items-center min-h-[70vh] text-lg text-gray-400">
        Loading your enrolled courses...
      </div>
    );
  
  if (enrollments.length === 0)
    return (
      <div className="container mx-auto px-4 py-10 text-white min-h-[70vh]">
        <h2 className="text-3xl font-semibold mb-6">My Classes</h2>
        <p className="text-xl text-gray-400">You are not enrolled in any courses yet. <Link to="/courses" className="text-indigo-400 hover:text-indigo-300">Browse courses</Link> to enroll.</p>
      </div>
    );


  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold text-white mb-6">My Enrolled Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollments.map((en) => (
          <div
            key={en._id}
            className="bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-5 shadow-xl hover:shadow-indigo-500/50 transition duration-300"
          >
           
            <img
              src={en.courseId?.thumbnail || "/course-placeholder.png"}
              alt={en.courseId?.title}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-white mb-2 drop-shadow">
              {en.courseId?.title}
            </h3>
            <p className="text-gray-200 mb-4">
              Progress: {en.progressPercentage || 0}%
            </p>

            <div className="flex justify-between">
              <Link
                
                to={`/learn/${en._id}`} 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Continue Course
              </Link>
              <Link
                
                to={`/courses/${en.courseId?._id}`} 
                className="px-4 py-2 border border-indigo-400 text-indigo-400 rounded-lg hover:bg-indigo-700 hover:text-white transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClasses;