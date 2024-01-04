import React from "react";
import logo from "../assets/img/logo.png";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [color, setColor] = useState(false);
  const { pathname, hash, key } = useLocation();

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
  useEffect(() => {
    const handleOnScroll = () => {
      if (window.innerWidth <= 767) setColor(true);
      else window.scrollY >= 90 ? setColor(true) : setColor(false);
    };

    window.addEventListener("scroll", handleOnScroll);
  }, []);

  return (
    <header
      className={`${
        color ? `bg-orange-100` : null
      } flex flex-wrap fixed top-0 sm:justify-start sm:flex-nowrap z-50 w-full bg-smeb-200 lg:text-2xl  xl:text-2xl md:text-[20px]  text-md py-3 sm:py-0 `}
    >
      <nav
        className="relative max-w-7xl w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <img src={logo} className="h-[100px] animate-pulse" />
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
              className="font-medium text-black"
              href="#"
              aria-current="page"
            >
              Home
            </Link>
            <Link to="/#about" className="font-medium text-black" href="#">
              About
            </Link>
            <a className="font-medium text-black" href="#">
              Testimonial
            </a>
            <Link to="/#contact" className="font-medium text-black" href="#">
              Contact
            </Link>

            <Link
              to="/login"
              className="flex items-center  font-medium bg-cyan-600 hover:bg-cyan-500 px-7 py-3 rounded-full text-white hover:text-black sm:border-l-2 border-cyan-600  sm:my-6 sm:pl-6 "
              href="#"
            >
              Log in
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
