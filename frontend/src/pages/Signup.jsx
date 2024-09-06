import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/auth/signup";
      const response = await axios.post(url, signupInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        toast.success("Signup successful! Redirecting to login...");
        setSignupInfo({ username: "", email: "", password: "" }); // Clear form
        navigate("/login");
      } else {
        toast.error(response.data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      toast.error("Signup failed due to an error. Please try again.");
      setSignupInfo({ username: "", email: "", password: "" }); // Clear form
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-r from-black to-blue-800">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
       
      </header>
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-white/90 rounded-lg shadow-xl">
          <h1 className="text-center text-3xl font-extrabold text-gray-800 mb-4">Sign Up</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-700 block">
                Username
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your username"
                name="username"
                value={signupInfo.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="you@example.com"
                name="email"
                value={signupInfo.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="••••••••"
                name="password"
                value={signupInfo.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <div className="text-center text-gray-600">
            Already a member?{" "}
            <Link to="/login" className=" text-blue-700 font-semibold hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
