import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import img from "../assets/img/homebg.png";
import Image from "../assets/img/LoginImage.png";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      initial={{ opacity: 0 }} // Initial state (hidden)
      animate={{ opacity: 1 }} // Animate to fully visible
      exit={{ opacity: 0 }} // Animate out to hidden
      transition={{ duration: 0.5 }}
      id="home"
      className="flex flex-col md:flex-row justify-center items-center md:p-12  md:pr-30  pb-32 md:pb-60  md:pt-0 h-screen"
    >
      <div className="w-full md:w-7/12 justify-center mt-32 items-center flex xl:text-6xl lg:text-4xl md:text-3xl text-4xl text-center md:text-start">
        <p
          ref={ref}
          className="text-[#131111] font-bold xl:leading-[70px] lg:leading-[50px] md:leading-[40px] -tracking-wider  "
        >
          <span
            style={{
              transform: isInView ? "none" : "translateX(-200px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }}
          >
            Learn With us! <br />
            We will teach you how to
          </span>
          <div className="">
            <TypeAnimation
              sequence={[`Learn,`, `Read,`, `Visualize.`, 800, ""]}
              speed={50}
              repeat={Infinity}
            />
          </div>
          <div className="pt-5">
            <button className="py-3 px-3 lg:py-2 lg:px-5 lg:text-4xl text-2xl text-[#131111] font-bold xl:leading-[70px] lg:leading-[50px] md:leading-[40px] -tracking-wider  bg-amber-200 hover:scale-105 duration-300 rounded-full">
              Get started
            </button>
          </div>
        </p>
      </div>
      <img
        src={img}
        className="md:w-6/12 mt-24 pt-20 md:h-[500px] shadow-lg rounded-2xl  lg:h-[600px] "
      ></img>
    </motion.div>
  );
};

export default Home;
