import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";
import Swal from "sweetalert2"; 
import { DollarSign, Star, Clock, User, Layers, CheckCircle } from 'lucide-react';


const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const { backendUser, loading: authLoading } = useAuth();
    const [isEnrolled, setIsEnrolled] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
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

    const handleStripeCheckout = () => {
        if (!course) return;
        navigate(`/checkout/${course._id}`); 
    };

    const handleEnroll = async () => {
        if (authLoading) return;

        if (!backendUser) {
        
            Swal.fire('Login Required', 'You need to log in or register to enroll in a course.', 'info');
            navigate("/register", { state: { fromEnroll: course.id } }); 
            return;
        }

    
        Swal.fire({
            title: 'Processing Enrollment...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
        
            const res = await api.post("/enrollments", { courseId: course._id }); 
            
            Swal.fire('Success', 'You have successfully enrolled in this course!', 'success');
            setIsEnrolled(true);
            navigate("/my-classes");
        } catch (err) {
            Swal.fire('Error', err.response?.data?.message || 'Failed to enroll. Please try again.', 'error');
        }
    };


    if (loading || authLoading) {
        return (
             <div className="bg-gray-900 min-h-screen flex items-center justify-center">
                <div className="text-white text-xl flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading Course Details...</span>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="bg-gray-900 min-h-screen container mx-auto px-4 py-16 text-center text-white">
                <h2 className="text-4xl font-bold mb-4 text-red-500">Course Not Found</h2>
                <p className="text-gray-400">The requested course does not exist or has been removed.</p>
                <button 
                    onClick={() => navigate("/courses")} 
                    className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                    Back to Catalog
                </button>
            </div>
        );
    }
    
    const mockSyllabus = [
        "Introduction to Modern Web Development",
        "Deep Dive into React Hooks (useState, useEffect, useMemo)",
        "Advanced Tailwind CSS Utility and Responsiveness",
        "Data Fetching and API Integration (Axios/Fetch)",
        "State Management Patterns (Context API)",
        "Building Component Libraries and Reusability"
    ];


    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4 py-12 text-white">
                
                <div className="border-b border-gray-700 pb-4 mb-8">
                    <p className="text-indigo-400 uppercase tracking-widest text-sm font-semibold mb-1">{course.category || 'Development'}</p>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-3 leading-tight">{course.title}</h1>
                    <div className="flex items-center space-x-4 text-gray-400">
                        <span className="flex items-center">
                            <Star size={18} className="text-yellow-400 fill-yellow-400 mr-1" />
                            <span className="font-semibold text-lg">{course.rating || 'N/A'}</span>
                        </span>
                        <span>|</span>
                        <span className="flex items-center">
                            <User size={18} className="mr-1 text-indigo-400" />
                            Instructor: <span className="text-white ml-1 font-medium">{course.instructor}</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    <div className="lg:col-span-2">
                        
                    
                        <img
                            src={course.image || "https://via.placeholder.com/1200x600?text=Course+Hero+Image"}
                            alt={course.title}
                            className="w-full h-auto max-h-[450px] object-cover rounded-xl mb-8 shadow-xl border border-gray-700"
                        />

                  
                        <div className="mb-8">
                            <h3 className="text-3xl font-bold mb-4 border-b border-gray-800 pb-2">Course Overview</h3>
                            <p className="leading-relaxed text-gray-300 text-lg">{course.description}</p>
                        </div>
                        
                       
                        <div>
                            <h3 className="text-3xl font-bold mb-4 border-b border-gray-800 pb-2">What You Will Learn</h3>
                            <ul className="space-y-3">
                                {mockSyllabus.map((item, index) => (
                                    <li key={index} className="flex items-start text-gray-300">
                                        <CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                    
                   
                    <div className="lg:col-span-1">
                        <div className="sticky top-10 space-y-8">

                            {/* Action/Price Card */}
                            <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-indigo-600/50">
                                <p className="text-4xl font-extrabold mb-4 flex items-center text-yellow-400">
                                    <DollarSign size={30} className="mr-2" />
                                    {course.price === 0 ? 'FREE' : `$${course.price}`}
                                </p>
                                
                                {isEnrolled ? (
                                    <button 
                                        className="w-full px-6 py-4 bg-green-600 text-white font-bold rounded-lg text-lg opacity-80 cursor-not-allowed shadow-green-900/50 shadow-lg"
                                        disabled
                                    >
                                        🎉 Already Enrolled
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleEnroll}
                                        className="w-full px-6 py-4 bg-indigo-600 text-white font-bold rounded-lg text-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.02] shadow-indigo-900/50 shadow-xl"
                                    >
                                        Enroll Now ({course.price === 0 ? 'Free' : `$${course.price}`})
                                    </button>
                                    
                                )}
                                <p className="text-center text-sm text-gray-400 mt-3">30-Day Money Back Guarantee</p>
                            </div>
                            <button onClick={handleStripeCheckout} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-300 mt-4">Pay with Card (${course.price})</button>

                        
                            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
                                <h3 className="text-2xl font-bold mb-4 text-indigo-400">Course Facts</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                                        <span className="flex items-center text-gray-300"><Layers size={18} className="mr-2 text-blue-400" /> Level:</span>
                                        <span className="font-semibold text-white">{course.level || 'Intermediate'}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                                        <span className="flex items-center text-gray-300"><Clock size={18} className="mr-2 text-blue-400" /> Duration:</span>
                                        <span className="font-semibold text-white">{course.duration || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                                        <span className="flex items-center text-gray-300"><User size={18} className="mr-2 text-blue-400" /> Students:</span>
                                        <span className="font-semibold text-white">{course.students || '5k+'}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="flex items-center text-gray-300"><Layers size={18} className="mr-2 text-blue-400" /> Modules:</span>
                                        <span className="font-semibold text-white">{course.modules || '12'}</span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;