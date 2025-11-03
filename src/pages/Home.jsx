import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const highlights = [
    { value: "10K+", label: "Enrolled Students", icon: "🧑‍🎓" },
    { value: "4.8/5", label: "Average Rating", icon: "⭐" },
    { value: "100+", label: "Expert Instructors", icon: "👨‍🏫" },
];

const Home = () => {
    const [topCourses, setTopCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/coursesData.json")
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => setTopCourses(data.slice(0, 4))) 
            .catch(error => {
                console.error("Failed to load courses data:", error);
                
            });
    }, []);

    
    const CourseCard = ({ course }) => (
        <Link key={course.id} to={`/courses/${course.id}`}>
            <div className="bg-gray-800 border border-gray-700 shadow-xl shadow-indigo-900/40 p-3 rounded-xl h-full transform transition duration-500 hover:scale-[1.05] hover:shadow-indigo-500/50 hover:border-indigo-500">
                <img
                    src={course.image || "https://via.placeholder.com/600x400?text=Course+Image"}
                    alt={course.title}
                    className="rounded-lg h-40 w-full object-cover mb-3"
                />
                <h3 className="font-bold text-xl text-white mt-2 truncate">{course.title}</h3>
                <p className="text-sm text-gray-400 mt-0.5">Instructor: {course.instructor}</p>
                <div className="flex justify-between items-center mt-3">
                    <p className="text-2xl text-yellow-400 font-extrabold">${course.price}</p>
                    <span className="text-xs font-medium bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                        Enroll Now
                    </span>
                </div>
            </div>
        </Link>
    );

    return (
        <div className="bg-gray-900 min-h-screen">
            
            
            <header className="bg-gradient-to-br from-indigo-900 via-gray-900 to-purple-900 py-24 shadow-2xl shadow-indigo-900/50">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-7xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
                        <span className="text-yellow-400">Master</span> New Skills, <span className="text-indigo-400">Advance</span> Your Career
                    </h1>
                    <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
                        Learn from the best industry experts with hands-on projects and globally recognized certifications. Your future starts here.
                    </p>
                    <div className="flex justify-center space-x-6">
                        <button
                            onClick={() => navigate("/courses")}
                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 transform hover:scale-105 text-xl"
                        >
                            Explore All Courses
                        </button>
                        <button
                            onClick={() => navigate("/about")}
                            className="bg-transparent border-2 border-indigo-400 text-indigo-400 font-bold py-4 px-10 rounded-full hover:bg-indigo-400 hover:text-white transition duration-300 transform hover:scale-105 text-xl"
                        >
                            Why Choose Us?
                        </button>
                    </div>
                </div>
            </header>

            
            <div className="py-12 bg-gray-800 border-b border-t border-gray-700">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {highlights.map((item, index) => (
                            <div key={index} className="text-center p-6 bg-gray-900 rounded-xl shadow-xl border-t-4 border-yellow-500">
                                <span className="text-5xl mb-2 block">{item.icon}</span>
                                <p className="text-4xl font-extrabold text-white">{item.value}</p>
                                <p className="text-md text-gray-400 mt-1 uppercase tracking-wider">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-5xl font-extrabold text-center text-white mb-4">
                    Our <span className="text-indigo-400">Featured</span> Courses
                </h2>
                <p className="text-center text-gray-400 mb-12 text-lg">
                    Start your learning journey with our most popular and highest-rated programs.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {topCourses.length > 0 ? (
                        topCourses.map(course => <CourseCard key={course.id} course={course} />)
                    ) : (
                        <p className="text-white text-center col-span-full">Loading top courses...</p>
                    )}
                </div>

                
                <div className="mt-12 text-center">
                    <button
                        onClick={() => navigate("/courses")}
                        className="px-10 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition duration-300 shadow-md shadow-indigo-600/50"
                    >
                        View All {topCourses.length > 0 ? topCourses.length + "+" : ""} Courses →
                    </button>
                </div>
            </div>
            
         
            <div className="bg-gray-800 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-center text-white mb-10">
                        The Advantage of Learning with Us
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Practical Focus", desc: "Gain real-world skills through compulsory hands-on projects and assignments.", icon: "💡" },
                            { title: "Expert Support", desc: "Get personalized guidance from industry professionals and 24/7 technical support.", icon: "📞" },
                            { title: "Career Ready", desc: "Access dedicated career guidance, resume workshops, and placement assistance.", icon: "💼" },
                        ].map((item, index) => (
                            <div key={index} className="p-6 bg-gray-700 rounded-xl text-center border-t-4 border-yellow-500/50">
                                <span className="text-5xl block mb-3">{item.icon}</span>
                                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
         
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
                <p className="text-xl text-gray-400 mb-8">
                    Don't wait! Find the perfect course and take the first step towards a rewarding career.
                </p>
                <div className="flex justify-center flex-wrap gap-4">
                    <Link to="/reviews" className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition shadow-md shadow-purple-600/50">
                        Read Student Reviews
                    </Link>
                    <Link to="/instructors" className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition shadow-md shadow-teal-600/50">
                        Meet Our Instructors
                    </Link>
                    <Link to="/contact" className="px-8 py-3 border-2 border-yellow-500 text-yellow-500 font-semibold rounded-full hover:bg-yellow-500 hover:text-gray-900 transition">
                        Contact Us
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Home;