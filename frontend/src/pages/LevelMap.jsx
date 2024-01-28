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
          link: "/tropical",
          color: "text-yellow-300",
        };
      case "Ice Island":
        return {
          imagen: level2,
          img: ice,
          link: "/ice",
          color: "text-cyan-500",
        };
      case "Lava Island":
        return {
          imagen: level3,
          img: lava,
          link: "/lava",
          color: "text-red-700",
        };
      case "Space Island":
        return {
          imagen: level4,
          img: space,
          link: "/space",
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
      <header className="absolute top-5 right-10">
        <div className="flex gap-6">
          <Link
            to="/activitycontents"
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
              <button>SIGN OUT</button>
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
