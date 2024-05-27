import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Signupuser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    school: "",
    firstName: "",
    middleName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key].trim() === "") {
        newErrors[key] = "This field is required";
      }
    });
    if (!validateEmail(formData.email) && formData.email.trim() !== "") {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateFields()) {
      const obj = {
        school: formData.school,
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        username: formData.username,
        password: formData.password,
        email: formData.email,
        type: "user",
        stars: "0",
      };

      try {
        const response = await axios.post(
          "https://e-learning-thesis-tupm.onrender.com/api/user",
          obj
        );
        console.log(response);
        if (response.status === 200) {
          console.log("User created successfully");
          navigate(`/verification`, {
            state: { formData: response.data },
          });
          console.log(obj);
        } else {
          console.error("Failed to create user");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <section className="bg-[url('/gbg.png')] h-full sm:h-screen overflow-hidden bg-no-repeat bg-cover">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-xl mx-auto">
          <div className="mt-12">
            <form
              className="bg-[#4D6A1C] py-12 px-8 rounded-lg"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col">
                <h1 className="text-white text-3xl uppercase">
                  Sign up your account
                </h1>
              </div>
              <div className="grid pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-1">
                  <div>
                    <label
                      htmlFor="school"
                      className="block text-md uppercase text-white p-2"
                    >
                      School
                    </label>
                    <input
                      type="text"
                      name="school"
                      id="school"
                      value={formData.school}
                      onChange={handleChange}
                      className={`py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-black ${
                        errors.school ? "border-red-500" : ""
                      }`}
                    />
                    {errors.school && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.school}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-md uppercase text-white p-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-black ${
                        errors.firstName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="middleName"
                      className="block text-md uppercase text-white p-2"
                    >
                      Middle Name
                    </label>
                    <input
                      type="text"
                      name="middleName"
                      id="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                      className={`py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-black ${
                        errors.middleName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.middleName && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.middleName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-md uppercase text-white p-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-black ${
                        errors.lastName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-md uppercase text-white p-2"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={formData.username}
                      onChange={handleChange}
                      className={`py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-black ${
                        errors.username ? "border-red-500" : ""
                      }`}
                    />
                    {errors.username && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.username}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 pt-4 pb-4">
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-md uppercase text-white p-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-black ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-md uppercase text-white p-2"
                    >
                      Gmail
                    </label>
                    <input
                      type="text"
                      placeholder="@gmail.com"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-black ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 pt-3 mt-3">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="inline-flex justify-center items-center gap-x-3 text-center bg-green-500 hover:bg-green-600 border border-transparent text-sm lg:text-base text-white font-medium rounded-md g-offset-white transition py-3 px-4"
                >
                  Sign Up
                </button>
                <Link
                  to="/login"
                  className="inline-flex justify-center items-center gap-x-3 text-center bg-red-500 hover:bg-red-600 border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
                >
                  Return
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signupuser;
