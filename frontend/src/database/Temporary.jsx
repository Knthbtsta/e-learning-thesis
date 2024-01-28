import { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { FaPenAlt } from "react-icons/fa"
import axios from "axios";
import API_LINK from "../API";

function Temporary() {
  const [all, setAll] = useState([]);

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${API_LINK}/user`);

      setAll(res.data);
    };

    fetchData();
  }, []);

  const handleSearch = async (e) => {
    try {
      e.preventDefault();

      const id = user._id;

      const result = await axios.get(`${API_LINK}/${id}`);

      setUser(result.data);
    } catch (e) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();

      const id = user._id;

      const result = await axios.patch(`${API_LINK}/${id}`, user);

      console.log(result);
    } catch (e) {
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    try {
      e.preventDefault();

      const id = user._id;

      const result = await axios.delete(`${API_LINK}/${id}`);

      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAdd = async (e) => {
    try {
      const result = await axios.post(API_LINK, user);

      console.log(result);
    } catch (e) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,

      [e.target.name]: e.target.value,
    }));
  };

  let time = new Date().toLocaleTimeString();
  const [currentTime, setCurrentTime] = useState(time);

  const updateTime = () => {
    let time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };
  setInterval(updateTime, 1000);

  let date = new Date().toLocaleDateString();
  const [currentDate, setCurrentDate] = useState(date);

  const updateDate = () => {
    let date = new Date().toLocaleDateString();
    setCurrentDate(date);
  };
  setInterval(updateDate, 1000);

  return (
    <div className="bg-[url('/official.png')] h-screen bg-cover bg-no-repeat">
      <div className="flex flex-col justify-center items-center text-center ml-[100] p-2 bg-cyan-600 text-2 text-white tracking-widest">
        <div className="flex flex-row gap-x-8">
          WELCOME TO OUR DATABASE WE ARE HAPPY TO TEACH YOU
          <h1 className="bg-amber-200  text-black rounded-md px-3 ">
            {currentDate} / {currentTime}
          </h1>
        </div>
      </div>
      <div className="bg-[url('')] bg-cover rounded-md bg-cyan-500 h-[200px]">
        <div className="flex flex-col text-align  sm:ml-5 md:ml-5 lg:ml-20 xl:ml-52">
          <div className="text-2xl md:text-3xl lg:text-4xl text-white font-bold rounded-md uppercase mt-16  sm:mx-20 mx-6   tracking-wider  leading-[2rem]   ">
            <h1>
              E – Learning Visualized and Audio <br />
              Learning Web for Phonetic Reading
            </h1>
          </div>
        </div>
      </div>
      {/* SIDEBAR  */}
      <div>
        <>
          {/* Navigation Toggle */}
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600"
            data-hs-overlay="#docs-sidebar"
            aria-controls="docs-sidebar"
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle Navigation</span>
            <svg
              className="flex-shrink-0 w-4 h-4"
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
          </button>
          {/* End Navigation Toggle */}
          <div
            id="docs-sidebar"
            className="mt-12 ml-0 mb-10 rounded-lg shadow hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-cyan-600 border-e border-gray-300 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 "
          >
            <div className="px-16">
              <a
                className="flex-none text-xl font-semibold dark:text-white"
                href="#"
                aria-label="Brand"
              >
                E-Learning
              </a>
            </div>
            <nav
              className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
              data-hs-accordion-always-open=""
            >
              <ul className="space-y-1.5">
                <li>
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-2.5  text-sm text-slate-700 rounded-lg hover:bg-amber-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#"
                  >
                    <svg
                      className="w-4 h-4"
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
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    Dashboard
                  </a>
                </li>
                {/* END OF DASHBOARD */}

                {/* USER */}
                <li>
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-2.5  text-sm text-slate-700 rounded-lg hover:bg-amber-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#"
                  >
                    <svg
                      className="w-4 h-4"
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
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx={9} cy={7} r={4} />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    User
                  </a>
                </li>

                {/* EBND OF USER */}

                {/* START OF ACCOUNT */}

                <li>
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-2.5  text-sm text-slate-700 rounded-lg hover:bg-amber-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#"
                  >
                    <svg
                      className="w-4 h-4"
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
                      <circle cx={18} cy={15} r={3} />
                      <circle cx={9} cy={7} r={4} />
                      <path d="M10 15H6a4 4 0 0 0-4 4v2" />
                      <path d="m21.7 16.4-.9-.3" />
                      <path d="m15.2 13.9-.9-.3" />
                      <path d="m16.6 18.7.3-.9" />
                      <path d="m19.1 12.2.3-.9" />
                      <path d="m19.6 18.7-.4-1" />
                      <path d="m16.8 12.3-.4-1" />
                      <path d="m14.3 16.6 1-.4" />
                      <path d="m20.7 13.8 1-.4" />
                    </svg>
                    Account
                  </a>
                </li>
                {/* END OF ACCOUNT */}

                {/* START OF  */}

                <li>
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-2.5  text-sm text-slate-700 rounded-lg hover:bg-amber-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#"
                  >
                    <svg
                      className="w-4 h-4"
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
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx={9} cy={7} r={4} />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    User
                  </a>
                </li>
                <li>
                  <Link
                    to="/createquiz"
                    className="flex items-center gap-x-3.5 py-2 px-2.5  text-sm text-slate-700 rounded-lg hover:bg-amber-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#"
                  >
                  <FaPenAlt />
                    Add Practice Quiz
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </>
        {/* END OF SIDEBAR */}

        {/* START OF BODY HEADER */}
        <div className="flex flex-col mt-5  sm:ml-0 md:ml-0 lg:ml-[275px] xl:ml-[280px] px-3 mr-5 py-10 bg-amber-200 md:h-[500px]">
          <div className="-m-1.5 overflow-x-auto 
               [&amp;::-webkit-scrollbar]:w-2 [&amp;::-webkit-scrollbar-track]:bg-gray-100
               [&amp;::-webkit-scrollbar-thumb]:bg-gray-300
               ">
            <div className="p-1.5 min-w-full inline-block align-middle ">
              <div className="overflow-hidden h-[650px] ">
                <table className="min-w-full divide-y-2 border-2 border-black  divide-black ">
                  <thead>
                    <tr className="text-black">
                      <th
                        scope="col"
                        className="py-3 border-2  border-black  p-2 flex-1"
                      >
                        Student Number
                      </th>
                      <th
                        scope="col"
                        className="py-3 border-2  border-black   flex-1"
                      >
                        First Name
                      </th>
                      <th
                        scope="col"
                        className="py-3 border-2  border-black  flex-1"
                      >
                        Middle Name
                      </th>
                      <th
                        scope="col"
                        className="py-3 border-2  border-black  flex-1"
                      >
                        Last Name
                      </th>
                      <th
                        scope="col"
                        className="py-3 border-2  border-black  flex-1"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="py-3 border-2  border-black  flex-1"
                      >
                      </th>
                    </tr>
                  </thead>
                  <tbody className="min-w-full text-center border-2 border-black  divide-black  text-black">
                    {/* FIRST ROW */}
                    {all.map((item, idx) => (
                      <tr key={idx}>
                        <td name="_id" className="border-2 p-2 border-black">
                          {item.user_id}
                        </td>
                        <td className="border-2 p-2 border-black">
                          {item.firstName}
                        </td>
                        <td className="border-2 p-2 border-black">
                          {item.middleName}
                        </td>
                        <td className="border-2 p-2 border-black">
                          {item.lastName}
                        </td>
                        <td className="border-2 p-2 border-black">
                          {item.email}
                        </td>
                        <td className="border-2 p-2 border-black">
                          {/* BUTTON MODAL */}
                          <div className="text-center">
                            <button
                              type="button"
                              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              data-hs-overlay="#hs-sign-out-alert-small-window"
                            >
                              <FaRegEdit></FaRegEdit>
                            </button>
                          </div>
                        </td>
                        <td className="border-2 p-2 border-black">
                          <button
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-500 rounded-md text-white p-2"
                          >
                            <RiDeleteBin6Line></RiDeleteBin6Line>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* END OF BODY HEADER */}
      </div>
    </div>
  );
}

export default Temporary;
