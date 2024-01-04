import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const Signupuser = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    section: "",
    firstName: "",
    middleName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const obj = {
      user_id: formData.user_id,
      section: formData.section,
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      username: formData.username,
      password: formData.password,
      email: formData.email,
      type: "client",
    };
    try {
      const response = await fetch("http://localhost:8800/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      console.log(response);

      if (response.ok) {
        console.log("User created successfully");
        // Redirect or perform other actions as needed
      } else {
        console.error("Failed to create user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="bg-[url('/background2.png')]  sm:h-screen   bg-no-repeat bg-cover">
      <>
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="max-w-xl mx-auto">
            <div className="mt-12">
              <form
                className="bg-cyan-600 py-12 px-8 rounded-lg"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col">
                  <h1 className="text-white text-3xl uppercase">
                    Sign up your account
                  </h1>
                </div>
                <div className="grid gap-4 lg:gap-6 pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    <div>
                      <label
                        htmlFor="user_id"
                        className="block text-md uppercase text-white p-2"
                      >
                        Student Number
                      </label>
                      <input
                        type="text"
                        name="user_id"
                        id="user_id"
                        value={formData.user_id}
                        onChange={handleChange}
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-black"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="section"
                        className="block text-md uppercase text-white p-2"
                      >
                        Section
                      </label>
                      <input
                        type="text"
                        name="section"
                        id="section"
                        value={formData.section}
                        onChange={handleChange}
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-black"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
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
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-black"
                      />
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
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-black"
                      />
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
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-black"
                      />
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
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-black"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
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
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-black"
                      />
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
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm text-black"
                      />
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
      </>
    </section>
  );
};

export default Signupuser;
