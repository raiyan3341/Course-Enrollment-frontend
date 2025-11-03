import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";
import Swal from "sweetalert2";

const MyProfile = () => {
  
  const { backendUser, loading, setBackendUser, logout } = useAuth(); 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate(); 
  
  useEffect(() => {
    if (backendUser) {
      setFormData({
        
        name: backendUser.name || "",
        phone: backendUser.phone || "",
        address: backendUser.address || "",
      });
    }
  }, [backendUser]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!backendUser) return <div className="text-center py-20">Please login to view your profile.</div>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
        Swal.fire('Error', 'Name field cannot be empty.', 'error');
        return;
    }

   
    const updatePayload = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
    };
    
    const loader = Swal.fire({
        title: 'Updating...',
        text: 'Please wait',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        }
    });

    try {
    
      const res = await api.put("/users/profile", updatePayload);
      
    
      setBackendUser(prev => ({
        ...prev,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      }));
      
      loader.close();
      Swal.fire('Success', res.data.message || 'Profile updated successfully!', 'success');
      setIsEditing(false); 

    } catch (err) {
      loader.close();
      const errorMessage = err.response?.data?.message || 'Profile update failed. Check your network or server logs.';
      
      
      if (err.response?.status === 401) {
        
          logout(); 
          Swal.fire('Session Expired', 'Your session has expired. Please log in again.', 'warning');
          navigate("/login", { replace: true }); 
          return;
      }

      Swal.fire('Error', errorMessage, 'error');
      console.error("Profile Update Error:", err.response || err); 
    }
  };


  return (
    <div className="container mx-auto px-4 text-white py-10">
      <h2 className="text-3xl font-semibold mb-6">My Profile</h2>
      
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg shadow-indigo-500/30">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          
        
          <img
            src={backendUser.photo || "/default-avatar.png"}
            alt={backendUser.name}
            className="w-32 h-32 rounded-full object-cover border-2 border-indigo-500"
          />

          <div className="flex-1 space-y-2">
            <p><strong>Full Name:</strong> {backendUser.name}</p>
            <p><strong>Student ID:</strong> {backendUser.studentId}</p>
            <p><strong>Email:</strong> {backendUser.email}</p>
            <p><strong>Phone:</strong> {backendUser.phone || 'N/A'}</p>
            <p><strong>Address:</strong> {backendUser.address || 'N/A'}</p>
            <p><strong>Course Selected:</strong> {backendUser.courseSelection}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {isEditing && (
        <form onSubmit={handleUpdate} className="bg-gray-800 p-6 mt-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Edit Details</h3>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 border w-full rounded-md bg-gray-700 text-white"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="p-3 border w-full rounded-md bg-gray-700 text-white"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="p-3 border w-full rounded-md bg-gray-700 text-white"
            />
            
            <button
              type="submit"
              className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MyProfile;