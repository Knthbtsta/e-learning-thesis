import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaBookOpen } from "react-icons/fa";
import { MdOutlineQuiz } from "react-icons/md";
import { useSpring, animated } from "react-spring";
import { FaQuestionCircle } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios"; // Import axios for API calls
import { useSearchParams } from "react-router-dom";
import ape from "../assets/img/Aa.png";
import apebg from "../assets/img/abg.png";
import ball from "../assets/img/Bb.png";
import ballbg from "../assets/img/bbg.png";
import cat from "../assets/img/Cc.png";
import catbg from "../assets/img/cbg.png";
import duck from "../assets/img/Dd.png";
import duckbg from "../assets/img/dbg.png";
import elephant from "../assets/img/Ee.png";
import elephantbg from "../assets/img/ebg.png";
import fox from "../assets/img/Ff.png";
import foxbg from "../assets/img/fbg.png";
import goldfish from "../assets/img/Gg.png";
import goldfishbg from "../assets/img/gbg.png";
import horse from "../assets/img/Hh.png";
import horsebg from "../assets/img/hbg.png";
import ibex from "../assets/img/Ii.png";
import jeopard from "../assets/img/Jj.png";
import jeopardbg from "../assets/img/jbg.png";
import kangaroo from "../assets/img/Kk.png";
import kangaroobg from "../assets/img/kbg.png";
import lion from "../assets/img/Ll.png";
import lionbg from "../assets/img/lbg.png";
import mouse from "../assets/img/Mm.png";
import mousebg from "../assets/img/mbg.png";
import nest from "../assets/img/Nn.png";
import nestbg from "../assets/img/nbg.png";
import orange from "../assets/img/Oo.png";
import orangebg from "../assets/img/obg.png";
import pen from "../assets/img/Pp.png";
import penbg from "../assets/img/pbg.png";
import quail from "../assets/img/Qq.png";
import quailbg from "../assets/img/qbg.png";
import rose from "../assets/img/Rr.png";
import rosebg from "../assets/img/rbg.png";
import snake from "../assets/img/Ss.png";
import snakebg from "../assets/img/sbg.png";
import turtle from "../assets/img/Tt.png";
import turtlebg from "../assets/img/tbg.png";
import umbrella from "../assets/img/Uu.png";
import umbrellabg from "../assets/img/ubg.png";
import vase from "../assets/img/Vv.png";
import vasebg from "../assets/img/vbg.png";
import wheel from "../assets/img/Ww.png";
import wheelbg from "../assets/img/wbg.png";
import xantis from "../assets/img/Xx.png";
import xantisbg from "../assets/img/xbg.png";
import yak from "../assets/img/Yy.png";
import yakbg from "../assets/img/ybg.png";
import zebra from "../assets/img/Zz.png";
import zebrabg from "../assets/img/zbg.png";
import Card from "../Carousel Card/Card";
import Carroussel from "../Carousel Card/Carousel";
import backgroundAudio from "../assets/music/backgroundmusic.mp3";

