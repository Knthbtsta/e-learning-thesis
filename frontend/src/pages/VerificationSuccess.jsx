import React from "react";
import Aa from "../assets/img/LoginImage.png";
import Bb from "../assets/img/LOGINBG.png";
import { Link } from "react-router-dom";

const VerificationSuccess = () => {
  return (
    <div className="min-h-screen bg-[url('/gbg.png')] bg-cover bg-no-repeat flex items-center justify-center overflow-hidden">
      <div className="bg-[#4D6A1C] flex flex-col h-[400px] w-[300px] sm:h-[320px] sm:w-[500px] md:h-[320px] md:w-[500px] lg:w-[1000px] lg:h-[750px] lg:flex-row rounded-2xl shadow-lg items-center lg:p-5">
        {/* FORM */}
        <div className="flex flex-col justify-center items-center lg:w-1/2 lg:px-10 mt-32 md:mt-24 sm:mt-24 lg:mt-0 text-[#FFFFFF]">
          <p className="mt-5 text-[12px] lg:text-xl">YOUR EMAIL IS VERIFIED</p>
          <p className="mt-5 text-[12px] lg:text-xl">YOU CAN EXIT THE PAGE</p>
        </div>
        {/* IMAGE */}
        <div className="invisible lg:visible">
          <img src={Aa} className="rounded-2xl h-[700px] w-[500px]" />
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccess;
