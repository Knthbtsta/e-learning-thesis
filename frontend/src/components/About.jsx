import React from "react";
import img1 from "../assets/img/reading.png";
import img2 from "../assets/img/sounds.png";
import img3 from "../assets/img/activities.png";
import { Link } from "react-router-dom";
import Navbar2 from "./Navbar2";

const About = () => {
  return (
    <div>
      <Navbar2 />
      <div
        id="about"
        className="sm:h-full flex flex-col items-center justify-center text-center xl:h-full bg-[url('/JGBG2.png')] bg-cover bg-no-repeat"
      >
        <div className="text-[#EBEBEB] text-4xl uppercase font-bold text-center leading-[4rem] md:text-5xl xl:text-7xl md:p-5 md:tracking-wide md:leading-12 md:text-center px-[50px] pt-[50px] md:px-3 xl:pt-[150px] md:pt-10">
          <p>Welcome to Menu</p>
        </div>
        <div className="flex md:flex-col px-[50px] pt-2 text-center text-md text-[#EBEBEB] text-md font-light leading-6 px-1  tracking-widest md:text-lg xl:text-3xl xl:w-1/2 xl:pt-10 md:leading-6">
          <p>
            On this page, you will learn how to read and participate in some
            exciting activities!
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center m-10 gap-10 md:gap-1 lg:gap-10 pb-12">
          <div className="flex flex-col h-[33rem] md:h-[30rem] lg:h-[34rem] group-hover:scale-[0.85] hover:!scale-100 cursor-pointer text-center text-white font-semi text-2xl md:text-md md:ml-2 md:mr-2  bg-[#2C4840] rounded-3xl md:w-[230px] xl:w-[350px]  shadow-lg shadow-amber-600 hover:shadow-amber-500">
            <img
              src={img1}
              alt=""
              className="shadow-lg rounded-b-[550%] rounded-t-[70%]"
            />
            <div className="flex flex-col items-center justify-center h-[100px] pt-3 px-5">
              <p>BOOK MATERIALS </p>
            </div>
            <div className="flex flex-col items-center justify-center h-[100px] pt-3 px-5">
              <p>Come on, Let's Read a book!</p>
            </div>
            <div className="flex flex-col items-center justify-center h-[100px] pt-3">
              <Link
                to="/reading"
                className="py-3 px-4  inline-flex justifiy-center items-center rounded-3xl border-transparent font-bold transition cursor-pointer hover:-translate-y-1 delay-75 bg-[#6D8D43] hover:bg-amber-600"
              >
                Click here
              </Link>
            </div>
          </div>

          <div className="flex flex-col h-[33rem] md:h-[30rem] lg:h-[34rem] group-hover:scale-[0.85] hover:!scale-100 cursor-pointer text-center text-white font-semi text-2xl md:text-md md:ml-2 md:mr-2  bg-[#2C4840] rounded-3xl md:w-[230px] xl:w-[350px]  shadow-lg shadow-amber-600 hover:shadow-amber-500">
            <img
              src={img2}
              alt=""
              className="shadow-lg rounded-b-[550%] rounded-t-[70%]"
            />
            <div className="flex flex-col items-center justify-center h-[100px] px-5">
              <p>AUDIO WORDS</p>
            </div>
            <div className="flex flex-col items-center justify-center h-[100px] px-5">
              <p>Come on, Let's make a sound!</p>
            </div>
            <div className="flex flex-col items-center justify-center h-[100px]">
              <Link
                to="/audio"
                className="py-3 px-4  inline-flex justifiy-center items-center rounded-3xl border-transparent font-bold transition cursor-pointer hover:-translate-y-1 delay-75 bg-[#6D8D43] hover:bg-amber-600"
              >
                Click here
              </Link>
            </div>
          </div>
          <div className="flex flex-col h-[33rem] md:h-[30rem] lg:h-[34rem] group-hover:scale-[0.85] hover:!scale-100 cursor-pointer text-center text-white font-semi text-2xl md:text-md md:ml-2 md:mr-2  bg-[#2C4840] rounded-3xl md:w-[230px] xl:w-[350px]  shadow-lg shadow-amber-600 hover:shadow-amber-500">
            <img
              src={img3}
              alt=""
              className="shadow-lg rounded-b-[550%] rounded-t-[70%]"
            />
            <div className="flex flex-col items-center justify-center h-[100px] pt-3 px-5">
              <p>ACTIVITIES</p>
            </div>
            <div className="flex flex-col items-center justify-center h-[100px] pt-3 px-5">
              <p>Come on, Let's have a quiz!</p>
            </div>
            <div className="flex flex-col items-center justify-center h-[100px] pt-3">
              <Link
                to="/activitycontents"
                className="py-3 px-4   inline-flex justifiy-center items-center rounded-3xl border-transparent font-bold transition cursor-pointer hover:-translate-y-1 delay-75 bg-[#6D8D43] hover:bg-amber-600"
              >
                Click here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
