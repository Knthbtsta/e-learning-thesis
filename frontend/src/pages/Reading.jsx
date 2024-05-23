import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import phonics images
import phonics1 from "../assets/img/Phonics1.png";
import phonics2 from "../assets/img/Phonics2.png";
import phonics3 from "../assets/img/Phonics3.png";
import phonics4 from "../assets/img/Phonics4.png";
import phonics5 from "../assets/img/Phonics5.png";
import phonics6 from "../assets/img/Phonics6.png";
import phonics7 from "../assets/img/Phonics7.png";
import phonics8 from "../assets/img/Phonics8.png";
import phonics9 from "../assets/img/Phonics8.png";
import phonics10 from "../assets/img/Phonics8.png";
import phonics11 from "../assets/img/Phonics8.png";
import phonics12 from "../assets/img/Phonics8.png";
import phonics13 from "../assets/img/Phonics8.png";
import phonics14 from "../assets/img/Phonics8.png";
import phonics15 from "../assets/img/Phonics8.png";
import phonics16 from "../assets/img/Phonics8.png";
import phonics17 from "../assets/img/Phonics8.png";
import phonics18 from "../assets/img/Phonics8.png";
import phonics19 from "../assets/img/Phonics8.png";
import phonics20 from "../assets/img/Phonics8.png";
import phonics21 from "../assets/img/Phonics8.png";
import phonics22 from "../assets/img/Phonics8.png";
import phonics23 from "../assets/img/Phonics8.png";
import phonics24 from "../assets/img/Phonics8.png";
import phonics25 from "../assets/img/Phonics8.png";
import phonics26 from "../assets/img/Phonics8.png";
import phonics27 from "../assets/img/Phonics8.png";
import phonics28 from "../assets/img/Phonics8.png";
import phonics29 from "../assets/img/Phonics8.png";
// Add other phonics images here...

// Import modal images
import img1 from "../assets/img/Modalpic1.png";
import img2 from "../assets/img/Modalpic2.png";
import img3 from "../assets/img/Modalpic3.png";
import img4 from "../assets/img/Modalpic4.png";
import img5 from "../assets/img/Modalpic5.png";
import img6 from "../assets/img/Modalpic6.png";
import img7 from "../assets/img/Modalpic7.png";
import img8 from "../assets/img/Modalpic8.png";
import img9 from "../assets/img/Modalpic9.png";
import img10 from "../assets/img/Modalpic10.png";
import img11 from "../assets/img/Modalpic11.png";
import img12 from "../assets/img/Modalpic12.png";
import img13 from "../assets/img/Modalpic13.png";
import img14 from "../assets/img/Modalpic14.png";
import img15 from "../assets/img/Modalpic15.png";
import img16 from "../assets/img/Modalpic16.png";
import img17 from "../assets/img/Modalpic17.png";
import img18 from "../assets/img/Modalpic18.png";
import img19 from "../assets/img/Modalpic19.png";
import img20 from "../assets/img/Modalpic20.png";
import img21 from "../assets/img/Modalpic21.png";
import img22 from "../assets/img/Modalpic22.png";
import img23 from "../assets/img/Modalpic23.png";
import img24 from "../assets/img/Modalpic24.png";
import img25 from "../assets/img/Modalpic25.png";
import img26 from "../assets/img/Modalpic26.png";
import img27 from "../assets/img/Modalpic27.png";
import img28 from "../assets/img/Modalpic28.png";
import img29 from "../assets/img/Modalpic29.png";
// Add other modal images here...

const phonicsImages = [
  phonics1,
  phonics2,
  phonics3,
  phonics4,
  phonics5,
  phonics6,
  phonics7,
  phonics8,
  phonics9,
  phonics10,
  phonics11,
  phonics12,
  phonics13,
  phonics14,
  phonics15,
  phonics16,
  phonics17,
  phonics18,
  phonics19,
  phonics20,
  phonics21,
  phonics22,
  phonics23,
  phonics24,
  phonics25,
  phonics26,
  phonics27,
  phonics28,
  phonics29,
]; // Add other phonics images here...
const modalImages = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
  img21,
  img22,
  img23,
  img24,
  img25,
  img26,
  img27,
  img28,
  img29,
]; // Add other modal images here...
const phonicsLetters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]; // Add other phonics letters here...

