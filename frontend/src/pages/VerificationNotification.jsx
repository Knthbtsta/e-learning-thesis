import React from "react";
import { Link } from "react-router-dom";
import Aa from "../assets/img/LoginImage.png";
import Bb from "../assets/img/LOGINBG.png";

const VerificationNotification = () => {
  return (
    <div className="min-h-screen bg-[url('/gbg.png')] bg-cover bg-no-repeat flex items-center justify-center overflow-hidden">
      <div className="bg-[#4D6A1C] flex flex-col h-[400px] w-[300px] sm:h-[320px] sm:w-[500px] md:h-[320px] md:w-[500px] lg:w-[1000px] lg:h-[750px] lg:flex-row rounded-2xl shadow-lg items-center lg:p-5">
        {/* FORM */}
        <div className="flex flex-col justify-center items-center lg:w-1/2 lg:px-10 mt-20 md:mt-10 sm:mt-10 lg:mt-0 text-[#FFFFFF]">
          <p className="mt-5 text-[12px] lg:text-xl">
            THE VERIFICATION LINK IS SENT
          </p>
          <p className="mt-5 text-[12px] lg:text-xl">TO YOUR EMAIL</p>
          <div className="flex flex-col justify-center items-center ">
            <p className="mt-5 text-[12px] lg:text-xl">
              IF YOU ALREADY CLICK THE LINK
            </p>
            <p className="mt-5 text-[12px] lg:text-xl">PROVIDED</p>
            <div className="flex flex-row justify-center items-center gap-5">
              <p className="mt-5 text-[12px] lg:text-xl">PRESS:</p>
              <div className="mt-5 text-[12px] lg:text-xl py-3 lg:py-3 px-5 bg-red-600 rounded-lg ">
                <Link to="/">HOME</Link>
              </div>
            </div>
          </div>
        </div>
        {/* IMAGE */}
        <div className="invisible lg:visible">
          <img src={Bb} className="rounded-2xl h-[700px] w-[500px]" />
        </div>
      </div>
    </div>
  );
};

export default VerificationNotification;
