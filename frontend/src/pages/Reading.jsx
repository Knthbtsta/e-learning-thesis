import React, { Children } from "react";
import { useState } from "react";
import phonics1 from "../assets/img/Phonics1.png";
import phonics2 from "../assets/img/Phonics2.png";
import phonics3 from "../assets/img/Phonics3.png";
import phonics4 from "../assets/img/Phonics4.png";
import phonics5 from "../assets/img/Phonics5.png";
import phonics6 from "../assets/img/Phonics6.png";
import phonics7 from "../assets/img/Phonics7.png";
import phonics8 from "../assets/img/Phonics8.png";
import img1 from "../assets/img/Modalpic1.png";
import img2 from "../assets/img/Modalpic2.png";
import img3 from "../assets/img/Modalpic3.png";
import img4 from "../assets/img/Modalpic4.png";
import img5 from "../assets/img/Modalpic5.png";
import img6 from "../assets/img/Modalpic6.png";
import img7 from "../assets/img/Modalpic7.png";
import img8 from "../assets/img/Modalpic8.png";
import img9 from "../assets/img/Modalpic9.png";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

const Reading = () => {
  const [read, setRead] = useState({
    title: "",
    images: "",
    buttonText: "",
    photos: [],
  });
  const handleClick = (item) => {
    setRead(item);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const readingItems = [
    {
      title: "PHONICS",
      images: phonics1,
      buttonText: "View More",
      photos: [img1, img2],
    },
    {
      title: "PHONICS ",
      images: phonics2,
      buttonText: "View More",
      photos: [img3, img4, img5],
    },
    {
      title: "PHONICS",
      images: phonics3,
      buttonText: "View More",
      photos: [img6, img7, img8, img9],
    },
    {
      title: "PHONICS",
      images: phonics4,
      buttonText: "View More",
    },
    {
      title: "PHONICS",
      images: phonics5,
      buttonText: "View More",
    },
    {
      title: "PHONICS",
      images: phonics6,
      buttonText: "View More",
    },
    {
      title: "PHONICS",
      images: phonics7,
      buttonText: "View More",
    },
    {
      title: "PHONICS",
      images: phonics8,
      buttonText: "View More",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[url('/bgreading.png')] bg-no-repeat bg-cover shadow-lg pb-32 "
    >
      <div className="flex flex-col justify-center items-center text-center">
        <div className="p-10 text-2xl md:text-3xl lg:text-5xl xl:text-7xl px-20 rounded-l-[50%] rounded-r-[50%] tracking-widest font-bold bg-gradient-to-br from-teal-500 via-sky-400 to-sky-700">
          <h1 className="animate">READING MATERIALS</h1>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-[370px] bg-gradient-to-br from-teal-500 via-sky-400 to-sky-700 py-3 px-10 rounded-md text-center md:mx-16 lg:mx-16 mx-14 mt-12 text-2xl md:text-3xl lg:text-5xl">
        <h1 className=" ">EASY LEVEL</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  md:mr-12 justify-center items-center text-center">
        {readingItems.map((item, index) => (
          <div
            key={index}
            className="mx-16 md:mx-16 lg:mx-16  pb-10 bg-gradient-to-br from-teal-500 via-sky-400 to-sky-700 mt-10 h-[25rem] w-[350px] rounded-t-[10%] rounded-b-[10%]  rounded-2xl  shadow-md hover:shadow-amber-200  text-2xl md:text-3xl lg:text-5xl tracking-widest"
          >
            <p className="mt-5">{item.title}</p>
            <img
              src={item.images}
              className="mt-5 mx-6 rounded-b-[50%] rounded-t-[3%] h-[10rem] w-[300px] shadow-md rounded-md text-black font-bold bg-amber-100"
              alt={`Image ${index}`}
            />
            <button
              onClick={() => handleClick({ ...item })}
              type="button"
              className="bg-gradient-to-br from-teal-700 via-sky-400 to-sky-700 hover:bg-gradient-to-bl mx-24 rounded-full py-3 px-4 text-2xl mt-12"
              data-hs-overlay="#hs-modal-upgrade-to-pro"
            >
              {item.buttonText}
            </button>
          </div>
        ))}
      </div>
      {/* START MODAL */}
      <div
        id="hs-modal-upgrade-to-pro"
        className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="bg-cyan-600  rounded-xl shadow-sm pointer-events-auto  ">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h2 className="block text-5xl mt-5 ">PHONICS A WORD</h2>
                <div className="mt-6 shadow-md border-2   border-amber-200">
                  <Slider {...settings}>
                    {read &&
                      read.photos.map((image, index) => (
                        <div className="" key={index}>
                          <img src={image} alt={`Slide ${index + 1}`} />
                        </div>
                      ))}
                  </Slider>
                </div>
              </div>
            </div>
            {/* Footer */}
            <div className="flex justify-end items-center gap-x-2 p-4 sm:px-7 ">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-notifications"
              >
                Next Word
              </button>
            </div>
            {/* End Footer */}
          </div>
        </div>
      </div>
      {/* END MODAL */}
      <div className="flex flex-col items-start fixed bottom-0 left-0 mt-12 mb-10 ml-10 font-bold tracking-widest">
        <Link
          to="/#about"
          className="px-5 py-4 bg-gradient-to-br from-teal-700 via-sky-400 to-sky-700 hover:bg-gradient-to-bl rounded-full"
        >
          BACK TO PAGE
        </Link>
      </div>

      <div className="flex flex-col items-end fixed bottom-0 right-0 mb-10 mr-10 font-bold tracking-widest">
        <Link
          to="/phonics"
          className="px-5 py-4 bg-gradient-to-br from-teal-700 via-sky-400 to-sky-700 hover:bg-gradient-to-bl rounded-full"
        >
          NEXT PAGE
        </Link>
      </div>
    </motion.div>
  );
};

export default Reading;
