import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { PlayCircle, Clock, CheckCircle } from "lucide-react";

const CoursePlayer = () => {
  const { enrollmentId } = useParams(); 
  const { loading: authLoading, backendUser } = useAuth(); 
  const [enrollment, setEnrollment] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0); 
  const navigate = useNavigate(); 


  useEffect(() => {
    if (!backendUser || !enrollmentId) return;

    const fetchEnrollment = async () => {
      try {

        const res = await api.get(`/enrollments/${enrollmentId}`);
        const fetchedEnrollment = res.data;
        setEnrollment(fetchedEnrollment);
        setCurrentLessonIndex(fetchedEnrollment.currentLesson);
        
      } catch (err) {
        console.error("Error fetching enrollment:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.message || "Could not load course enrollment.",
        });
        navigate('/my-classes', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollment();
  }, [enrollmentId, backendUser, navigate]);



  const updateLessonProgress = useCallback(async (newLessonIndex) => { 
    if (!enrollment || !enrollment.courseId || !enrollment.courseId.lessons) return;
    
    const totalLessons = enrollment.courseId.lessons.length; 
    const completedLessons = newLessonIndex;
    const progressPercentage = Math.round((completedLessons / totalLessons) * 100); 
    const shouldUpdateBackend = newLessonIndex > enrollment.currentLesson || newLessonIndex === totalLessons;

    if (shouldUpdateBackend) {
        try {
            const res = await api.put(`/enrollments/${enrollmentId}/progress`, { 
                currentLesson: newLessonIndex, 
                progressPercentage: progressPercentage, 
            });

            setEnrollment(prev => ({ 
                ...prev, 
                currentLesson: res.data.currentLesson, 
                progressPercentage: res.data.progressPercentage, 
            }));
            
            setCurrentLessonIndex(newLessonIndex); 

            if (newLessonIndex < totalLessons) {
                Swal.fire({
                    icon: 'success',
                    title: 'Lesson Completed!',
                    text: `Progress updated to ${progressPercentage}%`,
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Course Completed!',
                    text: 'Congratulations on finishing the course!',
                    confirmButtonColor: '#4f46e5'
                });
            }

        } catch (err) {
            console.error("Error updating progress:", err);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: err.response?.data?.message || "Could not update progress.",
            });
        }
    } else {

        setCurrentLessonIndex(newLessonIndex);
    }
  }, [enrollment, enrollmentId]); 



  if (loading || authLoading) { 
    return (
      <div className="flex justify-center items-center min-h-[70vh] text-lg text-gray-400">
        Loading course content...
      </div>
    );
  }


  if (!enrollment || !enrollment.courseId) {
    return (
        <div className="flex justify-center items-center min-h-[70vh] text-lg text-red-400">
            {enrollment ? "Course data is missing from enrollment object." : "Enrollment not found. Please check your URL."}
        </div>
    );
  }


  const course = enrollment.courseId; 
  const totalLessons = course.lessons?.length || 0;
  const currentLesson = course.lessons?.[currentLessonIndex];
  

  if (!totalLessons || !currentLesson) {
      return (
        <div className="flex justify-center items-center min-h-[70vh] text-lg text-red-400">
            The course data is incomplete or has no lessons.
        </div>
    );
  }

  // --- 4. Handlers ---
  const handleNextLesson = () => {
    if (currentLessonIndex === totalLessons - 1) {
        updateLessonProgress(totalLessons); 
    } 

    else if (currentLessonIndex === enrollment.currentLesson) {
        const nextLessonIndex = currentLessonIndex + 1;
        updateLessonProgress(nextLessonIndex);
    }

    else if (currentLessonIndex < totalLessons - 1) {
        setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePreviousLesson = () => {
    setCurrentLessonIndex(prev => Math.max(0, prev - 1));
  };
  
  const handleSidebarClick = (index) => {
 
    if (index > enrollment.currentLesson) {
         Swal.fire({
            icon: 'warning',
            title: 'Lesson Locked',
            text: 'You must complete the previous lessons first.',
            confirmButtonColor: '#4f46e5'
        });
        return;
    }

    updateLessonProgress(index); 
  };
  

  return (
    <div className="container mx-auto px-4 py-10 text-white min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-6 text-indigo-400 drop-shadow-lg">
        {course.title}
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content Area */}
        <div className="lg:w-3/4 bg-gray-800 p-6 rounded-lg shadow-2xl border border-gray-700">
          
          {/* Video Player */}
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-6">
            <video
              controls
              key={currentLesson.contentUrl} 
              className="w-full h-full object-contain"
              poster={course.thumbnail}
            >
              <source src={currentLesson.contentUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Lesson Details */}
          <h2 className="text-2xl font-bold mb-3">
            <PlayCircle size={24} className="inline-block mr-2 text-indigo-400" />
            Lesson {currentLessonIndex + 1}: {currentLesson.title}
          </h2>
          <p className="text-gray-400 mb-6 flex items-center">
            <Clock size={16} className="mr-1" />
            Duration: {currentLesson.duration || "N/A"}
          </p>

          <p className="text-gray-300 mb-8">
            {currentLesson.description || "No description provided for this lesson."}
          </p>

          {/* Navigation/Completion Buttons */}
          <div className="flex justify-between items-center border-t border-gray-700 pt-4">
            <button
                onClick={handlePreviousLesson}
                disabled={currentLessonIndex === 0}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                ← Previous Lesson
            </button>
            <button
                onClick={handleNextLesson}
                disabled={currentLessonIndex >= totalLessons} 
                className={`px-6 py-2 rounded-lg transition ${
                  currentLessonIndex === totalLessons - 1 
                    ? "bg-green-600 hover:bg-green-700" 
                    : currentLessonIndex === enrollment.currentLesson 
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-green-600 hover:bg-green-700'}` 
                }
            >
              {currentLessonIndex === totalLessons - 1 ? 'Finish Course' : 'Complete & Next →'} 
            </button>
          </div>
        </div>
        

        {/* Sidebar / Curriculum */}
        <div className="lg:w-1/4 bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-700">
          <h3 className="text-xl font-bold mb-4 border-b pb-2 border-gray-700">Course Curriculum</h3>
          <ul className="space-y-3 max-h-96 overflow-y-auto">
            {course.lessons.map((lesson, index) => ( 
              <li
                key={index}
                onClick={() => handleSidebarClick(index)} 
                className={`p-3 rounded-md cursor-pointer transition ${ 
                  index === currentLessonIndex 
                    ? "bg-indigo-600 font-semibold"
                    : index < enrollment.currentLesson 
                    ? "bg-green-700 hover:bg-green-600 text-gray-100" 
                    : "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                }`}
              >
                <span className="font-medium">Lesson {index + 1}:</span> {lesson.title} 
                {index < enrollment.currentLesson && <span className="float-right text-xs text-green-300">✅</span>} 
                {index === currentLessonIndex && <span className="float-right text-xs text-white ml-2">▶️</span>} 
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-10 p-6 bg-gray-800 rounded-lg shadow-2xl border border-gray-700">
          <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold text-indigo-400">Your Progress</span>
              <span className="text-xl font-bold text-white">{enrollment.progressPercentage || 0}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${enrollment.progressPercentage || 0}%` }}
              ></div>
          </div>
          {enrollment.progressPercentage === 100 && (
              <p className="text-center text-green-400 font-medium mt-3 flex items-center justify-center">
                  <CheckCircle size={20} className="mr-2" />
                  Course Completed! Great work!
              </p>
          )}
      </div>

    </div>
  );
};

export default CoursePlayer;