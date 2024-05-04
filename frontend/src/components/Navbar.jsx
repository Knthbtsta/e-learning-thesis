import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/img/logo.png";

const Navbar = () => {
  const [color, setColor] = useState(false);
  const [size, setSize] = useState("sm");
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    const handleOnScroll = () => {
      if (window.scrollY > 0) {
        setColor(true);
        setSize("lg");
      } else {
        setColor(false);
        setSize("sm");
      }
    };

    window.addEventListener("scroll", handleOnScroll);
    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, []);

  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === "") {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash, key]); // do this on route change

  return (
    <header
      className={`${
        color ? `bg-[#69CA66]` : null
      } flex flex-wrap fixed top-0 justify-start sm:flex-nowrap z-50 w-full bg-smeb-200 lg:text-2xl  xl:text-2xl md:text-[20px]  text-md py-3 sm:py-0 transition-colors`}
    >
      <nav
        className={`relative max-w-7xl w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 transition-all duration-300 ${
          size === "lg" ? "py-2" : "py-3"
        }`}
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <img
            src={logo}
            className={`h-[50px] md:h-[100px] ${
              size === "lg" ? "animate-pulse" : ""
            }`}
          />
          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-cyan-600 "
              data-hs-collapse="#navbar-collapse-with-animation"
              aria-controls="navbar-collapse-with-animation"
              aria-label="Toggle navigation"
            >
              <svg
                className="hs-collapse-open:hidden w-4 h-4"
                width={16}
                height={16}
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
              <svg
                className="hs-collapse-open:block hidden w-4 h-4"
                width={16}
                height={16}
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="navbar-collapse-with-animation"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
        >
          <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7">
            <Link
              to="/#home"
              className="font-medium text-[#FFFFFF] hover:scale-105 duration-300"
              href="#"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              to="/About2"
              className="font-medium text-[#FFFFFF] hover:scale-105 duration-300"
              href="#"
            >
              About
            </Link>
            <a
              className="font-medium text-[#FFFFFF] hover:scale-105 duration-300"
              href="#"
            >
              Testimonial
            </a>
            <Link
              to="/#contact"
              className="font-medium text-[#FFFFFF] hover:scale-105 duration-300"
              href="#"
            >
              Contact
            </Link>

            <Link
              to="/login"
              className="flex items-center  font-medium bg-[#4D6A1C] hover:scale-105 duration-300 px-7 py-3 rounded-full text-white hover:text-black  sm:my-6 sm:pl-6 "
              href="#"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