const LevelMap = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [stages, setStages] = useState([]);
  const [offsetRadius, setOffsetRadius] = useState(4);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(apebg);
  const [selectedType, setSelectedType] = useState("Aa"); // Add this state
  const audioRef = useRef(null);
  useEffect(() => {
    const fetchStages = async () => {
      try {
        const stagesDetailResponse = await axios.get(
          `https://e-learning-thesis-tupm.onrender.com/api/island/`
        );
        console.log(stagesDetailResponse);
        if (stagesDetailResponse.status === 200) {
          let arr = [];

          stagesDetailResponse.data.map((item, idx) => {
            const assets = returnAssets(item.dungeonName);

            if (assets && assets.imagen) {
              // Only push to arr if 'imagen' property exists
              arr.push({
                key: item._id,
                content: (
                  <Card
                    imagen={assets.imagen}
                    {...item}
                    img={assets.img}
                    link={assets.link}
                    color={assets.color}
                    background={assets.img}
                    onCardClick={() => {
                      setSelectedBackground(assets.img);
                      setSelectedType(item.dungeonName);
                    }}
                  />
                ),
              });
            }
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
      case "Aa":
        return {
          img: apebg,
          imagen: ape,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-yellow-300",
        };
      case "Bb":
        return {
          img: ballbg,
          imagen: ball,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-cyan-500",
        };
      case "Cc":
        return {
          img: catbg,
          imagen: cat,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-red-700",
        };
      case "Dd":
        return {
          img: duckbg,
          imagen: duck,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
      case "Ee":
        return {
          img: elephantbg,
          imagen: elephant,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
      case "Ff":
        return {
          img: foxbg,
          imagen: fox,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
      case "Gg":
        return {
          img: goldfishbg,
          imagen: goldfish,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
      case "Hh":
        return {
          img: horsebg,
          imagen: horse,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
      case "Ii":
        return {
          img: goldfishbg,
          imagen: ibex,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
      case "Jj":
        return {
          img: jeopardbg,
          imagen: jeopard,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
      case "Kk":
        return {
          img: kangaroobg,
          imagen: kangaroo,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
      case "Ll":
        return {
          img: lionbg,
          imagen: lion,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
      case "Mm":
        return {
          img: mousebg,
          imagen: mouse,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
      case "Nn":
        return {
          img: nestbg,
          imagen: nest,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
      case "Oo":
        return {
          img: orangebg,
          imagen: orange,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
      case "Pp":
        return {
          img: penbg,
          imagen: pen,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
      case "Qq":
        return {
          img: quailbg,
          imagen: quail,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
      case "Rr":
        return {
          img: rosebg,
          imagen: rose,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
      case "Ss":
        return {
          img: snakebg,
          imagen: snake,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
      case "Tt":
        return {
          img: turtlebg,
          imagen: turtle,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
      case "Uu":
        return {
          img: umbrellabg,
          imagen: umbrella,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
      case "Vv":
        return {
          img: vasebg,
          imagen: vase,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
      case "Ww":
        return {
          img: wheelbg,
          imagen: wheel,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
      case "Xx":
        return {
          img: xantisbg,
          imagen: xantis,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
      case "Yy":
        return {
          img: yakbg,
          imagen: yak,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
      case "Zz":
        return {
          img: zebrabg,
          imagen: zebra,
          link: `/balloongame/?id=${id}&dungeonName=${dungeonName}`,
          color: "text-violet-600",
        };
    }
    console.log(dungeonName);
  };

  const handlePrev = () => {
    setGoToSlide((prev) => (prev === 0 ? stages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setGoToSlide((prev) => (prev === stages.length - 1 ? 0 : prev + 1));
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

  const generateRandomColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.02;
      audio.play();
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  return (
    <div
      className="sm:min-h-screen "
      style={{
        backgroundImage: `url(${selectedBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <audio ref={audioRef} src={backgroundAudio} loop />

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
      <header className="top-5 pr-10 pt-5">
        {" "}
        {/* Add fixed width */}
        <div className="flex flex-row gap-6 justify-end  text-black">
          <Link
            to={`/reading/?id=${id}`}
            className="hover:scale-110 transition duration-500"
            onClick=""
          >
            <FaBookOpen className="text-[35px] lg:text-[40px]" />
          </Link>
          <Link
            to={`/activitycontents/?id=${id}`}
            className="hover:scale-110 transition duration-500"
            onClick=""
          >
            <MdOutlineQuiz className="text-[35px] lg:text-[40px]" />
          </Link>
          <div className="hs-dropdown [--trigger:hover]">
            <button
              className="hover:scale-110 transition duration-500 hs-dropdown-toggle"
              type="button"
              id="hs-dropdown-hover-event"
            >
              <CgProfile className="text-[35px] lg:text-[40px]" />
            </button>
            <div
              className="flex flex-col justify-center items-center text-center rounded-lg hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 bg-cyan-600 absolute"
              style={{
                top: "-50%",
                left: "50%",
                transform: "translate(-50%, -100%)",
              }}
              aria-labelledby="hs-dropdown-hover-event"
            >
              <Link className="" to={`/studentprofile/?id=${id}`}>
                PROFILE
              </Link>
              <Link data-hs-overlay="#hs-sign-out-alert-small-window">
                SIGN OUT
              </Link>
              <Link className="" to={`/leaderboards/?id=${id}`}>
                LEADERBOARDS
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className=" ">
        <div className="flex flex-col justify-center pt-10 lg:pt-0 items-center ">
          <h1
            className={`text-center font-bold sm:text-7xl text-4xl mt-2  tracking-wide lg:pt-16`}
            style={{
              color:
                selectedType === "Tropical Island"
                  ? "#FFD700" // Yellow color for Tropical Island
                  : selectedType === "Ice Island"
                  ? "#00FFFF" // Cyan color for Ice Island
                  : selectedType === "Lava Island"
                  ? "#FF0000" // Red color for Lava Island
                  : selectedType === "Space Island"
                  ? "#8A2BE2" // Violet color for Space Island
                  : generateRandomColor(), // Use generateRandomColor for other cases
            }}
          >
            CHOOSE A LETTER
          </h1>
          {stages.length > 0 && (
            <Carroussel
              className="md:min-w-screen shadow-lg "
              cards={stages.length > 0 ? stages : []}
              height="850px"
              width="100%"
              margin="0 auto"
              offset={200}
              showArrows={false}
            />
          )}

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default LevelMap;
