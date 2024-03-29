import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar2 from "../components/Navbar2";
import { Link, useNavigate } from "react-router-dom";
import AvatarImage from "../assets/img/Phonics6.png";
import AvatarImage1 from "../assets/img/avataaars1.png";
import AvatarImage2 from "../assets/img/avataaars2.png";
import AvatarImage3 from "../assets/img/avataaars3.png";
import AvatarImage4 from "../assets/img/avataaars4.png";
import AvatarImage5 from "../assets/img/avataaars5.png";
import AvatarImage6 from "../assets/img/avataaars6.png";
import AvatarImage7 from "../assets/img/avataaars7.png";
import AvatarImage8 from "../assets/img/avataaars8.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const StudentProfile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [selectedAvatar, setSelectedAvatar] = useState(""); // State to manage selected avatar

  // Array of avatar images
  const avatarImages = [
    AvatarImage1,
    AvatarImage2,
    AvatarImage3,
    AvatarImage4,
    AvatarImage5,
    AvatarImage6,
    AvatarImage7,
    AvatarImage8,
    // Add more avatar image URLs as needed
  ];

  useEffect(() => {
    const fetch = async () => {
      try {
        const userDetailResponse = await axios.get(
          `http://localhost:8800/api/user/${id}`
        );
        console.log(userDetailResponse);
        if (userDetailResponse.status === 200) setUser(userDetailResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  // Function to handle avatar selection
  const handleAvatarSelection = (avatar) => {
    setSelectedAvatar(avatar);
  };

  // Function to handle saving selected avatar
  const handleSaveAvatar = async () => {
    try {
      // Send a PUT request to update the user's image
      const response = await axios.patch(
        `http://localhost:8800/api/user/${id}`,
        { image: selectedAvatar }
      );
      console.log(response.data); // Log response from the server
      setShowModal(false); // Close modal after saving
      // Update user state or perform any necessary actions
      window.location.reload();
    } catch (error) {
      console.error("Error updating user image:", error);
    }
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const handleOpen = () => {
    setShowModal(true);
  };
  return (
    <div>
      <div
        id="hs-sign-out-alert-small-window"
        className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-xs sm:w-full m-3 sm:mx-auto">
          <div className="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-gray-800">
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
              <span className="mb-4 inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500 dark:bg-yellow-700 dark:border-yellow-600 dark:text-yellow-100">
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
              <h3 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-200">
                Sign out
              </h3>
              <p className="text-gray-500">
                Are you sure you would like to sign out of your Preline account?
              </p>
              <div className="mt-6 grid gap-y-2">
                <Link
                  className="py-2.5 px-4 w-full inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
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
                  className="py-2.5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  data-hs-overlay="#hs-sign-out-alert-small-window"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl text-black font-bold mb-4">Choose Avatar</h2>
            <div className="grid grid-cols-4 gap-4">
              {/* Render avatar options */}
              {avatarImages.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className={`cursor-pointer rounded-lg w-[150px] h-[150px] ${
                    selectedAvatar === avatar ? "border-4 border-blue-500" : ""
                  }`}
                  onClick={() => handleAvatarSelection(avatar)}
                />
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <button
                onClick={handleSaveAvatar}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
              >
                Save
              </button>
              <button
                onClick={handleClose}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Profile Content */}
      <div className="bg-[url('/background2.png')] sm:h-screen md:h-screen bg-no-repeat bg-cover  flex flex-col xl:h-screen bg-orange-100 ">
        <div className="container mx-auto py-[120px]">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center pt-5">
                  <div className="w-[150px] h-[150px] rounded-full mb-4 shrink-0">
                    {user.image && (
                      <img
                        src={user.image}
                        alt="User Avatar"
                        className="w-full h-full object-cover rounded-full"
                      />
                    )}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <a
                      href="#"
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                      onClick={handleOpen} // Open modal on click
                    >
                      Change Photo
                    </a>
                    <a
                      href="#"
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                    >
                      Edit Profile
                    </a>
                  </div>
                  <h1 className="text-xl font-bold py-5 text-black text-[30px]">
                    FULL NAME
                  </h1>
                  <span className="text-gray-700 text-[20px]">
                    {user.firstName} {user.middleName}, {user.lastName}
                  </span>
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className>
                  <span className="text-gray-700 uppercase font-bold tracking-wider mb-2 px-2 text-[30px]">
                    STARS
                  </span>
                  <FontAwesomeIcon
                    icon={faStar}
                    style={{
                      color: "#FFD43B",
                      fontSize: "3rem",
                      paddingTop: "10px",
                    }} // Adjust the fontSize as needed
                    bounce
                  />
                  <span className="text-gray-700 uppercase font-bold tracking-wider mb-2 text-[30px] px-2">
                    {user.stars}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-[40px] text-black font-bold mb-4">
                  Student ID: {user.user_id}
                </h2>
                <div className="mb-6">
                  <div className="flex justify-between flex-wrap gap-2 w-full">
                    <span className="text-gray-700 font-bold text-[30px]">
                      Section
                    </span>
                  </div>
                  <p className="text-black">{user.section}</p>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between flex-wrap gap-2 w-full">
                    <span className="text-gray-700 font-bold text-[30px]">
                      First Name
                    </span>
                  </div>
                  <p className="text-black">{user.firstName}</p>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between flex-wrap gap-2 w-full">
                    <span className="text-gray-700 font-bold text-[30px]">
                      Middle Name
                    </span>
                  </div>
                  <p className="text-black">{user.middleName}</p>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between flex-wrap gap-2 w-full">
                    <span className="text-gray-700 font-bold text-[30px]">
                      Last Name
                    </span>
                  </div>
                  <p className="text-black">{user.lastName}</p>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between flex-wrap gap-2 w-full">
                    <span className="text-gray-700 font-bold text-[30px]">
                      E-mail
                    </span>
                  </div>
                  <p className="text-black">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
