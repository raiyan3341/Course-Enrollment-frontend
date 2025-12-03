import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";
import Swal from "sweetalert2";
import { User, Edit, Camera } from "lucide-react";

const MyProfile = () => {
  const { backendUser, loading, setBackendUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    photo: "",
  });

  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (backendUser) {
      setFormData({
        name: backendUser.name || "",
        phone: backendUser.phone || "",
        address: backendUser.address || "",
        photo: backendUser.photo || "",
      });
      setPreview(backendUser.photo || null);
    }
  }, [backendUser]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-indigo-400">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
        <span className="ml-3">Loading...</span>
      </div>
    );

  if (!backendUser)
    return (
      <div className="text-center py-20 text-red-400 bg-gray-900 h-screen">
        Please login to view your profile.
      </div>
    );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setFormData({ ...formData, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      Swal.fire("Error", "Name field cannot be empty.", "error");
      return;
    }

    const updatePayload = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      photo: formData.photo, 
    };

    const loader = Swal.fire({
      title: "Updating...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await api.put("/users/profile", updatePayload);

      setBackendUser((prev) => ({
        ...prev,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        photo: formData.photo,
      }));

      loader.close();
      Swal.fire(
        "Success",
        res.data.message || "Profile updated successfully!",
        "success"
      );
      setIsEditing(false);
    } catch (err) {
      loader.close();
      const errorMessage =
        err.response?.data?.message ||
        "Profile update failed. Check your network or server logs.";

      if (err.response?.status === 401) {
        logout();
        Swal.fire(
          "Session Expired",
          "Your session has expired. Please log in again.",
          "warning"
        );
        navigate("/login", { replace: true });
        return;
      }

      Swal.fire("Error", errorMessage, "error");
      console.error("Profile Update Error:", err.response || err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto py-10">
        <h2 className="text-4xl font-extrabold mb-8 text-indigo-400 border-b border-indigo-400/50 pb-2">
          <User className="inline-block mr-2" size={32} /> My Profile
        </h2>

        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl shadow-indigo-500/30 border border-gray-700">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Profile Photo Display */}
            <div className="relative w-36 h-36">
              <img
                src={
                  preview ||
                  backendUser.photo ||
                  "https://placehold.co/128x128/6366f1/ffffff?text=User"
                }
                alt={backendUser.name}
                className="w-full h-full rounded-full object-cover border-4 border-indigo-500 shadow-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/128x128/6366f1/ffffff?text=User";
                }}
              />
              {isEditing && (
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer">
                  <Camera size={24} className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </label>
              )}
            </div>

            {/* Profile Details */}
            <div className="flex-1 space-y-4 text-lg">
              <p>
                <strong className="text-indigo-400">Full Name:</strong>{" "}
                {backendUser.name}
              </p>
              <p>
                <strong className="text-indigo-400">Student ID:</strong>{" "}
                {backendUser.studentId}
              </p>
              <p>
                <strong className="text-indigo-400">Email:</strong>{" "}
                {backendUser.email}
              </p>
              <p>
                <strong className="text-indigo-400">Phone:</strong>{" "}
                {backendUser.phone || "N/A"}
              </p>
              <p>
                <strong className="text-indigo-400">Address:</strong>{" "}
                {backendUser.address || "N/A"}
              </p>
              <p>
                <strong className="text-indigo-400">Course Selected:</strong>{" "}
                <span className="text-green-400 font-medium">
                  {backendUser.courseSelection}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/50"
            >
              <Edit size={20} />
              <span>{isEditing ? "Cancel Edit" : "Edit Profile"}</span>
            </button>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <form
            onSubmit={handleUpdate}
            className="bg-gray-800 p-8 mt-8 rounded-2xl shadow-2xl shadow-yellow-500/20 border border-gray-700"
          >
            <h3 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2 text-yellow-400">
              Edit Details
            </h3>
            <div className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="p-4 border w-full rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="p-4 border w-full rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200"
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="p-4 border w-full rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200"
              />

              <button
                type="submit"
                className="px-6 py-4 bg-green-400 text-gray-900 font-extrabold rounded-lg hover:bg-green-500 transition duration-300 transform hover:scale-[1.01] shadow-xl shadow-green-500/40"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
