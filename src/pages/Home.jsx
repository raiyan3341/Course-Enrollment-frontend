import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const highlights = [
  { value: "10K+", label: "Enrolled Students", icon: "🧑‍🎓" },
  { value: "4.8/5", label: "Average Rating", icon: "⭐" },
  { value: "100+", label: "Expert Instructors", icon: "👨‍🏫" },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { duration: 1.2, ease: "easeOut" } 
  },
};

const Home = () => {
  const [topCourses, setTopCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/coursesData.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setTopCourses(data.slice(0, 4)))
      .catch((error) => console.error("Failed to load courses data:", error));
  }, []);

  const CourseCard = ({ course }) => (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
    >
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
    </motion.div>
  );

  return (
    <div className="bg-gray-900 min-h-screen">

      {/* Header */}
      <motion.header
        className="bg-gradient-to-br from-indigo-900 via-gray-900 to-purple-900 py-24 shadow-2xl shadow-indigo-900/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1.2 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-7xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg"
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            <span className="text-yellow-400">Master</span> New Skills, <span className="text-indigo-400">Advance</span> Your Career
          </motion.h1>
          <motion.p
            className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8"
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            Learn from the best industry experts with hands-on projects and globally recognized certifications. Your future starts here.
          </motion.p>
          <motion.div
            className="flex justify-center space-x-6"
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
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
          </motion.div>
        </div>
      </motion.header>

      {/* Highlights */}
      <motion.div
        className="py-12 bg-gray-800 border-b border-t border-gray-700"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 bg-gray-900 rounded-xl shadow-xl border-t-4 border-yellow-500"
              >
                <span className="text-5xl mb-2 block">{item.icon}</span>
                <p className="text-4xl font-extrabold text-white">{item.value}</p>
                <p className="text-md text-gray-400 mt-1 uppercase tracking-wider">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Featured Courses */}
      <motion.div
        className="container mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.h2 className="text-5xl font-extrabold text-center text-white mb-4" variants={itemVariants}>
          Our <span className="text-indigo-400">Featured</span> Courses
        </motion.h2>
        <motion.p className="text-center text-gray-400 mb-12 text-lg" variants={itemVariants}>
          Start your learning journey with our most popular and highest-rated programs.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {topCourses.length > 0 ? (
            topCourses.map((course) => <CourseCard key={course.id} course={course} />)
          ) : (
            <p className="text-white text-center col-span-full">Loading top courses...</p>
          )}
        </div>

        <motion.div className="mt-12 text-center" variants={itemVariants}>
          <button
            onClick={() => navigate("/courses")}
            className="px-10 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition duration-300 shadow-md shadow-indigo-600/50"
          >
            View All {topCourses.length > 0 ? topCourses.length + "+" : ""} Courses →
          </button>
        </motion.div>
      </motion.div>

      {/* Advantage */}
      <motion.div
        className="bg-gray-800 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 className="text-4xl font-extrabold text-center text-white mb-10" variants={itemVariants}>
            The Advantage of Learning with Us
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Practical Focus", desc: "Gain real-world skills through compulsory hands-on projects and assignments.", icon: "💡" },
              { title: "Expert Support", desc: "Get personalized guidance from industry professionals and 24/7 technical support.", icon: "📞" },
              { title: "Career Ready", desc: "Access dedicated career guidance, resume workshops, and placement assistance.", icon: "💼" },
            ].map((item, index) => (
              <motion.div key={index} className="p-6 bg-gray-700 rounded-xl text-center border-t-4 border-yellow-500/50" variants={itemVariants}>
                <span className="text-5xl block mb-3">{item.icon}</span>
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
