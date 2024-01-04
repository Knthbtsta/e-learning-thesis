import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import level1 from "../assets/img/Level1Map.png";
import level2 from "../assets/img/Level2Map.png";
import level3 from "../assets/img/Level3Map.png";
import level4 from "../assets/img/Level4Map.png";
import Navbar2 from "../components/Navbar2";
import { useSearchParams } from "react-router-dom";
const LevelMap = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [formdata, setFormData] = useState({
    dungeonName: "",
    difficulty: "",
    maxLvl: "",
    items: [
      {
        lvl: "",
        maxWords: "",
        words: "",
      },
    ],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const obj = {
      dungeonName: "Tropical Island, Ice Island, Lava Island, Tropical Island",
      difficulty: formData.difficulty,
      maxLvl: formData.maxLvl,
      items: [
        {
          lvl: formData.lvl,
          maxWords: formData.maxWords,
          words: formData.words,
        },
      ],
    };
  };

  useEffect(() => {
    const levelsContainer = document.querySelector(".levels");
    levelsContainer.classList.add("centered");
  }, []);

  const imageContainer = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const Stages = [
    {
      type: "tropical",
      photo: level1,
      text: "Tropical Island",
      link: "/tropical",
    },
    {
      type: "ice",
      photo: level2,
      text: "Ice Island",
      link: "/ice",
    },
    {
      type: "lava",
      photo: level3,
      text: "Lava Island",
      link: "/lava",
    },
    {
      type: "space",
      photo: level4,
      text: "Space Island",
      link: "/space",
    },
  ];

  return (
<div>
  <Navbar2 id={id}/>
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
    <div className="bg-cyan-600">
      <div className="image-container bg-cyan-600">
        <h1 className="text-center font-bold text-5xl tracking-widest pt-[100px]">
          STAGE LEVELS
        </h1>
        <motion.div
          variants={imageContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-10 levels"
        >
          {Stages.map((stage, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.2 }}
              className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mx-12 centered level-container ${stage.type}`}
            >
              <Link to={stage.link}>
                <motion.div variants={item} className="image-container">
                  <div className="weather-effect"></div>
                  <motion.img
                    variants={item}
                    src={stage.photo}
                    className="w-full"
                    alt={stage.text}
                  />
                  <div className="progress-bar"></div>
                </motion.div>
                <motion.p
                  variants={item}
                  className="relative text-2xl font-bold"
                >
                  {stage.text}
                </motion.p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
    </div>
  );
};

export default LevelMap;
