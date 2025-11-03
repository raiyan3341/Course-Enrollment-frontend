import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";
import Swal from "sweetalert2";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const { backendUser, loading: authLoading } = useAuth();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    fetch("/coursesData.json") 
      .then(res => res.json())
      .then(data => {

        const selected = data.find(c => c.id === parseInt(id)); 
        setCourse(selected);
      })
      .finally(() => setLoading(false));
  }, [id]);

 
  useEffect(() => {
    if (backendUser && course) {
      
      const isUserEnrolled = backendUser.courseSelection === course.title;
      

      setIsEnrolled(isUserEnrolled);
    }
  }, [backendUser, course]);
  

  const handleEnroll = async () => {
    if (authLoading) return;

    if (!backendUser) {
      
      navigate("/register", { state: { fromEnroll: course.id } }); 
      return;
    }

    
    try {
        
        const res = await api.post("/enrollments", { courseId: course._id }); 
        
        Swal.fire('Success', 'You have successfully enrolled in this course!', 'success');
        setIsEnrolled(true);
        navigate("/my-classes"); // Redirect to My Classes after direct enrollment
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Failed to enroll.', 'error');
    }
  };

  if (loading || authLoading || !course) return <div className="text-center py-20 text-white">Loading Course Details...</div>;

  return (
    <div className="container mx-auto px-4 py-10 text-white">
      <h2 className="text-4xl font-bold mb-6 text-indigo-400">{course.title}</h2>
      
      <div className="md:flex md:space-x-8">
        
        
        <div className="md:w-1/2 flex flex-col items-center">
          <img
            src={course.image}
            alt={course.title}
            className="w-140 h-90 rounded-lg mb-4"
          />
          <div className="text-2xl p-5 rounded-lg w-3xl">
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <p><strong>Price:</strong> ${course.price}</p>
            <p><strong>Rating:</strong> {course.rating} ⭐</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <p><strong>Category:</strong> {course.category}</p>
          </div>
        </div>
        
       
        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold mb-3">Course Description</h3>
          <p className="mb-6 leading-relaxed text-gray-300">{course.description}</p>
          
          {isEnrolled ? (
            <button 
              className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg text-lg opacity-80 cursor-not-allowed"
              disabled
            >
              Already Enrolled
            </button>
          ) : (
            <button
              onClick={handleEnroll}
              className=" px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg text-lg hover:bg-indigo-700 transition duration-300"
            >
              Enroll Now (${course.price})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;