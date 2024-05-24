import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Aa from "../assets/img/LoginImage.png";
import Bb from "../assets/img/LOGINBG.png";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [isEmailVerified, setIsEmailVerified] = useState(true); // Assuming initially email is verified
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
            setIsEmailVerified(false); // Set the state to indicate email is not verified
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
  };

  return (
    <div className="bg-[url('/gbg.png')] h-screen bg-cover overflow-hidden bg-no-repeat flex flex-col items-center justify-center">
      <div className="bg-[#4D6A1C] flex flex-col h-[350px] w-[300px] sm:h-[300px] sm:w-[330px] md:h-[300px] md:w-[350px] lg:w-[900px] lg:h-[600px] xl:h-[750px] lg:flex-row rounded-2xl shadow-lg items-center lg:p-5">
        <div className="pt-10 lg:pt-10 sm:pt-5 lg:px-24 text-[#FFFFFF]">
          <h2 className="font-bold text-center text-2xl">Sign in</h2>
          <form className="flex flex-col w-[230px] gap-4 text-[#2E2E2E]">
            <input
              className="sm:mt-5 pt-2 mt-8 lg:pt-2 lg:mt-8 rounded-xl border"
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
              Login
            </button>
            {!isEmailVerified && ( // Conditionally render the button
              <button
                type="button"
                className="bg-red-600 text-[#FFFFFF] rounded-xl py-2 hover:scale-105 duration-300"
              >
                YOUR EMAIL IS NOT VERIFIED
              </button>
            )}
          </form>
          <div className="lg:mt-5 mt-2 sm:mt-0 text-[11px] flex lg:flex-row flex-col lg:justify-between justify-center items-center">
            <p className="invisible lg:visible">
              Don't have an account?
            </p>
            <Link
              to="/signupuser"
              className="py-2 px-5 bg-white text-black border rounded-xl hover:scale-105 duration-300"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="invisible lg:visible">
          <img src={Bb} className="rounded-2xl h-[550px] xl:h-[700px] w-[500px]" />
        </div>
      </div>
    </div>
  );
};

export default Login;
