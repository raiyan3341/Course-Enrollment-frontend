import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="border rounded p-4">
      <img src={course.thumbnail || "/course-placeholder.png"} alt={course.title} className="w-full h-40 object-cover rounded" />
      <h3 className="text-lg font-semibold mt-3">{course.title}</h3>
      <p className="text-sm mt-2">{course.description?.slice(0, 100)}...</p>
      <div className="flex justify-between items-center mt-3">
        <span className="font-bold">${course.price}</span>
        <Link to={`/courses/${course._id}`} className="text-indigo-600">View</Link> 
      </div>
    </div>
  );
};

export default CourseCard;