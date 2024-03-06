import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Aa from "../assets/img/LoginImage.png";
import { FaGoogle } from "react-icons/fa";
import logo from "../assets/img/logo.png";
import axios from "axios";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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

  // Assuming your backend returns an object with attributes like studentId, firstName, middleName, lastName, email
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:8800/api/login/?username=${login.username}&password=${login.password}`
      );

      if (response.status === 200) {
        const userDetailResponse = await axios.get(
          `http://localhost:8800/api/login/?username=${login.username}&password=${login.password}`
        );

        if (userDetailResponse.status === 200) {
          const userDetails = userDetailResponse.data;
          console.log(userDetailResponse);
          // Navigate to the next page and pass the user details
          if (response.data[0].type === "Admin") {
            navigate("/temporary");
          } else {
            navigate(`/levelmap/?id=${userDetails[0]._id}`);
          }
        } else {
          console.error("Failed to fetch user details");
        }
      } else {
        console.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="bg-[url('/gbg.png')] min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="bg-[#4D6A1C] flex rounded-2xl shadow-lg max-w-7xl items-center  p-5">
        {/* FORM */}
        <div className="md:w-1/2 px-16 text-[#FFFFFF]">
          <h2 className="font-bold text-center text-2xl">Sign in</h2>
          <form className="flex flex-col gap-4 text-[#2E2E2E]">
            <input
              className="pt-2 mt-8 rounded-xl border"
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
              placeholder="Email"
              required=""
            />
            <div className="relative">
              <input
                id="password"
                className="pt-2 rounded-xl border w-full "
                type={getPasswordInputType()}
                name="password"
                onChange={handleChange}
                placeholder="••••••••"
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
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-[#B0713B] text-[#FFFFFF] rounded-xl py-2 hover:scale-105 duration-300"
            >
              Sign in
            </button>
          </form>

          <div className="mt-10 grid grid-cols-3 items-center ">
            <hr className="border-[#FFFFFF]" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-[#FFFFFF]" />
          </div>

          <button className="bg-white text-black flex justify-center border py-2 w-full rounded-xl mt-5 text-center hover:scale-105 duration-300">
            <FaGoogle className="mr-3 mt-1" /> Login with Google
          </button>

          <p className="mt-5 text-xs border-b border-[#FFFFFF] py-4">
            Forgot your password?
          </p>

          <div className="mt-5 text-xs flex justify-between">
            <p>Don't have an account..</p>
            <Link
              to="/user"
              className="py-2 px-5 bg-white text-black border rounded-xl hover:scale-105 duration-300"
            >
              Register
            </Link>
          </div>
        </div>

        {/* IMAGE */}
        <div className="md:block hidden">
          <img src={Aa} className="rounded-2xl h-[700px] w-[500px]" />
        </div>
      </div>
    </section>
  );
};

export default Login;
