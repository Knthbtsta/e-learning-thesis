import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
const Navbar2 = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [color, setColor] = useState(false);
  useEffect(() => {
    const handleOnScroll = () => {
      if (window.innerWidth <= 767) setColor(true);
      else window.scrollY >= 90 ? setColor(true) : setColor(false);
    };

    window.addEventListener("scroll", handleOnScroll);
  }, []);
  return (
    <div>
      <header className={`${
        color ? `bg-orange-100` : null
      }top-0 fixed flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-orange-100 py-5`}>
        <nav
          className="relative  max-w-[85rem] flex flex-wrap basis-full items-center w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global"
        >
          
          <div className="flex items-center justify-between"></div>
          <div className="flex items-center ms-auto sm:ms-0 sm:order-3 bg-orange-100">
            <div className="ps-3 sm:ps-6 sm:ms-6 sm:border-s">
              <button
                type="button"
                className="w-9 h-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-white hover:bg-cyan-600 disabled:opacity-50 disabled:pointer-events-none bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-cyan-600"
                data-hs-overlay="#navbar-secondary-content"
                aria-controls="navbar-secondary-content"
                aria-label="Toggle navigation"
              >
                <svg
                  className="hs-collapse-open:hidden flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1={3} x2={21} y1={6} y2={6} />
                  <line x1={3} x2={21} y1={12} y2={12} />
                  <line x1={3} x2={21} y1={18} y2={18} />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div
            id="navbar-offcanvas-example"
            className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full fixed top-0 start-0 transition-all duration-300 transform h-full max-w-xs w-full z-[60] bg-orange-100 border-e basis-full grow sm:order-2 sm:static sm:block sm:h-auto sm:max-w-none sm:w-auto sm:border-r-transparent sm:transition-none sm:translate-x-0 sm:z-40 sm:basis-auto dark:bg-gray-800 dark:border-r-gray-700 sm:dark:border-r-transparent hidden"
            tabIndex={-1}
            data-hs-overlay-close-on-resize=""
          ></div>
        </nav>
      </header>
      {/* ========== END HEADER ========== */}
      {/* Offcanvas */}
      <div
        id="navbar-secondary-content"
        className="hs-overlay hs-overlay-open:translate-x-0 hidden -translate-x-full fixed top-0 start-0 transition-all duration-300 transform h-full max-w-xs w-full z-[60] bg-white border-e dark:bg-gray-800 dark:border-gray-700"
        tabIndex={-1}
        style={{ maxHeight: "100vh", overflowY: "auto" }}
      >
        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
          <h3 className="font-bold text-2xl text-black dark:text-white">SETTINGS</h3>
          <button
            type="button"
            className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-lg text-black hover:text-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-cyan-500 text-sm dark:text-cyan-500 dark:hover:text-cyan-500"
            data-hs-overlay="#navbar-secondary-content"
          >
            <span className="sr-only">Close offcanvas</span>
            <svg
              className="flex-shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <div className="mb-6 hover:bg-cyan-600">
            <div className="flex justify-between flex-wrap gap-2 w-full"></div>
            <Link 
            to={`/studentprofile/?id=${id}`}
            onClick={()=>{
              document.getElementById("hs-overlay").hidden
            }}
            className="pr-[220px] text-black font-bold">PROFILE</Link>
          </div>
          <div className="mb-6 hover:bg-cyan-600">
            <div className="flex justify-between flex-wrap gap-2 w-full "></div>
            <Link 
            to={`/levelmap/?id=${id}`}
            onClick={()=>{
              document.getElementById("hs-overlay").hidden
            }}
            className="pr-[240px] text-black font-bold">ROAD MAP</Link>
          </div>
          <div className="mb-6 hover:bg-cyan-600">
            <div className="flex justify-between flex-wrap gap-2 w-full "></div>
            <Link 
            to={`/about/?id=${id}`}
            onClick={()=>{
              document.getElementById("hs-overlay").hidden
            }}
            className="pr-[240px] text-black font-bold">MENU</Link>
          </div>
          <div className="mb-6 hover:bg-cyan-600">
            <div className="flex justify-between flex-wrap gap-2 w-full"></div>
            <Link 
            data-hs-overlay="#hs-sign-out-alert-small-window"
            className="pr-[200px] text-black font-bold">SIGN OUT</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
