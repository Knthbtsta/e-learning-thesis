import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Phonics = () => {
  const accordionData = [
    {
      title: "(EASY) Short A Sound",
      content: [
        { to: "/easyshorta", text: "CLICK START" },
        { to: "/someotherpath1", text: "Another Action" },
        // Add more items for the first accordion section as needed
      ],
    },
    {
      title: "(EASY) Long A Sound",
      content: [
        { to: "/easylonga", text: "CLICK START" },
        { to: "/someotherpath2", text: "Another Action" },
        // Add more items for the second accordion section as needed
      ],
    },
    {
      title: "Another Category",
      content: [
        { to: "/someotherpath3", text: "CLICK START" },
        { to: "/someotherpath4", text: "Another Action" },
        // Add more items for the third accordion section as needed
      ],
    },
  ];

  const [openSections, setOpenSections] = useState(
    new Array(accordionData.length).fill(false)
  );

  const toggleAccordion = (index) => {
    setOpenSections((prevOpenSections) => {
      const newOpenSections = [...prevOpenSections];
      newOpenSections[index] = !newOpenSections[index]; // Toggle the state
      return newOpenSections;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[url('/bgreading.png')] h-screen bg-cover bg-no-repeat pb-12"
    >
      <div className="flex flex-col justify-center text-center items-center">
        <div className="p-10 text-5xl px-4 sm:px-12 rounded-l-[50%] rounded-r-[50%] tracking-widest font-bold bg-cyan-600">
          <h1>WELCOME TO PRACTICE MATERIALS</h1>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-10 px-4 sm:px-12">
        <div className="flex flex-col gap-4 w-full max-w-2xl">
          {accordionData.map((section, index) => (
            <div key={index}>
              <div
                className={`hs-accordion active rounded-xl w-full bg-cyan-600 px-6 py-3 ${
                  openSections[index] ? "open" : ""
                }`}
                id={`hs-basic-with-title-and-arrow-stretched-heading-${index}`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="f hs-accordion-toggle text-xl text-white group py-3 inline-flex items-center justify-between w-full font-semibold transition dark:hs-accordion-active:text-amber-500 dark:text-gray-200 dark:hover:text-gray-400"
                  aria-controls={`hs-basic-with-title-and-arrow-stretched-collapse-${index}`}
                >
                  {section.title}
                  <svg
                    className={`hs-accordion-active:hidden hs-accordion-active:text-amber-200 block w-3 h-3 group-hover:text-gray-500 text-orange-100`}
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <div
                  id={`hs-basic-with-title-and-arrow-stretched-collapse-${index}`}
                  className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
                    openSections[index] ? "" : "hidden"
                  }`}
                  aria-labelledby={`hs-basic-with-title-and-arrow-stretched-heading-${index}`}
                >
                  {section.content.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col justify-start items-start text-center px-3 py-2 rounded-md mt-2 border-t-1 border-gray-200 bg-orange-200"
                    >
                      <Link
                        to={item.to}
                        className="px-4 py-2 rounded-md bg-amber-300"
                      >
                        {item.text}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start fixed bottom-0 left-0 mb-10 ml-4 sm:ml-10 font-bold tracking-widest">
        <Link
          to="/reading"
          className="px-5 py-4 bg-gradient-to-br from-teal-700 via-sky-400 to-sky-700 hover:bg-gradient-to-bl rounded-full"
        >
          BACK TO PAGE
        </Link>
      </div>
    </motion.div>
  );
};

export default Phonics;
