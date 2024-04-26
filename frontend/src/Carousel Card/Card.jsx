import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useLocation } from "react-router-dom";
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
      <div className="">
        <animated.div
          className="bg-cover bg-center shadow-lg rounded-2xl border-2 border-[#e9dfb2] md:w-[25rem] sm:w-full p-8 md:p-12 "
          style={{
            backgroundImage: `url(${img})`,
            ...props3,
          }}
        >
          <div
            className={`flex flex-col justify-center text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl pt-8 ${color}`}
          ></div>
          <animated.img
            src={imagen}
            alt="Your Image"
            style={show ? props4 : null}
          />
          <div className="flex flex-col justify-center items-center mt-4 pt-6 pb-4">
            {items.map((item, index) => (
              <Link
                to={link}
                state={{ item: item }}
                key={index}
                className={`py-2 px-4 sm:px-6 md:px-8 rounded-xl mt-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-4xl tracking-wide transition hover:scale-105 duration-300 ${
                  dungeonName === "Aa"
                    ? "bg-yellow-300 text-white"
                    : dungeonName === "Bb"
                    ? "bg-cyan-500 text-white"
                    : dungeonName === "Cc"
                    ? "bg-red-700 text-white"
                    : dungeonName === "Dd"
                    ? "bg-violet-600 text-white"
                    : ""
                }`}
              >
                PLAY
              </Link>
            ))}
          </div>
        </animated.div>
      </div>
    </div>
  );
}

export default Card;
