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

  // fetch courses JSON (for form options)
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


    if (form.password.length < 6) {
        return setError("Password must be at least 6 characters long.");
    }

    try {
      
        await register(form);

    
        navigate("/my-classes", { replace: true }); 
        
    } catch (err) {
        setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 text-white py-10">
      <h2 className="text-3xl text-center font-semibold mb-6"><span className="text-fuchsia-500">Register</span> Now</h2>
      {error && <div className="bg-red-500 text-white p-3 mb-3 rounded-md">{error}</div>}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 p-7 border-2 border-fuchsia-500 rounded-2xl">
        {/* Step 1: User Info */}
        <input 
          required 
          type="text" 
          name="name" 
          placeholder="Full Name" 
          value={form.name} 
          onChange={handleChange} 
          className="p-3 border w-full rounded-md bg-gray-900" 
        />
        <input 
          required 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={form.email} 
          onChange={handleChange} 
          className="p-3 border w-full rounded-md bg-gray-900" 
        />
        <input 
          required 
          type="password" 
          name="password" 
          placeholder="Password (min 6 chars)" 
          value={form.password} 
          onChange={handleChange} 
          className="p-3 border w-full rounded-md bg-gray-900" 
        />
        <input 
          required 
          type="text" 
          name="studentId" 
          placeholder="Student ID" 
          value={form.studentId} 
          onChange={handleChange} 
          className="p-3 border w-full rounded-md bg-gray-900" 
        />
        <input 
          type="text" 
          name="phone" 
          placeholder="Phone Number" 
          value={form.phone} 
          onChange={handleChange} 
          className="p-3 border w-full rounded-md bg-gray-900" 
        />
        <input 
          type="text" 
          name="address" 
          placeholder="Address" 
          value={form.address} 
          onChange={handleChange} 
          className="p-3 border w-full rounded-md bg-gray-900" 
        />

      
        <select 
          required 
          name="courseSelection" 
          value={form.courseSelection} 
          onChange={handleChange} 
          className="p-3 border w-full rounded-md bg-gray-900"
          disabled={!!fromEnroll} 
        >
          <option value="">Select a Course *</option>
          {courses.map(course => (
            <option key={course.id} value={course.title}>{course.title} (${course.price})</option>
          ))}
        </select>

        <select 
          required 
          name="paymentOption" 
          value={form.paymentOption} 
          onChange={handleChange} 
          className="p-3 border w-full rounded-md bg-gray-900"
        >
          <option value="">Select Payment Option *</option>
          <option value="card">Card</option>
          <option value="bkash">bKash</option>
          <option value="cash">Cash</option>
        </select>

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

        <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-md font-semibold hover:bg-indigo-700 transition duration-300">
          Register & Enroll
        </button>
        
      </form>
    </div>
  );
};

export default Register;