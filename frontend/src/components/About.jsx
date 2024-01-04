import React from "react";
import img1 from "../assets/img/reading.png";
import img2 from "../assets/img/sounds.png";
import img3 from "../assets/img/activities.png";
import { Link } from "react-router-dom";
import Navbar2 from "./Navbar2";

const About = () => {
  return (
    <div>
      <Navbar2/>
      <div
        id="hs-sign-out-alert-small-window"
        className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-xs sm:w-full m-3 sm:mx-auto">
          <div className="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-gray-800">
            <div className="absolute top-2 end-2">
              <button
                type="button"
                className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-sign-out-alert-small-window"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 sm:p-10 text-center overflow-y-auto">
              {/* Icon */}
              <span className="mb-4 inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500 dark:bg-yellow-700 dark:border-yellow-600 dark:text-yellow-100">
                <svg
                  className="flex-shrink-0 w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </span>
              {/* End Icon */}
              <h3 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-200">
                Sign out
              </h3>
              <p className="text-gray-500">
                Are you sure you would like to sign out of your Preline account?
              </p>
              <div className="mt-6 grid gap-y-2">
                <Link
                  className="py-2.5 px-4 w-full inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                  to="/login"
                  type="button"
                  data-hs-overlay="#hs-sign-out-alert-small-window"
                  onClick={() => {
                    document.getElementById("hs-overlay").hidden;
                  }}
                >
                  Sign out
                </Link>
                <button
                  type="button"
                  className="py-2.5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  data-hs-overlay="#hs-sign-out-alert-small-window"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="about"
        className="sm:h-screen flex flex-col items-center justify-center text-center xl:h-full bg-orange-100 "
      >
        <div className="text-black text-4xl uppercase font-bold text-center leading-[4rem] md:text-5xl xl:text-7xl md:p-5 md:tracking-wide md:leading-12 md:text-center md:px-3 xl:pt-[150px] md:pt-10">
          <p>Welcome to Menu</p>
        </div>
        <div className="flex md:flex-col pt-2 pb-1 text-center text-md text-black text-md font-light leading-6  tracking-widest md:text-lg xl:text-3xl xl:w-1/2 xl:pt-10 md:leading-6">
          <p>
            On this page, you will learn how to read and participate in some
            exciting activities!
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center md:p-2 gap-10 md:pt-8 pt-5 md:pb-12 pb-12 xl:p-12 xl:gap-20 group">
          <div className="flex flex-col h-[31rem]  group-hover:scale-[0.85] hover:!scale-100 cursor-pointer text-center text-white font-semi text-2xl md:text-md md:ml-2 md:mr-2  bg-cyan-600 rounded-3xl md:w-[230px] xl:w-[350px]  shadow-lg shadow-amber-600 hover:shadow-amber-500">
            <img
              src={img1}
              alt=""
              className="shadow-lg rounded-b-[550%] rounded-t-[70%]"
            />
            <div className="flex flex-col items-center justify center space-y-12 h-44 py-3 ">
              <p>BOOK MATERIALS </p>
              <p>Come on, Let's Read a book!</p>
              <Link
                to="/reading"
                className="py-3 px-4  inline-flex justifiy-center items-center rounded-3xl border-transparent font-bold transition cursor-pointer hover:-translate-y-1 delay-75 bg-amber-500 hover:bg-amber-600"
              >
                Click here
              </Link>
            </div>
          </div>
          <div className="flex flex-col h-[31rem]  group-hover:scale-[0.85] hover:!scale-100 cursor-pointer  text-center text-white font-semi text-2xl md:text-md md:ml-2 md:mr-2  bg-cyan-600 rounded-3xl md:w-[230px] xl:w-[350px]  shadow-lg shadow-amber-600 hover:shadow-amber-500">
            <img
              src={img2}
              alt=""
              className="shadow-lg rounded-b-[550%] rounded-t-[70%]"
            />
            <div className="flex flex-col items-center justify center space-y-12 h-44 py-3 ">
              <p>AUDIO WORDS</p>
              <p>Come on, Let's make a sound!</p>
              <Link
                to="/audio"
                className="py-3 px-4  inline-flex justifiy-center items-center rounded-3xl border-transparent font-bold transition cursor-pointer hover:-translate-y-1 delay-75 bg-amber-500 hover:bg-amber-600"
              >
                Click here
              </Link>
            </div>
          </div>
          <div className="flex flex-col h-[31rem]  group-hover:scale-[0.85] hover:!scale-100 cursor-pointer text-center text-white font-semi text-2xl md:text-md md:ml-2 md:mr-2  bg-cyan-600 rounded-3xl md:w-[230px] xl:w-[350px]  shadow-lg shadow-amber-600 hover:shadow-amber-500">
            <img
              src={img3}
              alt=""
              className="shadow-lg rounded-b-[550%] rounded-t-[70%]"
            />
            <div className="flex flex-col items-center justify center space-y-12 h-44 py-3 ">
              <p>ACTIVITIES</p>
              <p>Come on, Let's have a quiz!</p>
              <Link
                to="/activitycontents"
                className="py-3 px-4   inline-flex justifiy-center items-center rounded-3xl border-transparent font-bold transition cursor-pointer hover:-translate-y-1 delay-75 bg-amber-500 hover:bg-amber-600"
              >
                Click here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
