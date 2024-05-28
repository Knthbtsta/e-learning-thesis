import React from "react";
import logo from "../assets/img/logo.png";

const Contact = () => {
  return (
    <>
      {/* Hire Us */}
      <div
        id="contact"
        className="flex flex-row justify-center items-center w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto lg:h-screen bg-white"
      >
        {/* Grid */}
        <div className="max-w-[85rem] ">
          <div className="grid md:grid-cols-2 items-center gap-12">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl lg:text-7xl lg:leading-tight ">
                Provide a Feedback!!!!
              </h1>
              <p className="mt-1 md:text-lg text-gray-800 ">
                If you have any concerns just fill in the form.
              </p>
            </div>
            {/* End Col */}
            <div className="relative">
              {/* Card */}
              <div className="flex flex-col border rounded-xl p-4 sm:p-6 lg:p-10 border-gray-700 shadow-lg shadow-amber-700/50">
                <h2 className="text-xl font-semibold text-gray-800 ">
                  Fill in the form
                </h2>
                <form>
                  <div className="mt-6 grid gap-4 lg:gap-6">
                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                      <div>
                        <label
                          htmlFor="hs-firstname-hire-us-1"
                          className="block text-sm text-gray-700 font-medium "
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          name="hs-firstname-hire-us-1"
                          id="hs-firstname-hire-us-1"
                          className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-50 bg-orange-300 dark:border-gray-700 "
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="hs-lastname-hire-us-1"
                          className="block text-sm text-gray-700 font-medium "
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="hs-lastname-hire-us-1"
                          id="hs-lastname-hire-us-1"
                          className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-orange-300 dark:border-gray-700 "
                        />
                      </div>
                    </div>
                    {/* End Grid */}
                    <div>
                      <label
                        htmlFor="hs-work-email-hire-us-1"
                        className="block text-sm text-gray-700 font-medium "
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="hs-work-email-hire-us-1"
                        id="hs-work-email-hire-us-1"
                        autoComplete="email"
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-orange-300 dark:border-gray-700 "
                      />
                    </div>
                    {/* Grid */}
                    {/* End Grid */}
                    <div>
                      <label
                        htmlFor="hs-about-hire-us-1"
                        className="block text-sm text-gray-700 font-medium "
                      >
                        Details
                      </label>
                      <textarea
                        id="hs-about-hire-us-1"
                        name="hs-about-hire-us-1"
                        rows={4}
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-orange-300 dark:border-gray-700 "
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  {/* End Grid */}
                  {/* Checkbox */}
                  <div className="mt-3 flex">
                    <div className="flex">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="shrink-0 mt-1.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3">
                      <label
                        htmlFor="remember-me"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        By submitting this form I have read and acknowledged the{" "}
                        <a
                          className="text-blue-600 decoration-2 hover:underline font-medium"
                          href="#"
                        >
                          E-learning
                        </a>
                      </label>
                    </div>
                  </div>
                  {/* End Checkbox */}
                  <div className="mt-6 grid">
                    <button
                      type="submit"
                      className="inline-flex justify-center items-center gap-x-3 text-center bg-cyan-600 hover:bg-cyan-500 border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
                    >
                      Send inquiry
                    </button>
                  </div>
                </form>
                <div className="mt-3 text-center">
                  <p className="text-sm text-gray-500">
                    We'll get back to you in 1-2 business days.
                  </p>
                </div>
              </div>
              {/* End Card */}
            </div>
            {/* End Col */}
          </div>
          {/* End Grid */}
        </div>
        {/* End Hire Us */}
      </div>
      <div className="bg-[#4D6A1C]">
        <footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto ">
          {/* Grid */}
          <div className="text-center ">
            <div className="flex items-center justify-center">
              <img src={logo} alt="logo" className="h-[100px]" />
            </div>
            {/* End Col */}
            <div className="mt-3">
              <p className="text-[#EBEBEB]">
                Thanyou for visiting our page{" "}
                <a
                  className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
                  href="#"
                ></a>{" "}
                E-learning.
              </p>
              <p className="text-[#EBEBEB]">
                © E-Learning. 2023 . All rights reserved.
              </p>
            </div>
            {/* Social Brands */}
            {/* End Social Brands */}
          </div>
          {/* End Grid */}
        </footer>
      </div>
    </>
  );
};

export default Contact;
