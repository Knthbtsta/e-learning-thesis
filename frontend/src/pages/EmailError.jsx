import React from "react";
import Aa from "../assets/img/LoginImage.png";
import Bb from "../assets/img/LOGINBG.png";
import { Link } from "react-router-dom";

const EmailError = () => {
  return (
    <div className="min-h-screen bg-[url('/gbg.png')] bg-cover bg-no-repeat flex items-center justify-center overflow-hidden">
      <div className="bg-[#4D6A1C] flex flex-col h-[350px] w-[300px] sm:h-[320px] sm:w-[500px] md:h-[320px] md:w-[500px] lg:w-[1000px] lg:h-[750px] lg:flex-row rounded-2xl shadow-lg items-center lg:p-5">
        {/* FORM */}
        <div className="flex flex-col justify-center items-center lg:w-1/2 lg:px-10 pt-10 px-10 md:mt-5 sm:mt-3 lg:mt-0 text-[#FFFFFF]">
          <p className="mt-5 text-[12px] lg:text-xl">SORRY YOUR EMAIL IS NOT VERIFIED</p>
          <div className="flex flex-col justify-center items-center sm:flex-row lg:flex-col">
          <p className="mt-5 text-[12px] text-center lg:text-xl">PLEASE CLICK THE LINK PROVIDED TO YOUR EMAIL</p>
          </div>
          
          <div className="mt-3 lg:mt-5 text-[12px] lg:text-xl flex justify-between">
            <Link to="/signupuser"> or CREATE ACCOUNT AGAIN..</Link>
          </div>
          <p className="mt-5 text-[12px] lg:text-xl text-center">IF YOU CLICK THE LINK PROVIDED YOU CAN EXIT THE PAGE</p>
          <div className="flex flex-row justify-center items-center gap-5">
         
            <div className="mt-5 text-[12px] lg:text-xl py-3 lg:py-3 px-5 bg-red-600 rounded-lg hover:text-black">
              <Link to="/login">EXIT</Link>
            </div>
            <Link
            to="/signupuser"
            className="mt-5 text-[12px] lg:text-xl text-white hover:text-black bg-green-700 py-3 px-4 rounded-xl"
          >
            SIGN UP
          </Link>
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

export default EmailError;
