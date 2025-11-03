// ProfileModal.jsx

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";
import Swal from "sweetalert2";

const ProfileModal = ({ onClose, isVisible }) => {
  const { backendUser, loading, setBackendUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    if (backendUser) {
 
      setFormData({
        name: backendUser.name || "",
        phone: backendUser.phone || "",
        address: backendUser.address || "",
        photo: backendUser.photo || "",
      });
    }
  }, [backendUser]);

  if (loading || !backendUser) return null; 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhotoFile(file); 

    
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    
   
    const updatePayload = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        photo: formData.photo 
    };

    try {
        const res = await api.put("/users/profile", updatePayload);
        
      
        setBackendUser(prev => ({ ...prev, ...updatePayload }));

        Swal.fire({
            icon: "success",
            title: "Success",
            text: res.data.message || "Profile updated successfully!",
            showConfirmButton: false,
            timer: 1500
        });
        setIsEditing(false);
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response?.data?.message || "Failed to update profile.",
        });
    }
  };

  if (!isVisible) return null;

  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end" onClick={onClose}>
     
      <div 
        className="bg-gray-800 text-white w-full max-w-lg h-full overflow-y-auto shadow-2xl p-6 relative transform transition-transform duration-300 ease-out translate-x-0"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          &times;
        </button>

        <h2 className="text-3xl font-semibold mb-6 border-b border-gray-700 pb-2">
          {isEditing ? "Edit Profile" : "My Profile"}
        </h2>

        <button
            onClick={() => setIsEditing(!isEditing)}
            className={`absolute top-4 right-12 px-3 py-1 text-sm rounded ${isEditing ? 'bg-red-600' : 'bg-indigo-600'} text-white hover:opacity-90 transition`}
        >
            {isEditing ? "Cancel Edit" : "Edit Profile"}
        </button>

        <form onSubmit={handleUpdate} className="space-y-5">
      
            <div className="flex flex-col items-center mb-6">
                <img
                    src={formData.photo || "/default-avatar.png"}
                    alt={formData.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 mb-3"
                />
                {isEditing && (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                )}
            </div>
            <p className="border-b border-gray-700 pb-2"><strong>Student ID:</strong> {backendUser.studentId}</p>
            <p className="border-b border-gray-700 pb-2"><strong>Email:</strong> {backendUser.email}</p>
            <p className="border-b border-gray-700 pb-2"><strong>Course:</strong> {backendUser.courseSelection}</p>

            <div>
                <label className="block text-sm font-medium text-gray-400">Full Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`p-3 w-full rounded-md bg-gray-900 ${isEditing ? 'border border-indigo-500' : 'text-gray-400'}`}
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-400">Phone</label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`p-3 w-full rounded-md bg-gray-900 ${isEditing ? 'border border-indigo-500' : 'text-gray-400'}`}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400">Address</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`p-3 w-full rounded-md bg-gray-900 ${isEditing ? 'border border-indigo-500' : 'text-gray-400'}`}
                />
            </div>
          
            {isEditing && (
                <button
                    type="submit"
                    className="w-full px-4 py-3 mt-5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
                >
                    Save Changes
                </button>
            )}
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;