import React from "react";
import Aa from "../assets/img/LoginImage.png";
import Bb from "../assets/img/LOGINBG.png";
import { Link } from "react-router-dom";

const EmailError = () => {
  return (
    <section className="bg-[url('/gbg.png')] min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="bg-[#4D6A1C] flex flex-col h-[400px] w-[300px] sm:h-[320px] sm:w-[500px] md:h-[320px] md:w-[500px] lg:w-[1000px] lg:h-[750px] lg:flex-row rounded-2xl shadow-lg items-center lg:p-5">
        {/* FORM */}
        <div className="md:w-1/2 px-16 text-[#FFFFFF]">
          <h2 className="font-bold text-center text-2xl pt-[55px] lg:pt-0">
            SORRY YOUR EMAIL IS NOT VERIFIED PLEASE CLICK THE LINK PROVIDED
          </h2>
          <p className="mt-5 text-xs border-b text-[11px] lg:text-[15px] border-[#FFFFFF] py-4">
            Check your email for verification link
          </p>
          <div className="mt-5 text-xs flex justify-between text-[11px] lg:text-[15px]">
            <Link to="/signupuser">Don't have an account?</Link>
          </div>
          <div className="flex justify-center items-center py-10 gap-10">
            <div className="py-3 lg:py-5 px-5 bg-green-600 rounded-lg text-[11px] lg:text-[15px]">
              <Link to="/login">TRY AGAIN</Link>
            </div>
            <div className="py-5 px-5 bg-red-600 rounded-lg text-[11px] lg:text-[15px]">
              <Link to="/">HOME</Link>
            </div>
          </div>
        </div>
        {/* IMAGE */}
        <div className="md:block hidden">
          <img src={Bb} className="rounded-2xl h-[700px] w-[500px]" />
        </div>
      </div>
    </section>
  );
};

export default EmailError;
