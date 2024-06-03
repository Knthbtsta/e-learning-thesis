import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";

import Aa from "../assets/img/LoginImage.png";
import Bb from "../assets/img/LOGINBG.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState({
    username: "",
    password: "",
    userType: "student", // Default userType
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const getPasswordInputType = () => {
    return showPassword ? "text" : "password";
  };

  const getEyeIcon = () => {
    return showPassword ? <FaEye /> : <FaEyeSlash />;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Admin credentials (replace with actual validation logic as necessary)
    const adminCredentials = {
      username: "admin",
      password: "admin123",
    };

    if (login.userType === "admin") {
      if (
        login.username === adminCredentials.username &&
        login.password === adminCredentials.password
      ) {
        navigate(`/temporary/?id=admin_id`);
      } else {
        console.error("Invalid admin credentials");
      }
    } else {
      try {
        const response = await axios.get(
          `https://e-learning-thesis-tupm.onrender.com/api/login/?username=${login.username}&password=${login.password}`
        );

        if (response.status === 200) {
          const userDetailResponse = await axios.get(
            `https://e-learning-thesis-tupm.onrender.com/api/login/?username=${login.username}&password=${login.password}`
          );
          if (userDetailResponse.status === 200) {
            const userDetails = userDetailResponse.data;
            console.log(userDetails);

            if (userDetails[0].verified === true) {
              navigate(`/levelmap/?id=${userDetails[0]._id}`);
            } else {
              navigate(`/EmailError`);// Set the state to indicate email is not verified
            }
          } else {
            console.error("Unexpected response:", response);
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate(`/error`);
        } else {
          console.error("Error:", error.message);
        }
      }
    }
  };

  return (
    <div className="bg-[url('/gbg.png')] h-screen bg-cover overflow-hidden bg-no-repeat flex flex-col items-center justify-center">
      <div className="bg-[#4D6A1C] flex flex-col h-[370px] w-[320px] md:h-[370px] md:w-[320px] lg:w-[900px] lg:h-[600px] xl:h-[750px] lg:flex-row rounded-2xl shadow-lg items-center lg:p-5">
        <div className="pt-5 sm:pt-5 lg:px-24 text-[#FFFFFF]">
          <div className="fixed top-0 left-0 m-10">
            <Link
              to="/#Home"
              className="bg-[#2C4840] hover:scale-105 duration-300 rounded-full text-white font-bold"
            >
              <IoArrowBack style={{ fontSize: "40px" }} />
            </Link>
          </div>
          <h2 className="font-bold text-center text-[20px] lg:text-2xl pb-5 sm:pb-0">Sign in</h2>
          <form
            className="flex flex-col w-[230px] gap-4 text-[#2E2E2E]"
            onSubmit={handleSubmit}
          >
            <input
              className="sm:mt-5  h-[40px] lg:h-[50px] rounded-xl border text-[11px] lg:text-[20px]"
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <div className="relative">
              <input
                id="password"
                className="pt-2 rounded-xl border w-full h-[40px] lg:h-[50px] text-[11px] lg:text-[20px]"
                type={getPasswordInputType()}
                name="password"
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <svg
                onClick={togglePasswordVisibility}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                viewBox="0 0 16 16"
              >
                {getEyeIcon()}
              </svg>
            </div>
            <div className="flex items-center justify-center">
              <span className="inline-block bg-white h-px w-full mr-4"></span>
              <p className="text-[11px] lg:text-[20px] font-light text-[#FFFFFF]">OR</p>
              <span className="inline-block bg-white h-px w-full ml-4"></span>
            </div>
            <div className="text-sm">
              <h1 className="text-[#FFFFFF] text-[11px] lg:text-[15px]">Select type User</h1>
            </div>
            <div className="flex lg:flex-col flex-row gap-5">
            <select
              className="rounded-xl border p-2 text-[11px] px-6 h-[40px] lg:h-[50px] lg:text-[20px]" 
              name="userType"
              id="userType"
              onChange={handleChange}
              value={login.userType}
            >
              <option value="student">User</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              className="bg-[#B0713B] px-10 text-[#FFFFFF] text-[11px] lg:text-[20px] rounded-xl py-2 hover:scale-105 duration-300"
            >
              Login
            </button>
            </div>
          </form>
          <div className="lg:mt-5 sm:mt-0 text-[11px] lg:text-[15px] flex lg:flex-row flex-col lg:justify-between justify-center items-center">
            <p className="invisible lg:visible">Don't have an account?</p>
            <Link
              to="/signupuser"
              className="py-2 px-5 bg-white text-[11px] lg:text-[15px] text-black border rounded-xl hover:scale-105 duration-300"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="invisible lg:visible">
          <img
            src={Bb}
            className="rounded-2xl h-[550px] xl:h-[700px] w-[500px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
