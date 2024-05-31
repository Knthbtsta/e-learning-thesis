import React, { useEffect, useRef } from "react";
import 'intersection-observer'; // Import if you installed the polyfill
import phonetic from "../assets/img/Phoneticreading.png";
import phonetic1 from "../assets/img/Phoneticreading1.png";
import pronounce from "../assets/img/Pronunciation.png";
import pronounce1 from "../assets/img/Pronunciation1.png";
import phonetic2 from "../assets/img/PhoneticAndPronounce.png";
import phonetic3 from "../assets/img/UnderstandingAndBrain.png";
import phonetic4 from "../assets/img/MissionAndVission.png";
import phonetic5 from "../assets/img/Values.png";
import { Link } from "react-router-dom";

const About2 = () => {
  const imageRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target); // Stop observing once the element is visible
          }
        });
      },
      { threshold: 0.1 }
    );

    imageRefs.current.forEach((image) => {
      if (image) observer.observe(image);
    });

    return () => {
      imageRefs.current.forEach((image) => {
        if (image) observer.unobserve(image);
      });
    };
  }, []);

  return (
    <div>
      <header className="bg-[url('/COVERPHOTO.png')] bg-cover bg-no-repeat h-[200px] md:h-[300px] lg:h-[500px] font-bold"></header>
      <div className="fixed bottom-0 left-0 m-10">
        <Link
          to="/#Home"
          className="px-5 py-4 bg-[#2C4840] hover:scale-105 duration-300 rounded-full text-white font-bold"
        >
          Back to Page
        </Link>
      </div>
      <div
        ref={(el) => (imageRefs.current[0] = el)}
        className="flex flex-col transition-opacity duration-1000 opacity-0"
      >
        <img src={phonetic2} alt="" />
      </div>
      <div
        ref={(el) => (imageRefs.current[1] = el)}
        className="flex flex-col transition-opacity duration-1000 opacity-0"
      >
        <img src={phonetic3} alt="" />
      </div>
      <div
        ref={(el) => (imageRefs.current[2] = el)}
        className="flex flex-col transition-opacity duration-1000 opacity-0"
      >
        <img src={phonetic4} alt="" />
      </div>
      <div
        ref={(el) => (imageRefs.current[3] = el)}
        className="flex flex-col transition-opacity duration-1000 opacity-0"
      >
        <img src={phonetic5} alt="" />
      </div>
    </div>
  );
};

export default About2;
