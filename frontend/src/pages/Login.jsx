import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/auth/login";
      const response = await axios.post(url, loginInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { success, message, jwtToken, email } = response.data;
      if (success) {
        toast.success("Login successful");
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedinuser", email);
        navigate("/home");
      } else {
        toast.error(message || "Login failed");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-r from-black to-blue-800">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4"></header>
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-white/80 rounded-lg shadow-lg">
          <h1 className="text-center text-3xl font-extrabold text-gray-800 mb-4">
            Log In
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 block"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                name="email"
                value={loginInfo.email}
                required
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 block"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                name="password"
                value={loginInfo.password}
                required
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
            >
              Log In
            </button>
          </form>
          <div className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="  text-blue-700 font-semibold hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
