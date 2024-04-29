import React from "react";
import icon from "../assets/img/icon1.png";
import icon1 from "../assets/img/icon2.png";
import icon2 from "../assets/img/icon3.png";
import icon3 from "../assets/img/icon4.png";
import icon4 from "../assets/img/icon5.png";
import icon5 from "../assets/img/icon6.png";
import icon6 from "../assets/img/icon7.png";
import { Link } from "react-router-dom";

const About2 = () => {
  return (
    <div>
      <header className="bg-[url('/COVERPHOTO.png')] bg-cover bg-no-repeat h-[500px] font-bold ">
        <h1 className="text-7xl pt-44 pl-56 text-white font-bold ">
          Kid's Reading Development{" "}
          <hr className="mr-[765px] mt-2 border-[3px] border-white"></hr>
        </h1>
      </header>
      <div className="bg-white flex flex-row justify-center  gap-32 items-center pt-12 pb-12 ">
        <div className="text-black flex flex-col items-center">
          <img src={icon} style={{ width: "60px", height: "60px" }} />
          <h1 className="font-bold text-2xl">Phonetics</h1>
          <p style={{ textAlign: "center", paddingTop: "5px" }}>
            Phonetics is the study of speech sounds, encompassing vowels,
            consonants, and the intricacies of pronunciation.
          </p>
        </div>
        <div className="text-black flex flex-col items-center">
          <img src={icon1} style={{ width: "60px", height: "60px" }} />
          <h1 className="font-bold text-2xl">Pronunciation</h1>
          <p style={{ textAlign: "center", paddingTop: "5px" }}>
            Pronunciation helps kids in reading by teaching them to recognize
            and manipulate sounds in words, boosting their reading skills.
          </p>
        </div>
        <div className="text-black flex flex-col items-center">
          <img src={icon2} style={{ width: "60px", height: "60px" }} />
          <h1 className="font-bold text-2xl">Understanding</h1>
          <p style={{ textAlign: "center", paddingTop: "5px" }}>
            Understanding aids kids' reading by enhancing comprehension and
            retention.
          </p>
        </div>
        <div className="text-black flex flex-col items-center">
          <img src={icon3} style={{ width: "60px", height: "60px" }} />
          <h1 className="font-bold text-2xl">Brain Skills</h1>
          <p style={{ textAlign: "center", paddingTop: "5px" }}>
            Brain skills development boosts kids' reading by enhancing memory,
            attention, and processing speed, crucial for decoding and
            comprehension.
          </p>
        </div>
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
      <div className="bg-white flex flex-row justify-center items-center gap-52  pt-24 pb-12">
        <div className="text-black flex flex-col items-center justify-center ">
          <img src={icon4} style={{ width: "60px", height: "60px" }} />
          <h1 className="font-bold text-2xl">Mission</h1>
          <p style={{ textAlign: "center", paddingTop: "5px" }}>
            Empowering learners of all ages to unlock the joy of reading through
            accessible and engaging e-learning resources.
          </p>
        </div>
        <div className="text-black flex flex-col items-center">
          <img src={icon5} style={{ width: "60px", height: "60px" }} />
          <h1 className="font-bold text-2xl">Vision</h1>
          <p style={{ textAlign: "center", paddingTop: "5px" }}>
            To foster a world where every individual has the opportunity to
            develop proficient reading skills, igniting a lifelong love for
            learning and literacy.
          </p>
        </div>
        <div className="text-black flex flex-col items-center">
          <img src={icon6} style={{ width: "60px", height: "60px" }} />
          <h1 className="font-bold text-2xl">Values</h1>
          <p style={{ textAlign: "center", paddingTop: "5px" }}>
            Our values are accessibility, innovation, empowerment,
            collaboration, and integrity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About2;
