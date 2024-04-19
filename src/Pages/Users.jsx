import React, { useState, useEffect } from "react";
import axios from "axios";
import Retailer from "../Components/Retailer";
import Customer from "../Components/Customers";
const Users = () => {
  const [isRetailerView, setIsRetailerView] = useState(true); // State to track if retailer view is active
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <div className="mb-4">
        {/* Toggle buttons */}
        <button
          className={`mr-4 px-4 py-2 ${
            isRetailerView ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setIsRetailerView(true)}
        >
          Retailers
        </button>
        <button
          className={`px-4 py-2 ${
            !isRetailerView ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setIsRetailerView(false)}
        >
          Customers
        </button>
      </div>
      {/* Conditional rendering based on active view */}
      {isRetailerView ? <Retailer /> : <Customer />}
    </div>
  );
};

export default Users;
