import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaBookOpen } from "react-icons/fa";
import { MdOutlineQuiz } from "react-icons/md";
import { useSpring, animated } from "react-spring";
import { FaQuestionCircle } from "react-icons/fa";
import axios from "axios"; // Import axios for API calls
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion for animations
import { config } from "react-spring";
import level1 from "../assets/img/Level1Map.png";
import level2 from "../assets/img/Level2Map.png";
import level3 from "../assets/img/Level3Map.png";
import level4 from "../assets/img/Level4Map.png";
import tropical from "../assets/img/tropical.png";
import ice from "../assets/img/ice.png";
import lava from "../assets/img/lava.png";
import space from "../assets/img/space.png";
import Card from "../Carousel Card/Card";
import Carroussel from "../Carousel Card/Carousel";

const LevelMap = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [stages, setStages] = useState([]);
  const [offsetRadius, setOffsetRadius] = useState(4);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(tropical);
  const [selectedType, setSelectedType] = useState("tropical"); // Add this state

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const stagesDetailResponse = await axios.get(
          `http://localhost:8800/api/island/`
        );
        console.log(stagesDetailResponse);
        if (stagesDetailResponse.status === 200) {
          let arr = [];

          stagesDetailResponse.data.map((item, idx) => {
            const { imagen, img, link, color } = returnAssets(item.dungeonName);
            console.log(imagen, img, item.dungeonName);

            arr.push({
              key: item._id,
              content: (
                <Card
                  imagen={imagen}
                  {...item}
                  img={img}
                  link={link}
                  color={color}
                  background={img}
                  onCardClick={() => {
                    setSelectedBackground(img);
                    setSelectedType(item.dungeonName); // Set the selectedType when the card is clicked
                  }}
                />
              ),
            });
          });

          setStages(arr);
        }
      } catch (error) {
        console.error("Error fetching stages:", error.message);
      }
    };

    fetchStages();
  }, [id]);
  console.log("stagesDetail", stages);

  const returnAssets = (dungeonName) => {
    switch (dungeonName) {
      case "Tropical Island":
        return {
          imagen: level1,
          img: tropical,
          link: `/balloongame/?id=${id}`,
          color: "text-yellow-300",
        };
      case "Ice Island":
        return {
          imagen: level2,
          img: ice,
          link: `/ice/?id=${id}`,
          color: "text-cyan-500",
        };
      case "Lava Island":
        return {
          imagen: level3,
          img: lava,
          link: `/lava/?id=${id}`,
          color: "text-red-700",
        };
      case "Space Island":
        return {
          imagen: level4,
          img: space,
          link: `/space/?id=${id}`,
          color: "text-violet-600",
        };
    }
  };

  const table = stages.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${selectedBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
      <header className="absolute top-5 right-10">
        <div className="flex gap-6">
          <Link
            to={`/activitycontents/?id=${id}`}
            className="hover:scale-110 transition duration-500"
            onClick=""
          >
            <MdOutlineQuiz size={40} />
          </Link>
          <div className="hs-dropdown [--trigger:hover]">
            <button
              className="hover:scale-110 transition duration-500 hs-dropdown-toggle"
              type="button"
              id="hs-dropdown-hover-event"
            >
              <CgProfile size={40} />
            </button>
            <div
              className=" grid hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 bg-cyan-600 "
              aria-labelledby="hs-dropdown-hover-event"
            >
              <Link className="" to={`/studentprofile/?id=${id}`}>
                PROFILE
              </Link>
              <Link
              data-hs-overlay="#hs-sign-out-alert-small-window"
              >
                SIGN OUT
                </Link>
            </div>
          </div>
        </div>
      </header>
      <div className=" ">
        <div className="image-container ">
          <h1
            className={`text-center font-bold text-7xl tracking-wide pt-12 ${
              selectedType === "Tropical Island"
                ? "text-yellow-300 "
                : selectedType === "Ice Island"
                ? "text-cyan-500 "
                : selectedType === "Lava Island"
                ? "text-red-700 "
                : selectedType === "Space Island"
                ? "text-violet-600 "
                : ""
            }`}
          >
            WELCOME TO DUNGEON
          </h1>
        </div>
        <div className="absolute bottom-5 left-5">
          <div className="">
            <Link
              to={`/reading/?id=${id}`}
              className={` ${
                selectedType === "Tropical Island"
                  ? "bg-yellow-300 "
                  : selectedType === "Ice Island"
                  ? "bg-cyan-500 "
                  : selectedType === "Lava Island"
                  ? "bg-red-700 "
                  : selectedType === "Space Island"
                  ? "bg-violet-600 "
                  : ""
              }`}
            >
              <FaBookOpen
                size={40}
                className={`${
                  selectedType === "Tropical Island"
                    ? "text-yellow-300 "
                    : selectedType === "Ice Island"
                    ? "text-cyan-500 "
                    : selectedType === "Lava Island"
                    ? "text-red-700 "
                    : selectedType === "Space Island"
                    ? "text-violet-600 "
                    : ""
                }`}
              />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-5 left-20">
          <div>
            <Link to={`/reading/?id=${id}`}>
              <FaQuestionCircle
                size={40}
                className={`${
                  selectedType === "Tropical Island"
                    ? "text-yellow-300 "
                    : selectedType === "Ice Island"
                    ? "text-cyan-500 "
                    : selectedType === "Lava Island"
                    ? "text-red-700 "
                    : selectedType === "Space Island"
                    ? "text-violet-600 "
                    : ""
                }`}
              />
            </Link>
          </div>
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-10 levels">
        {Stages.map((stage, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.2 }}
            className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mx-16 centered level-container ${stage.type}`}
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
              <motion.p variants={item} className="relative text-2xl font-bold">
                {stage.text}
              </motion.p>
            </Link>
          </motion.div>
        ))}
      </div> */}

        <div className="flex justify-center items-center h-[100%]">
          {stages.length > 0 && (
            <Carroussel
              cards={stages.length > 0 ? stages : []}
              height="830px"
              width="50%"
              margin="0 auto"
              offset={200}
              showArrows={false}
              selectedBackground={selectedBackground}
            />
          )}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default LevelMap;
