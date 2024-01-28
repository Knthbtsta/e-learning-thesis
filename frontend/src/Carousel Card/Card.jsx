import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import levelMap from "../pages/LevelMap";

function Card({
  imagen,
  img,
  dungeonName,
  color,
  link,
  background,
  onCardClick,
  items,
  maxLvl,
}) {
  const [show, setShown] = useState(true);

  const props3 = useSpring({
    // transform: y.interpolate((y) => `translate3d(0, 0, ${y * 100}px)`),
    opacity: 1,
    transform: show
      ? "scale(1.03) translateY(-10px)"
      : "scale(1) translateY(0)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)",
  });

  const props4 = useSpring({
    from: { transform: "translateY(0px)" },
    to: [{ transform: "translateY(40px)" }, { transform: "translateY(0px)" }],
    config: { duration: "1000" },
    loop: true,
  });
  console.log("");

  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={onCardClick}
    >
      <div className=" weather-effect">
        <animated.div
          className="bg-cover bg-center w-[28rem] p-12 "
          style={{
            backgroundImage: `url(${img})`, // Set background image from 'img' prop
            ...props3,
          }}
        >
          <div
            className={`flex flex-col justify-center text-center text-5xl pt-6 ${color}`}
          >
            <h1>{dungeonName}</h1>
          </div>
          <animated.img
            src={imagen}
            alt="Your Image"
            style={show ? props4 : null}
          />
          <div className="flex flex-col justify-center items-center mt-5 pb-5">
            <Link
              to={link}
              state={{ items: items, maxLvl: maxLvl }}
              className={`py-2 px-6 rounded-xl text-4xl tracking-wide transition duration-300 ${
                dungeonName === "Tropical Island"
                  ? "bg-yellow-300 text-white"
                  : dungeonName === "Ice Island"
                  ? "bg-cyan-500 text-white"
                  : dungeonName === "Lava Island"
                  ? "bg-red-700 text-white"
                  : dungeonName === "Space Island"
                  ? "bg-violet-600 text-white"
                  : ""
              }`}
            >
              PLAY
            </Link>
          </div>
        </animated.div>
      </div>
    </div>
  );
}

export default Card;
