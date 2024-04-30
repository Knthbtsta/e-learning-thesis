import React from "react";
import icon from "../assets/img/icon1.png";
import icon1 from "../assets/img/icon2.png";
import icon2 from "../assets/img/icon3.png";
import icon3 from "../assets/img/icon4.png";
import icon4 from "../assets/img/icon5.png";
import icon5 from "../assets/img/icon6.png";
import icon6 from "../assets/img/icon7.png";
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
    icon: icon4,
    title: "Values",
    description:
      "Our values are accessibility, innovation, empowerment, collaboration, and integrity.",
  },
];

const About2 = () => {
  return (
    <div>
      <header className="bg-[url('/COVERPHOTO.png')] bg-cover bg-no-repeat h-[500px] font-bold ">
        <h1 className="text-7xl pt-44 pl-56 text-white font-bold ">
          Kid's Reading Development{" "}
          <hr className="mr-[765px] mt-2 border-[3px] border-white"></hr>
        </h1>
      </header>
      <div className="bg-white flex flex-row justify-center  gap-32 items-center pt-12 pb-12 px-12 ">
        {items.map((item, index) => (
          <div
            key={index}
            className="text-black flex flex-col items-center justify-center"
          >
            <img src={item.icon} style={{ width: "60px", height: "60px" }} />
            <h1 className="font-bold text-2xl">{item.title}</h1>
            <p style={{ textAlign: "center", paddingTop: "5px" }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-white flex flex-col justify-center text-center items-center pt-12">
        <h1 className="text-black font-bold text-5xl">WHO ARE WE?</h1>
        <p
          className="text-black mt-2"
          style={{ textAlign: "center", paddingTop: "5px" }}
        >
          We are a dedicated team passionate about empowering learners of{" "}
          <br></br> all ages to master the art of reading through engaging and
          effective e-learning resources.
        </p>
      </div>
      <div className="bg-white flex flex-row justify-center items-center   pt-24 pb-12">
        {items.map((item, index) => (
          <div
            key={index}
            className="text-black flex flex-col items-center justify-center"
          >
            <img src={item.icon} style={{ width: "60px", height: "60px" }} />
            <h1 className="font-bold text-2xl">{item.title}</h1>
            <p style={{ textAlign: "center", paddingTop: "5px" }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About2;
