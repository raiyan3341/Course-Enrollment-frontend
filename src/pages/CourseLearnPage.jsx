import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import coursesData from "../data/courses.json";

const CourseLearnPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {

    const found = coursesData.find((c) => c._id === id);
    setCourse(found);

    const stored = localStorage.getItem(`progress_${id}`);
    if (stored) setProgress(Number(stored));
  }, [id]);

  const handleProgress = (value) => {
    const newProgress = Math.min(100, Math.max(0, progress + value));
    setProgress(newProgress);
    localStorage.setItem(`progress_${id}`, newProgress);
  };

  if (!course)
    return (
      <div className="flex justify-center items-center min-h-[70vh] text-gray-400 text-xl">
        Course not found 😔
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10 text-white">
      {/* Back Button */}
      <Link
        to="/myclasses"
        className="text-indigo-400 hover:text-indigo-300 mb-5 inline-block"
      >
        ← Back to My Classes
      </Link>

      {/* Course Header */}
      <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full md:w-1/3 rounded-2xl shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-semibold mb-3">{course.title}</h1>
          <p className="text-gray-300 mb-4">{course.description}</p>
          <p className="text-indigo-300 mb-2">
            Instructor: <span className="text-white">{course.instructor}</span>
          </p>
          <p className="text-gray-400 mb-2">
            Duration: {course.duration} | Category: {course.category}
          </p>

          {/* Progress */}
          <div className="mt-4">
            <p className="mb-2 text-gray-300">Your Progress:</p>
            <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
              <div
                className="bg-indigo-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleProgress(+10)}
                className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                +10%
              </button>
              <button
                onClick={() => handleProgress(-10)}
                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
              >
                -10%
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl mb-10 shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">Course Video</h2>
        {course.videos && course.videos.length > 0 ? (
          <video
            controls
            className="w-full rounded-lg"
            poster={course.thumbnail}
          >
            <source src={course.videos[0].url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p className="text-gray-400">No videos uploaded for this course.</p>
        )}
      </div>

      {/* Modules / Lessons */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
        {course.lessons && course.lessons.length > 0 ? (
          <ul className="space-y-3">
            {course.lessons.map((lesson, idx) => (
              <li
                key={idx}
                className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 hover:bg-white/20 transition"
              >
                {lesson.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 font-medium">
            No lessons found for this course.
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseLearnPage;
