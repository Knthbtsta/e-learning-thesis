import React, { useState, useEffect } from "react";
import API_LINK from "../API";
import axios from "axios";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Temporary = () => {
  const [all, setAll] = useState([]);
  const [user, setUser] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_LINK}/user`);
        const filteredData = res.data.filter(
          (user) => user.verified === true && user.type === "user"
        );
        const sortedData = filteredData.sort((a, b) => b.stars - a.stars);
        setAll(sortedData);
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []);

  const handleBack = () => {
    navigate(`/levelmap?id=${id}`);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${API_LINK}/user/${userId}`);
      // Remove the deleted user from the state
      setAll(all.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="bg-[url('/official.png')] h-screen bg-cover bg-no-repeat overflow-hidden flex flex-col justify-center">
      <div
        id="hs-sign-out-alert-small-window"
        className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-xs sm:w-full m-3 sm:mx-auto">
          <div className="relative flex flex-col bg-cyan-600 shadow-lg rounded-xl dark:bg-gray-800">
            <div className="absolute top-2 end-2">
              <button
                type="button"
                className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-sign-out-alert-small-window"
              >
                <span className="sr-only">Close</span>
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
            <div className="p-4 sm:p-10 text-center overflow-y-auto">
              {/* Icon */}
              <span className="mb-4 inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-red-800 bg-red-600 text-white-800">
                <svg
                  className="flex-shrink-0 w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </span>
              {/* End Icon */}
              <h3 className="mb-2 text-2xl font-bold text-white">Sign out</h3>
              <p className="text-white">
                Are you sure you would like to sign out of your E-Learning
                account?
              </p>
              <div className="mt-6 grid gap-y-2">
                <Link
                  className="py-2.5 px-4 w-full inline-flex justify-center items-center gap-2 rounded-lg font-medium bg-green-500 text-white hover:scale-105 duration-300"
                  to="/login"
                  type="button"
                  data-hs-overlay="#hs-sign-out-alert-small-window"
                  onClick={() => {
                    document.getElementById("hs-overlay").hidden;
                  }}
                >
                  Sign out
                </Link>
                <button
                  type="button"
                  className="py-2.5 px-4 w-full inline-flex justify-center items-center gap-2 rounded-lg font-medium bg-red-500 text-white hover:scale-105 duration-300"
                  data-hs-overlay="#hs-sign-out-alert-small-window"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-[40px] lg:text-[50px] text-black pb-[20px]">
        LEADERBOARDS
      </div>
      <div className="flex flex-col bg-amber-200 mx-16 border-[10px] rounded-[10px] border-black h-[500px] sm:h-[200px] lg:h-[500px] xl:h-[600px] 2xl:h-[800px]">
        <div
          className="overflow-x-auto 
               [&amp;::-webkit-scrollbar]:w-2 [&amp;::-webkit-scrollbar-track]:bg-gray-100
               [&amp;::-webkit-scrollbar-thumb]:bg-gray-300
               "
        >
          <div className="p-1.5 min-w-full inline-block align-middle ">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y-2 border-4 border-black divide-black ">
                <thead>
                  <tr className="text-black">
                    <th
                      scope="col"
                      className="py-3 border-4 border-black text-[10px] lg:text-[25px] p-2 flex-1"
                    >
                      Rank
                    </th>
                    <th
                      scope="col"
                      className="py-3 border-4 border-black text-[10px] lg:text-[25px] p-2 flex-1"
                    >
                      Student Number
                    </th>
                    <th
                      scope="col"
                      className="py-3 border-4 border-black text-[10px] lg:text-[25px] flex-1"
                    >
                      First Name
                    </th>
                    <th
                      scope="col"
                      className="py-3 border-4 border-black text-[10px] lg:text-[25px] flex-1"
                    >
                      Middle Name
                    </th>
                    <th
                      scope="col"
                      className="py-3 border-4 border-black text-[10px] lg:text-[25px] flex-1"
                    >
                      Last Name
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-5 border-4 border-black text-[10px] lg:text-[25px] flex-1"
                    >
                      Stars
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-5 border-4 border-black text-[10px] lg:text-[25px] flex-1"
                    >
                      Settings
                    </th>
                  </tr>
                </thead>
                <tbody className="min-w-full text-center border-2 border-black divide-black text-black">
                  {all.map((item, idx) => (
                    <tr key={idx}>
                      <td
                        name="rank"
                        className="border-4 p-2 text-[10px] lg:text-[25px] border-black"
                      >
                        {idx + 1}
                      </td>
                      <td
                        name="_id"
                        className="border-4 p-2 text-[10px] lg:text-[25px] border-black"
                      >
                        {item.school}
                      </td>
                      <td className="border-4 p-2 text-[10px] lg:text-[25px] border-black">
                        {item.firstName}
                      </td>
                      <td className="border-4 p-2 text-[10px] lg:text-[25px] border-black">
                        {item.middleName}
                      </td>
                      <td className="border-4 p-2 text-[10px] lg:text-[25px] border-black">
                        {item.lastName}
                      </td>
                      <td className="border-4 p-2 text-[10px] lg:text-[25px] border-black">
                        {item.stars}
                      </td>
                      <td className="border-2 p-2 border-black">
                        <div className="flex flex-row justify-center items-center gap-5">
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-600 px-3 text-white py-3 rounded-md hover:scale-105 duration-100"
                          >
                            DELETE
                          </button>
                          <button className="bg-blue-600 text-white px-3 py-3 rounded-md hover:scale-105 duration-100">
                            MODIFY
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col justify-center items-center m-5">
          <Link
            className="px-10 py-3 lg:text-[20px] text-[10px] bg-red-600 hover:scale-105 duration-100 rounded-full text-white font-bold"
            data-hs-overlay="#hs-sign-out-alert-small-window"
          >
            SIGN OUT
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Temporary;
