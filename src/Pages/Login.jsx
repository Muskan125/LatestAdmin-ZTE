import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import login from "../assets/login.png";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    // Allow: backspace, delete, tab, escape, enter
    if (
      [46, 8, 9, 27, 13].includes(e.keyCode) ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  };

  const submitLogin = async () => {
    try {
      const { data } = await axios.post(
        "https://onestore-vert.vercel.app/moblogin",
        {
          mob: phoneNumber,
        }
      );

      if (data.token) {
        const expirationTime = Date.now() + 86400000; // 24 hours
        const tokenData = {
          token: data.token,
          expiresAt: expirationTime,
        };
        localStorage.setItem("tokenData", JSON.stringify(tokenData));
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        console.log("Token = ", data.token);
        navigate("/AdminDashboard");
      } else {
        console.error("User not found or other error:", data.error);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="text-center mb-8">
              <img src={login} alt="Login Img" className="w-2/3 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-4">Login to continue</h2>
            </div>
            <div className="flex justify-center items-center gap-3">
              <span className=" text-gray-600">+91</span>
              <input
                id="phoneNumber"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Your Number"
                onKeyDown={handleKeyDown}
                maxLength={10}
                minLength={10}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
              onClick={submitLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
