import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import { CiLogout } from "react-icons/ci";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-blue-800">
      {/* Navbar Section */}
      <div className="flex items-center flex-wrap justify-between px-10 py-6 bg-blue-900 shadow-lg">
        <h1 className="text-3xl text-white font-bold uppercase tracking-wider">
          Inventory Management
        </h1>
        <button
          className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg focus:outline-none transition-all duration-300"
          onClick={handleLogout}
        >
          <CiLogout size={24} />
          <span className="font-semibold">Logout</span>
        </button>
      </div>

      {/* SearchForm Section */}
      <div className="flex justify-center items-center py-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
            Search Inventory
          </h2>
          <SearchForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