const Reading = () => {
  const [read, setRead] = useState({
    title: "",
    images: "",
    buttonText: "",
    photos: [],
  });
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0); // Maintain current letter index state
  const sliderRef = useRef(null); // Create a reference for the slider
  const EmptyArrow = () => null;

  const handleClick = (item, index) => {
    setRead(item);
    setCurrentLetterIndex(index); // Update current letter index when a phonics item is clicked
  };

  const handleNextWord = () => {
    const nextIndex = (currentLetterIndex + 1) % phonicsImages.length; // Calculate the next letter index
    setCurrentLetterIndex(nextIndex); // Update current letter index
    setRead({
      ...read,
      images: phonicsImages[nextIndex],
      photos: modalImages.slice(nextIndex, nextIndex + 2),
    }); // Update modal content
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <EmptyArrow />, // Remove the left button
    nextArrow: <EmptyArrow />, // Remove the right button
  };
  
  const readingItems = phonicsImages.map((image, index) => ({
    title: `PHONICS ${phonicsLetters[index]} WORD`, // Dynamically generate the title
    images: image,
    buttonText: "View More",
    photos: modalImages.slice(index, index + 2), // Adjust the slice range as needed
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[url('/bgreading.png')] bg-no-repeat bg-cover shadow-lg pb-32"
    >
      <div className="flex flex-col justify-center items-center text-center">
        <div className="p-10 text-2xl md:text-3xl lg:text-5xl xl:text-7xl px-20 rounded-l-[50%] rounded-r-[50%] tracking-widest font-bold bg-gradient-to-br from-teal-500 via-sky-400 to-sky-700">
          <h1 className="animate">READING MATERIALS</h1>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-[370px] bg-gradient-to-br from-teal-500 via-sky-400 to-sky-700 py-3 px-10 rounded-md text-center  mx-14 mt-12 text-2xl md:text-3xl lg:text-5xl">
        <h1>EASY LEVEL</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center text-center">
        {readingItems.map((item, index) => (
          <div
            key={index}
            className="mx-16 pb-10 bg-gradient-to-br from-teal-500 via-sky-400 to-sky-700 mt-10 h-[25rem] w-[350px] rounded-t-[10%] rounded-b-[10%]  shadow-md hover:shadow-amber-200 text-2xl md:text-3xl lg:text-5xl tracking-widest"
          >
            <p className="mt-5">{item.title}</p>
            <img
              src={item.images}
              className="mt-5 mx-6 rounded-b-[50%] rounded-t-[3%] h-[10rem] w-[300px] shadow-md rounded-md bg-amber-100"
              alt={`Image ${index}`}
            />
            <button
              onClick={() => handleClick({ ...item }, index)}
              type="button"
              className="bg-gradient-to-br from-teal-700 via-sky-400 to-sky-700 hover:bg-gradient-to-bl mx-24 rounded-full py-3 px-4 text-2xl mt-6"
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
          <div className="bg-cyan-600 rounded-xl shadow-sm pointer-events-auto">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h2 className="block text-5xl mt-5">{`PHONICS ${phonicsLetters[currentLetterIndex]} WORD`}</h2>
                <div className="mt-6 shadow-md border-2 border-amber-200">
                  <Slider ref={sliderRef} {...settings}>
                    {read.photos.map((image, index) => (
                      <div key={index}>
                        <img src={image} alt={`Slide ${index + 1}`} />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
            {/* Footer */}
            <div className="flex justify-end items-center gap-x-2 p-4 sm:px-7">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
                onClick={handleNextWord}
              >
                Next Word
              </button>
            </div>
            {/* End Footer */}
          </div>
        </div>
      </div>
      {/* END MODAL */}
      <div className="flex flex-col items-start fixed bottom-0 left-0 mb-10 ml-10 font-bold tracking-widest">
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
