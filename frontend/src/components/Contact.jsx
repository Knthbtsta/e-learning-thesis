import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/img/logo.png";
import contact from "../assets/img/ContactUs1.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    details: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5173/send-email", // Update the endpoint here
        formData
      );
      console.log(response.data);
      // Optionally, show a success message to the user
    } catch (error) {
      console.error("There was an error sending the email!", error);
    }
  };
  return (
    <>
      <div
        id="contact"
        className="flex flex-row justify-center items-center w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto lg:h-screen bg-white"
      >
        <div className="max-w-[85rem] w-full">
          <div className="grid md:grid-cols-2 items-center gap-12">
            <div className="hidden md:flex justify-start">
              <img
                src={contact}
                className="max-w-full h-auto"
                alt="Contact Us"
              />
            </div>

            <div className="relative">
              <div className="flex flex-col border rounded-xl p-4 sm:p-6 lg:p-10 border-gray-700 shadow-lg shadow-amber-700/50 bg-[#4D6A1C]">
                <h2 className="text-xl font-semibold text-[#FFFFFF]">
                  Fill in the form
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mt-6 grid gap-4 lg:gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm text-[#FFFFFF] font-medium"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="py-3 px-4 block w-full text-black border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-[#FFFFFF] dark:border-gray-700"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm text-[#FFFFFF] font-medium"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="py-3 px-4 block w-full text-black border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-[#FFFFFF] dark:border-gray-700"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm text-[#FFFFFF] font-medium"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        className="py-3 px-4 block w-full text-black border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-[#FFFFFF] dark:border-gray-700"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="details"
                        className="block text-sm text-[#FFFFFF] font-medium"
                      >
                        Details
                      </label>
                      <textarea
                        id="details"
                        name="details"
                        rows={4}
                        value={formData.details}
                        onChange={handleChange}
                        className="py-3 px-4 block w-full text-black border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-[#FFFFFF] dark:border-gray-700"
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex">
                    <div className="flex">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="shrink-0 mt-1.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3">
                      <label
                        htmlFor="remember-me"
                        className="text-sm text-[#FFFFFF]"
                      >
                        By submitting this form I have read and acknowledged the{" "}
                        <a
                          className="text-[#FFFFFF] decoration-2 hover:underline font-medium"
                          href="#"
                        >
                          E-learning
                        </a>
                      </label>
                    </div>
                  </div>
                  <div className="mt-6 grid">
                    <button
                      type="submit"
                      className="inline-flex justify-center items-center gap-x-3 text-center bg-[#FFFFFF]  border border-transparent text-sm  lg:text-base text-black font-medium rounded-md py-3 px-4 "
                    >
                      Send inquiry
                    </button>
                  </div>
                </form>
                <div className="mt-3 text-center">
                  <p className="text-sm text-[#FFFFFF]">
                    We'll get back to you in 1-2 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#4D6A1C]">
        <footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <img src={logo} alt="logo" className="h-[100px]" />
            </div>
            <div className="mt-3">
              <p className="text-[#EBEBEB]">
                Thank you for visiting our page{" "}
                <a
                  className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
                  href="#"
                >
                  E-learning
                </a>
                .
              </p>
              <p className="text-[#EBEBEB]">
                © E-Learning. 2023 . All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Contact;
