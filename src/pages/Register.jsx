import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig"; 

const Register = () => {
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    studentId: "",
    phone: "",
    address: "",
    paymentOption: "",
    transactionId: "",
    courseSelection: "" 
  });

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const fromEnroll = location.state?.fromEnroll;


  useEffect(() => {
    fetch("/coursesData.json")
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        if (fromEnroll) {
          const preselectedCourse = data.find(c => c.id === parseInt(fromEnroll));
          if (preselectedCourse) {
            setForm(prev => ({ ...prev, courseSelection: preselectedCourse.title }));
          }
        }
      });
  }, [fromEnroll]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
 
      await register(form);
    
      navigate("/my-classes", { replace: true });

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };


  return (
    <div className="container mx-auto px-4 py-16 min-h-[80vh]  text-white">
      <div className="max-w-150 mx-auto p-8  border-2 border-blue-500 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">Register & Enroll</h2>
        {error && <div className="bg-red-500 text-white p-3 mb-4 rounded-md text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4 ">

          {/* Name Field */}
          <input
            required
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="p-3 border w-full rounded-md bg-gray-900"
          />
          
          {/* Email Field */}
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 border w-full rounded-md bg-gray-900"
          />

          {/* Password Field */}
          <input
            required
            type="password"
            name="password"
            placeholder="Password (Min 6 characters)"
            value={form.password}
            onChange={handleChange}
            className="p-3 border w-full rounded-md bg-gray-900"
          />

          {/* Student ID Field */}
          <input
            required
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={form.studentId}
            onChange={handleChange}
            className="p-3 border w-full rounded-md bg-gray-900"
          />

          {/* Phone Field */}
          <input
            required
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="p-3 border w-full rounded-md bg-gray-900"
          />

          {/* Address Field */}
          <input
            required
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="p-3 border w-full rounded-md bg-gray-900"
          />

          {/* Course Selection Dropdown */}
          <select
            required
            name="courseSelection"
            value={form.courseSelection}
            onChange={handleChange}
            className="p-3 border w-full rounded-md bg-gray-900 text-gray-400"
          >
            <option value="" disabled>Select a Course to Enroll</option>
            {courses.map(course => (
              <option key={course._id} value={course.title}>
                {course.title} (${course.price})
              </option>
            ))}
          </select>

          {/* Payment Option Dropdown */}
          <select
            required
            name="paymentOption"
            value={form.paymentOption}
            onChange={handleChange}
            className="p-3 border w-full rounded-md bg-gray-900 text-gray-400"
          >
            <option value="" disabled>Select Payment Method</option>
            <option value="card">Card</option>
            <option value="bkash">bKash</option>
            <option value="cash">Cash</option>
          </select>

          {/* Transaction ID Field (Conditional) */}
          {form.paymentOption && form.paymentOption !== "cash" && (
            <input
              required
              type="text"
              name="transactionId"
              placeholder="Transaction ID"
              value={form.transactionId}
              onChange={handleChange}
              className="p-3 border w-full rounded-md bg-gray-900"
            />
          )}

          {/* Profile Photo Upload */}
          <label className="block text-sm font-medium text-gray-400 pt-2">Upload Profile Photo (Optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => setForm({ ...form, photo: reader.result });
              if (file) reader.readAsDataURL(file);
            }}
            className="p-2 border w-full rounded-md bg-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="p-3 bg-indigo-600 text-white w-full rounded-md hover:bg-indigo-700 transition duration-300 mt-6"
          >
            Register & Enroll
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;