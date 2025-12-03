import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { loadStripe } from '@stripe/stripe-js'; // 🆕 Add this import
import { Elements } from '@stripe/react-stripe-js';
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
import ScrollToTop from "./pages/ScrollToTop";
import CourseLearnPage from "./pages/CourseLearnPage";
import StripeCheckout from "./pages/StripeCheckout";
const stripePromise = loadStripe("pk_test_51SZW5SLpehN8cbsoIa5BYukX3YZTHPnj75PSGVUBrp7FT6TmKqhjk184ktG1sbB2IEY1z517BFQfM10sy81WeBJc001BE4CVBI");
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Elements stripe={stripePromise}>
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
            <Route path="/checkout/:id" element={<ProtectedRoute><StripeCheckout /></ProtectedRoute>} />
            <Route path="/my-classes" element={<ProtectedRoute><MyClasses /></ProtectedRoute>} />
            {/* fallback */}
            <Route path="*" element={<Home />} />
            <Route path="/my-classes" element={<ProtectedRoute><MyClasses /></ProtectedRoute>} />
            <Route path="/learn/:id" element={<ProtectedRoute><CourseLearnPage /></ProtectedRoute>} />
            <Route 
              path="/my-profile" 
              element={<ProtectedRoute><MyProfile /></ProtectedRoute>} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
      </Elements>
    </Router>
  );
}

export default App;
