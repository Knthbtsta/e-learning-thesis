import React from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import img from "../assets/img/homepagebg.png";
import img1 from "../assets/img/homepagebg1.png";

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
      className="flex flex-col lg:flex-row justify-center items-center md:p-12  md:pr-30  pb-32 md:pb-60  md:pt-0 h-screen"
    >
      <div className="flex-col w-full md:w-7/12 justify-center px-[10px] sm:px-0 mt-[650px] sm:mt-[850px] md:mt-[800px] lg:mt-[300px] xl:mt-[300px] 2xl:mt-[300px] items-center flex xl:text-6xl lg:text-4xl md:text-3xl text-4xl text-center lg:text-start ">
        <p
          ref={ref}
          className="text-[#EBEBEB] text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold"
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
              speed={20}
              repeat={Infinity}
            />
          </div>
          <div className="pt-5">
            <Link
              to="/Login"
              className="py-3 px-3 lg:py-2 lg:px-5 lg:text-4xl text-2xl text-[#32423B] font-bold xl:leading-[70px] lg:leading-[50px] md:leading-[40px] -tracking-wider  bg-[#41943e]  hover:scale-90 duration-300  rounded-full"
            >
              Get started
            </Link>
          </div>
        </p>
      </div>
      <img
        src={img1}
        className="md:w-6/12 mt-48 pt-20 invisible lg:visible md:h-[500px]  rounded-2xl  lg:h-[600px] "
      ></img>
    </motion.div>
  );
};

export default Home;
