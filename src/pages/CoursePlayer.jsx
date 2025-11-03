import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const CoursePlayer = () => {
  const { enrollmentId } = useParams();
  const { loading: authLoading, backendUser } = useAuth();
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const navigate = useNavigate();
  
  
  const updateLessonProgress = useCallback(async (newLessonIndex) => {
    if (!enrollment) return;
    
  
    const totalLessons = enrollment.courseId.lessons.length;
    const completedLessons = newLessonIndex > 0 ? newLessonIndex : 0;
    const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

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

      if (newLessonIndex === totalLessons) {
        Swal.fire("Congratulations!", "You have completed the course!", "success");
      }
    } catch (err) {
      console.error("Error updating progress:", err);
      
      Swal.fire("Error", "Could not save your progress.", "error");
    }
  }, [enrollment, enrollmentId]);


 
  useEffect(() => {
    if (!backendUser || authLoading) return;
    
    const loadEnrollmentData = async () => {
      try {
        
        const res = await api.get(`/enrollments/${enrollmentId}`);
        const data = res.data;
        
        setEnrollment(data);
        
        
        setCurrentLessonIndex(data.currentLesson || 0);

      } catch (err) {
        console.error("Failed to load enrollment data:", err);
        Swal.fire("Error", "Could not load course data. Are you enrolled?", "error");
        navigate("/my-classes"); // Load না হলে My Classes এ ফেরত পাঠানো
      } finally {
        setLoading(false);
      }
    };
    
    loadEnrollmentData();
  }, [enrollmentId, backendUser, authLoading, navigate]);



  if (authLoading || loading) {
    return <div className="text-center py-20 text-white">Loading course player...</div>;
  }
  
 
  if (!backendUser) {
    return <div className="text-center py-20 text-red-500">Access Denied. Please login.</div>;
  }
  
  if (!enrollment || !enrollment.courseId) {
    return <div className="text-center py-20 text-white">Enrollment or Course data not found.</div>;
  }
  
  const course = enrollment.courseId;
  const currentLesson = course.lessons?.[currentLessonIndex];
  const totalLessons = course.lessons?.length || 0;
  
  
  const handleNext = () => {
    if (currentLessonIndex < totalLessons) {
        
        updateLessonProgress(currentLessonIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentLessonIndex > 0) {
        
        setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };
  
  
  if (totalLessons === 0) {
      return <div className="text-center py-20 text-yellow-500">No lessons found for this course.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6 text-indigo-400">{course.title}</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        
       
        <div className="lg:w-3/4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-xl">
            
            <div className="w-full aspect-video bg-black flex items-center justify-center rounded-lg mb-4">
              {currentLesson?.contentUrl ? (
                
                <iframe 
                    className="w-full h-full"
                    src={currentLesson.contentUrl} 
                    title={currentLesson.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
              ) : (
                <p className="text-xl text-gray-400">
                    Lesson {currentLessonIndex + 1}: {currentLesson?.title} - Content Not Available
                </p>
              )}
            </div>
            
            <h2 className="text-2xl font-semibold mb-2">{currentLesson?.title}</h2>
            <p className="text-gray-400">Lesson {currentLessonIndex + 1} of {totalLessons}</p>
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={handlePrev}
                disabled={currentLessonIndex === 0}
                className={`px-4 py-2 rounded-lg transition ${currentLessonIndex === 0 ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
              >
                ← Previous Lesson
              </button>
              
              <div className="text-lg font-medium text-green-400">
                Progress: {enrollment.progressPercentage}%
              </div>
              
              <button
                onClick={handleNext}
                disabled={currentLessonIndex >= totalLessons}
                className={`px-4 py-2 rounded-lg transition ${currentLessonIndex >= totalLessons ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {currentLessonIndex === totalLessons - 1 ? 'Finish Course' : 'Complete & Next →'}
              </button>
            </div>
          </div>
        </div>
        

        <div className="lg:w-1/4 bg-gray-800 p-4 rounded-lg shadow-xl">
          <h3 className="text-xl font-bold mb-4 border-b pb-2 border-gray-700">Course Curriculum</h3>
          <ul className="space-y-3 max-h-96 overflow-y-auto">
            {course.lessons.map((lesson, index) => (
              <li
                key={index}
                onClick={() => updateLessonProgress(index)} 
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
                {index === currentLessonIndex && <span className="float-right text-xs">▶️</span>}
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </div>
  );
};

export default CoursePlayer;