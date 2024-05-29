import React from "react";
import icon from "../assets/img/icon1.png";
import icon1 from "../assets/img/icon2.png";
import icon2 from "../assets/img/icon3.png";
import icon3 from "../assets/img/icon4.png";
import icon4 from "../assets/img/icon5.png";
import icon5 from "../assets/img/icon6.png";
import icon6 from "../assets/img/icon7.png";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";

const items = [
  {
    icon: icon,
    title: "Phonetics",
    description:
      "Phonetics is the study of speech sounds, encompassing vowels, consonants, and the intricacies of pronunciation.",
  },
  {
    icon: icon1,
    title: "Pronunciation",
    description:
      "Pronunciation helps kids in reading by teaching them to recognize and manipulate sounds in words, boosting their reading skills.",
  },
  {
    icon: icon2,
    title: "Understanding",
    description:
      "Understanding aids kids' reading by enhancing comprehension and retention.",
  },
  {
    icon: icon3,
    title: "Brain Skills",
    description:
      "Brain skills development boosts kids' reading by enhancing memory, attention, and processing speed, crucial for decoding and comprehension.",
  },
];

const items1 = [
  {
    icon: icon4,
    title: "Mission",
    description:
      "Empowering learners of all ages to unlock the joy of reading through accessible and engaging e-learning resources.",
  },
  {
    icon: icon5,
    title: "Vision",
    description:
      "To foster a world where every individual has the opportunity to develop proficient reading skills, igniting a lifelong love for learning and literacy.",
  },
  {
    icon: icon6,
    title: "Values",
    description:
      "Our values are accessibility, innovation, empowerment, collaboration, and integrity.",
  },
];

const About2 = () => {
  return (
    <div>
      <header className="bg-[url('/COVERPHOTO.png')]  bg-no-repeat bg-center bg-cover h-[100px] sm:h-[200px] md:h-[200px] lg:h-[300px] xl:h-[400px]">
        <h1 className="text-3xl md:text-5xl lg:text-7xl pt-16 md:pt-24 lg:pt-44 xl:pt-48 pl-14 text-white font-bold "></h1>
      </header>
      <div className="bg-white flex flex-col sm:grid grid-cols-2  lg:grid grid-cols-4 justify-center items-center text-center  gap-12  md:gap-4 lg:gap-12 items-center md:pt-4 pt-12 pb-12 sm:px-16 md:px-6 lg:px-12 px-6 ">
        {items.map((item, index) => (
          <div
            key={index}
            className="text-black flex flex-col items-center justify-center"
          >
            <img src={item.icon} style={{ width: "60px", height: "60px" }} />
            <h1 className="font-bold text-2xl ">{item.title}</h1>
            <p
              style={{
                textAlign: "center",
                paddingTop: "5px",
                fontSize: "15px",
              }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-white flex flex-col justify-center text-center items-center pt-12">
        <h1 className="text-black font-bold text-3xl">WHO ARE WE?</h1>
        <p
          className="text-black mt-2 text-[15px] sm:px-16 lg:px-32 p-4"
          style={{ textAlign: "center", paddingTop: "5px" }}
        >
          We are a dedicated team passionate about empowering learners of all
          ages to master the art of reading through engaging and effective
          e-learning resources.
        </p>
      </div>
      <div className="bg-white flex flex-col md:grid grid-cols-3 justify-center text-center items-center    gap-12  px-6 md:px-6  pt-12 pb-12 ">
        {items1.map((item, index) => (
          <div
            key={index}
            className=" text-black flex flex-col  items-center justify-center "
          >
            <img src={item.icon} style={{ width: "60px", height: "60px" }} />
            <h1 className="font-bold text-2xl">{item.title}</h1>
            <p
              style={{
                textAlign: "center",
                paddingTop: "5px",
                fontSize: "15px",
              }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-orange-100">
        <footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto ">
          {/* Grid */}
          <div className="text-center ">
            <div className="flex items-center justify-center">
              <img src={logo} alt="logo" className="h-[100px]" />
            </div>
            {/* End Col */}
            <div className="mt-3">
              <p className="text-gray-700">
                Thanyou for visiting our page{" "}
                <a
                  className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
                  href="#"
                ></a>{" "}
                E-learning.
              </p>
              <p className="text-gray-700">
                © E-Learning. 2023 . All rights reserved.
              </p>
            </div>
            {/* Social Brands */}
            <div className="mt-3 space-x-2">
              <a
                className="inline-flex justify-center items-center w-10 h-10 text-center text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800"
                href="#"
              >
                <svg
                  className="w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
              </a>
              <a
                className="inline-flex justify-center items-center w-10 h-10 text-center text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800"
                href="#"
              >
                <svg
                  className="w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
              </a>
              <a
                className="inline-flex justify-center items-center w-10 h-10 text-center text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800"
                href="#"
              >
                <svg
                  className="w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
              <a
                className="inline-flex justify-center items-center w-10 h-10 text-center text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800"
                href="#"
              >
                <svg
                  className="w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.362 10.11c0 .926-.756 1.681-1.681 1.681S0 11.036 0 10.111C0 9.186.756 8.43 1.68 8.43h1.682v1.68zm.846 0c0-.924.756-1.68 1.681-1.68s1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68a1.685 1.685 0 0 1-1.682-1.68v-4.21zM5.89 3.362c-.926 0-1.682-.756-1.682-1.681S4.964 0 5.89 0s1.68.756 1.68 1.68v1.682H5.89zm0 .846c.924 0 1.68.756 1.68 1.681S6.814 7.57 5.89 7.57H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.682 1.68-1.682h4.21zm6.749 1.682c0-.926.755-1.682 1.68-1.682.925 0 1.681.756 1.681 1.681s-.756 1.681-1.68 1.681h-1.681V5.89zm-.848 0c0 .924-.755 1.68-1.68 1.68A1.685 1.685 0 0 1 8.43 5.89V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68v4.21zm-1.681 6.748c.926 0 1.682.756 1.682 1.681S11.036 16 10.11 16s-1.681-.756-1.681-1.68v-1.682h1.68zm0-.847c-.924 0-1.68-.755-1.68-1.68 0-.925.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681h-4.21z" />
                </svg>
              </a>
            </div>
            {/* End Social Brands */}
          </div>
          <div className="fixed bottom-0 left-0 m-10">
            <Link
              to="/#Home"
              className="px-5 py-4  bg-[#2C4840]  hover:scale-105 duration-300 rounded-full text-white font-bold"
            >
              Back to Page
            </Link>
          </div>
          {/* End Grid */}
        </footer>
      </div>
    </div>
  );
};

export default About2;
