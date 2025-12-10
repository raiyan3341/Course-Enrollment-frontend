import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext";
import { sendPasswordResetEmail } from "firebase/auth"; 
import { auth } from "../components/Firebase/Firebase.config.js"; 

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null); 
  const navigate = useNavigate();
  const location = useLocation();
  const fromEnroll = location.state?.fromEnroll;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    try {
      await login({ email, password });

      if (fromEnroll) {
        navigate(`/courses/${fromEnroll}`, { replace: true });
      } else navigate("/my-classes", { replace: true });
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed. Check email and password.");
    }
  };
  

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    if (!email) {
      setErr("Please enter your email to reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMsg("Password reset email sent! Check your inbox.");
    } catch (error) {
      setErr("Error sending reset email. Email may not be registered.");
      console.error(error);
    }
  };

  return (
    <div className="container text-white mx-auto px-4 py-8">
      <h2 className="text-4xl  font-semibold mb-4 text-center"><span className="text-indigo-400">Login</span> now</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3 border-2 border-blue-500 rounded-2xl p-6">
        
        {err && <div className="bg-red-500 text-white p-3 mb-3 rounded-md">{err}</div>}
        {msg && <div className="bg-green-500 text-white p-3 mb-3 rounded-md">{msg}</div>}
        
        <input 
          required 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          className="p-3 border w-full rounded-md bg-gray-900" 
        />
        <input 
          required 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          className="p-3 border w-full rounded-md bg-gray-900" 
        />
        
        {/* ✅ Forget Password Button */}
        <button
          onClick={handleForgotPassword}
          className="text-sm text-indigo-400 hover:underline block text-right w-full pt-1"
        >
          Forgot Password?
        </button>

        <button
          type="submit"
          className="p-3 bg-indigo-600 text-white w-full rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Login
        </button>

        <p className="text-center text-sm pt-4">
            You're a new user?{" "}
            <Link to="/register" className="text-indigo-400 font-semibold hover:underline">
                Register now
            </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;