import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, DollarSign, BookOpen } from 'lucide-react'; 
import { motion } from "framer-motion";


const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortCriteria, setSortCriteria] = useState("default");

    useEffect(() => {
        setLoading(true);
        fetch("/coursesData.json")
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch courses data');
                return res.json();
            })
            .then(data => {
                setCourses(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error loading courses:", error);
                setLoading(false);
            });
    }, []);

    const filteredAndSortedCourses = useMemo(() => {
        let filtered = courses.filter(course =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
        );

        switch (sortCriteria) {
            case "price-asc": filtered.sort((a,b)=>a.price-b.price); break;
            case "price-desc": filtered.sort((a,b)=>b.price-a.price); break;
            case "title-asc": filtered.sort((a,b)=>a.title.localeCompare(b.title)); break;
            default: break;
        }

        return filtered;
    }, [courses, searchTerm, sortCriteria]);

    const containerVariants = {
        hidden: {},
        show: {
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 80, scale: 0.9 },
        show: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            transition: { duration: 1.2, ease: "easeOut" }
        }
    };

    const CourseCard = ({ course }) => (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
        >
            <Link key={course.id} to={`/courses/${course.id}`}>
                <div className="bg-gradient-to-r from-blue-200 via-blue-400 to-purple-200 border-2 border-blue-100 shadow-lg shadow-blue-200 p-4 rounded-xl h-full transform transition duration-500 hover:scale-115 hover:shadow-2xl hover:shadow-purple-800 flex flex-col">
                    <img
                        src={course.image || "https://via.placeholder.com/600x400?text=Course+Image"}
                        alt={course.title}
                        className="rounded-lg h-40 w-full object-cover mb-3"
                    />
                    <h3 className="font-bold text-xl text-gray-900 mt-2 truncate">{course.title}</h3>
                    <p className="text-sm text-gray-600 mt-0.5 flex items-center">
                        <BookOpen size={14} className="mr-1 text-indigo-600" />
                        {course.instructor}
                    </p>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-blue-400">
                        <p className="text-2xl text-indigo-700 font-extrabold flex items-center">
                            <DollarSign size={20} />
                            {course.price}
                        </p>
                        <span className="text-xs font-medium bg-indigo-600 text-white px-3 py-1 rounded-full hover:bg-indigo-700 transition duration-200 cursor-pointer shadow-md">
                            View Details
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );

    if (loading) {
        return (
            <div className="bg-gray-900 min-h-screen flex items-center justify-center">
                <div className="text-white text-xl flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading Courses...</span>
                </div>
            </div>
        );
    }

    if (courses.length === 0 && !loading) {
        return (
            <div className="bg-gray-900 min-h-screen container mx-auto px-4 py-16 text-center text-white">
                <h2 className="text-4xl font-bold mb-4">No Courses Available</h2>
                <p className="text-gray-400">We couldn't load any courses at this moment. Please check the data source or try again later.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen">

            <div className="bg-gray-800 py-16 border-b border-gray-700 shadow-xl shadow-indigo-900/20">
                <div className="container mx-auto px-4">
                    <h1 className="text-6xl font-extrabold text-white mb-2">
                        Explore Our <span className="text-indigo-400">Course Catalog</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl">
                        Discover thousands of courses across 20+ disciplines taught by industry experts. Find your next skill.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="w-full md:w-auto relative">
                        <select
                            value={sortCriteria}
                            onChange={(e) => setSortCriteria(e.target.value)}
                            className="appearance-none bg-gray-700 text-white border border-gray-600 rounded-full py-3 px-6 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 cursor-pointer"
                        >
                            <option value="default">Sort By: Default</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="title-asc">Title: A to Z</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>

                    <div className="relative w-full md:w-1/3">
                        <input
                            type="text"
                            placeholder="Search by title or instructor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-700 text-white border border-gray-600 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                </div>

                {/* --- Animated Course Grid --- */}
                {filteredAndSortedCourses.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        {filteredAndSortedCourses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-12 bg-gray-800 rounded-xl mt-10 shadow-lg border border-gray-700">
                        <h3 className="text-3xl font-bold text-indigo-400 mb-2">No Results Found</h3>
                        <p className="text-gray-400">Try adjusting your search term or selecting a different sort option.</p>
                    </div>
                )}

                <p className="text-gray-500 text-center mt-12">
                    Showing {filteredAndSortedCourses.length} of {courses.length} total courses.
                </p>
            </div>
        </div>
    );
};

export default Courses;
