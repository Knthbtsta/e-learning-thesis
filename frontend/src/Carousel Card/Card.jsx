import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Card({
  imagen,
  img,
  dungeonName,
  color,
  link,
  background,
  onCardClick,
  items,
  showNavigation,
  onPrevClick,
  onNextClick,
}) {
  const [show, setShown] = useState(true);
  const [buttonColors, setButtonColors] = useState(
    items.map(() => generateRandomColor())
  );

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
    config: { duration: 1000 },
    loop: true,
  });

  function generateRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  function handlePlayButtonClick(index) {
    const newButtonColors = [...buttonColors];
    newButtonColors[index] = generateRandomColor();
    setButtonColors(newButtonColors);
  }

  return (
    <div
      className="relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={onCardClick}
    >
      {showNavigation && (
        <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
          <button onClick={onPrevClick}>
            <FaArrowLeft />
          </button>
        </div>
      )}
      {showNavigation && (
        <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
          <button onClick={onNextClick}>
            <FaArrowRight />
          </button>
        </div>
      )}
      <div className="">
        <animated.div
          className="bg-cover bg-centershadow-lg rounded-4xl border-2 border-[#e9dfb2] w-[15rem]  sm:w-[20rem] md:w-[30rem] "
          style={{ backgroundImage: `url(${img})`, ...props3 }}
        >
          <animated.img
            src={imagen}
            alt="Your Image"
            style={show ? props4 : null}
          />
          <div className="flex flex-col justify-center rounded-xl items-center  mt-4 pt-6 pb-4">
            {items.map((item, index) => (
              <Link
                to={link}
                state={{ item }}
                key={index}
                className={`py-2 px-4 sm:px-6 md:px-8 rounded-xl mt-4 sm:mt-8 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-wide transition transform hover:scale-105 duration-300 ${
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
                style={{ backgroundColor: buttonColors[index] }}
                onClick={() => handlePlayButtonClick(index)}
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
