import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { backendUser, logout } = useAuth();
  const navigate = useNavigate();

  
  const desktopLinkClass = ({ isActive }) =>
    `transition ${
      isActive ? "text-indigo-600 font-bold" : "text-gray-800 hover:text-indigo-600"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-3 transition text-gray-700 hover:bg-gray-100 ${
      isActive
        ? "bg-indigo-100 text-indigo-700 font-semibold"
        : ""
    }`;
    

  const handleCloseMenu = () => setOpen(false);

  const handleLogout = () => {
    logout();
    handleCloseMenu();
  }

  const handleProfileClick = () => {
    navigate("/my-profile");
    handleCloseMenu();
  }

  return (
    <nav className="bg-white shadow-2xl shadow-purple-400 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
      
        <Link to="/" className="font-bold text-xl mr-6 text-indigo-800">Programming Shk</Link>

      
        <div className="hidden md:flex space-x-4 items-center text-gray-700">
          <NavLink to="/" className={desktopLinkClass}>Home</NavLink>
          <NavLink to="/courses" className={desktopLinkClass}>Courses</NavLink>
          <NavLink to="/success" className={desktopLinkClass}>Success</NavLink>
          <NavLink to="/reviews" className={desktopLinkClass}>Reviews</NavLink>
          <NavLink to="/contact" className={desktopLinkClass}>Contact</NavLink>
          <NavLink to="/my-classes" className={desktopLinkClass}>My Classes</NavLink>
        </div>

  
        <div className="flex items-center space-x-3">
          {backendUser ? (
            <>
              
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/my-profile")}
              >
                <img
                  src={backendUser.photo || "/default-avatar.png"}
                  alt="Profile"

                  className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500" 
                />
                <span className="hidden md:block font-medium text-gray-800">{backendUser.name}</span>
              </div>

             
              <button
                onClick={logout}
                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition"
              >
                Register
              </Link>
            </>
          )}

          <button 
            className="md:hidden ml-2 text-2xl text-gray-800" 
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t absolute w-full shadow-lg">

          <NavLink to="/" className={mobileLinkClass} onClick={handleCloseMenu}>Home</NavLink>
          <NavLink to="/courses" className={mobileLinkClass} onClick={handleCloseMenu}>Courses</NavLink>
          <NavLink to="/success" className={mobileLinkClass} onClick={handleCloseMenu}>Success</NavLink>
          <NavLink to="/reviews" className={mobileLinkClass} onClick={handleCloseMenu}>Reviews</NavLink>
          <NavLink to="/contact" className={mobileLinkClass} onClick={handleCloseMenu}>Contact</NavLink>
          <NavLink to="/my-classes" className={mobileLinkClass} onClick={handleCloseMenu}>My Classes</NavLink>

          {backendUser ? (
            <>
   
              <button
                onClick={handleProfileClick} 
                className="block w-full text-left px-4 py-3 text-indigo-600 hover:bg-gray-100 transition"
              >
                My Profile
              </button>
              {/* Logout */}
              <button
                onClick={handleLogout} 
                className="block w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100 transition border-t"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={mobileLinkClass} onClick={handleCloseMenu}>Login</NavLink>
              <NavLink to="/register" className={mobileLinkClass} onClick={handleCloseMenu}>Register</NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;