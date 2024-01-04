
import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import API_LINK from "../API";
import Navbar from "../components/Navbar";
import { useSearchParams } from "react-router-dom";
const ActivityContents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [all, setAll] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${API_LINK}/Quiz/`);

      setAll(res.data);
    };

    fetchData();
    
  }, []);
  const navigate = useNavigate();

  const handleTakeQuiz = (selectedItem) => {
    navigate(`/act/?quiz_id=${selectedItem._id}`);
    console.log(selectedItem._id)
    
  };
  return (
    
    <div className="bg-[url('/background2.png')] h-screen bg-no-repeat bg-cover">
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
              onClick={()=>{
                document.getElementById("hs-overlay").hidden
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
    {/* Card Blog */}
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-[150px] mx-auto">
      {/* Grid */}
      <div className="text-black text-4xl pb-[50px] uppercase font-bold text-center md:text-5xl xl:text-7xl md:text-center  ">
        <p>CHOOSE YOUR LETTER CATEGORY</p>
      </div>
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map over each data item and create a card for it */}
        {all.map((item, idx) => (
          <div key={idx} className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="p-4 md:p-6">
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
                {item.title}
              </p>
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
                {item.category}
              </p>
              <span className="mt-3 text-gray-500">
                ITEMS: {item.totalitems}
              </span>
            </div>
            <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <button
                onClick={() => handleTakeQuiz(item)}
                className=" bg-green-500 hover:bg-green-600 w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl text-gray-800 shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1"
                href="#"
              >
                Take Quiz
              </button>
            </div>
          </div>
        ))}
        {/* End Map */}
      </div>
      {/* End Grid */}
    </div>
    {/* End Card Blog */}
  </div>
  
  )
}

export default ActivityContents