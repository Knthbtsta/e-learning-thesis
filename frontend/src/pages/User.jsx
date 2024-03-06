import React from "react";
import { Link } from "react-router-dom";
import Aa from "../assets/img/LoginImage.png";
const User = () => {
  const pages = {
    title: "Choose to Register",
    student: "Student",
    admin: "Admin",
  };

  return (
    <section className="bg-[url('/background2.png')] min-h-screen bg-no-repeat flex items-center justify-center bg-cover">
      <div className="bg-[#4D6A1C] flex rounded-2xl shadow-lg mx-8 max-w-4xl px-4 py-4 justify-center items-center  p-5">
        <div className="md:w-3/6 p-20 text-center md:mx-12  text-[#FFFFFF]">
          <h1 className="text-5xl">{pages.title}</h1>
          <div className="flex flex-col gap-6 pt-5 items-center">
            <Link
              to="/signupuser"
              className="bg-[#B0713B] text-[#FFFFFF] hover:scale-105 rounded-xl duration-300 py-4 px-[70px]"
            >
              {pages.student}
            </Link>
            <Link
              to="/signupadmin"
              className="bg-[#B0713B] text-[#FFFFFF] hover:scale-105 rounded-xl duration-300 py-4 px-[75px]"
            >
              {pages.admin}
            </Link>
          </div>
        </div>
        <div className="md:block hidden">
          <img src={Aa} classname="rounded-2xl w-[400px]" />
        </div>
      </div>
    </section>
  );
};

export default User;
