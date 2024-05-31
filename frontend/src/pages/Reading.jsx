import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
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
import phonics9 from "../assets/img/Phonics9.png";
import phonics10 from "../assets/img/Phonics10.png";
import phonics11 from "../assets/img/Phonics11.png";
import phonics12 from "../assets/img/Phonics12.png";
import phonics13 from "../assets/img/Phonics13.png";
import phonics14 from "../assets/img/Phonics14.png";
import phonics15 from "../assets/img/Phonics15.png";
import phonics16 from "../assets/img/Phonics16.png";
import phonics17 from "../assets/img/Phonics17.png";
import phonics18 from "../assets/img/Phonics18.png";
import phonics19 from "../assets/img/Phonics19.png";
import phonics20 from "../assets/img/Phonics20.png";
import phonics21 from "../assets/img/Phonics21.png";
import phonics22 from "../assets/img/Phonics22.png";
import phonics23 from "../assets/img/Phonics23.png";
import phonics24 from "../assets/img/Phonics24.png";
import phonics25 from "../assets/img/Phonics25.png";
import phonics26 from "../assets/img/Phonics26.png";

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
];

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
];

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
];

const Reading = () => {
  const [read, setRead] = useState({
    title: "",
    images: "",
    buttonText: "",
    photos: [],
  });
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(0);
  const sliderRef = useRef(null);
  const EmptyArrow = () => null;

  const handleClick = (item, index) => {
    setRead(item);
    setCurrentLetterIndex(index);
    document
      .getElementById("hs-modal-upgrade-to-pro")
      .classList.add("hs-overlay-open");
  };

  const handleNextWord = () => {
    const nextIndex = (currentLetterIndex + 1) % phonicsLetters.length;
    setCurrentLetterIndex(nextIndex);
    setRead({
      title: `PHONICS ${phonicsLetters[nextIndex]} WORD`,
      images: phonicsImages[nextIndex],
      buttonText: "View More",
      photos: [modalImages[nextIndex]],
    });

    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  };

  const handlePrevWord = () => {
    const prevIndex =
      (currentLetterIndex - 1 + phonicsLetters.length) % phonicsLetters.length;
    setCurrentLetterIndex(prevIndex);
    setRead({
      title: `PHONICS ${phonicsLetters[prevIndex]} WORD`,
      images: phonicsImages[prevIndex],
      buttonText: "View More",
      photos: [modalImages[prevIndex]],
    });

    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  };

  const handleNextGroup = () => {
    setCurrentGroup((currentGroup + 1) % Math.ceil(phonicsLetters.length / 4));
  };

  const handlePrevGroup = () => {
    setCurrentGroup(
      (currentGroup - 1 + Math.ceil(phonicsLetters.length / 4)) %
        Math.ceil(phonicsLetters.length / 4)
    );
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <EmptyArrow />,
    nextArrow: <EmptyArrow />,
  };

  const readingItems = phonicsLetters.map((letter, index) => {
    return {
      title: `PHONICS ${letter} WORD`,
      images: phonicsImages[index],
      buttonText: "View More",
      photos: [modalImages[index]],
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[url('/bgreading1.png')]    bg-no-repeat bg-cover shadow-lg pb-32"
    >
      <div className="flex flex-col justify-center items-center text-center">
        <div className="p-2 text-3xl md:text-4xl lg:text-5xl xl:text-7xl px-2 mt-12 tracking-widest font-bold bg-gradient-to-br from-[#318D40] via-[#74B73F] to-[#93B414]">
          <h1 className="animate text-[#E8F6F5]">READING MATERIALS</h1>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentGroup}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1  md:grid-cols-2 lg:grid lg:grid-cols-3  xl:grid-cols-4 pt-24 items-center text-center"
        >
          {readingItems
            .slice(currentGroup * 4, (currentGroup + 1) * 4)
            .map((item, index) => (
              <div
                key={index}
                className="mx-36 sm:mx-36 md:mx-16 lg:mx-4 xl:mx-12  pb-10 bg-gradient-to-br from-[#318D40] via-[#74B73F] to-[#93B414] mt-10 sm:h-[28rem] w-[350px] rounded-t-[10%] rounded-b-[10%] shadow-md hover:shadow-amber-200 text-2xl md:text-3xl lg:text-5xl tracking-widest"
              >
                <p className="mt-4 pt-12 md:text-4xl ">{item.title}</p>
                <img
                  src={item.images}
                  className="mt-10 md:mt-6 mx-6 rounded-b-[10%] rounded-t-[3%] h-[10rem] w-[300px] shadow-md rounded-md bg-amber-100"
                  alt={`Image ${index}`}
                />
                <button
                  onClick={() =>
                    handleClick({ ...item }, currentGroup * 4 + index)
                  }
                  type="button"
                  className="bg-gradient-to-br from-[#37542E] to-[#E4E62E] hover:bg-gradient-to-bl mx-24 rounded-full py-3 px-4 text-2xl md:mt-8 mt-10"
                  data-hs-overlay="#hs-modal-upgrade-to-pro"
                >
                  {item.buttonText}
                </button>
              </div>
            ))}
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center mt-16">
        <button
          onClick={handlePrevGroup}
          className="bg-gradient-to-br from-[#37542E] to-[#E4E62E] hover:bg-gradient-to-bl rounded-full py-3 px-6 text-xl mx-2"
        >
          Previous Group
        </button>
        <button
          onClick={handleNextGroup}
          className="bg-gradient-to-br from-[#37542E] to-[#E4E62E] hover:bg-gradient-to-bl rounded-full py-3 px-6 text-xl mx-2"
        >
          Next Group
        </button>
      </div>
      {/* START MODAL */}
      <div
        id="hs-modal-upgrade-to-pro"
        className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="bg-gradient-to-br from-[#318D40] via-[#74B73F] to-[#93B414] rounded-xl shadow-sm pointer-events-auto">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h2 className="block text-5xl mt-5">{read.title}</h2>
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
            <div className="flex justify-end  items-center gap-x-64 p-4 sm:px-7">
              <button
                type="button"
                className="bg-gradient-to-br py-2 px-3 inline-flex items-center gap-x-2 text-sm font-bold rounded-lg from-[#37542E] to-[#E4E62E] hover:bg-gradient-to-bl"
                onClick={handlePrevWord}
              >
                Previous Word
              </button>
              <button
                type="button"
                className="bg-gradient-to-br py-2 px-3 inline-flex items-center gap-x-2 text-sm font-bold rounded-lg from-[#37542E] to-[#E4E62E] hover:bg-gradient-to-bl"
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
          className="px-5 py-4 bg-gradient-to-br from-[#37542E] to-[#E4E62E] hover:bg-gradient-to-bl rounded-full"
        >
          BACK TO PAGE
        </Link>
      </div>
    </motion.div>
  );
};

export default Reading;
