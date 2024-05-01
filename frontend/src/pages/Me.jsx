import React from "react";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Contact from "../components/Contact";
import About from "../components/About";

const Me = () => {
  return (
    <div>
      <div className="bg-[url('/JGBG1.png')] bg-no-repeat bg-cover h-screen">
        <Navbar />
        <Home />
        <About />
        <Contact />
      </div>
    </div>
  );
};

export default Me;
