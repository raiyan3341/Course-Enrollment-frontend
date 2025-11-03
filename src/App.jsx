import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyClasses from "./pages/MyClasses";
import Contact from "./pages/Contact";
import Success from "./pages/Success";
import Reviews from "./pages/Reviews";
import ProtectedRoute from "./components/ProtectedRoute";
import MyProfile from "./pages/Myprofile";
import CoursePlayer from "./pages/CoursePlayer";
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route 
              path="/learn/:enrollmentId" 
              element={<ProtectedRoute><CoursePlayer /></ProtectedRoute>} 
            />
            <Route path="/success" element={<Success />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-classes" element={<ProtectedRoute><MyClasses /></ProtectedRoute>} />
            {/* fallback */}
            <Route path="*" element={<Home />} />
            <Route path="/my-classes" element={<ProtectedRoute><MyClasses /></ProtectedRoute>} />
            <Route 
              path="/my-profile" 
              element={<ProtectedRoute><MyProfile /></ProtectedRoute>} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
