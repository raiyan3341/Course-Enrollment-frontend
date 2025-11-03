import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("/coursesData.json")
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-6 text-white">All Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map(course => (
          <Link key={course.id} to={`/courses/${course.id}`}>
            <div className="bg-gradient-to-r from-blue-200 via-blue-400 to-purple-200 border-2 border-blue-100 shadow-lg shadow-blue-200  p-4 rounded-xl transform transition duration-500 hover:scale-115 hover:shadow-2xl hover:shadow-purple-800">
              <img
                src={course.image}
                alt={course.title}
                className="rounded-lg h-40 w-full object-cover"
              />
              <h3 className="font-semibold text-lg mt-2">{course.title}</h3>
              <p className="text-sm text-gray-500">{course.instructor}</p>
              <p className="text-indigo-600 font-medium">${course.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;
