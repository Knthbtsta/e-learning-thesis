import React from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Aa from "../assets/img/LoginImage.png";
import Bb from "../assets/img/LOGINBG.png";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;
  const email = formData ? formData.email : "";
  console.log(formData);
  const handleVerifyClick = async () => {
    try {
      if (!formData) {
        console.error("Form data is missing");
        return;
      }

      const response = await axios.post(
        "https://e-learning-thesis-tupm.onrender.com/api/send-verification-email",
        formData
      );
      navigate(`/verification-notification`);
      console.log("Email sent successfully!", response.data);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/gbg.png')] bg-cover bg-no-repeat flex items-center justify-center overflow-hidden">
      <div className="bg-[#4D6A1C] flex flex-col h-[400px] w-[300px] sm:h-[320px] sm:w-[500px] md:h-[320px] md:w-[500px] lg:w-[1000px] lg:h-[750px] lg:flex-row rounded-2xl shadow-lg items-center lg:p-5">
        {/* FORM */}
        <div className="flex flex-col justify-center items-center lg:w-1/2 lg:px-10 mt-10 md:mt-5 sm:mt-3 lg:mt-0 text-[#FFFFFF]">
          <p className="mt-5 text-[12px] lg:text-xl">
            PLEASE CLICK THE VERIFICATION
          </p>
          <div className="flex flex-col justify-center items-center sm:flex-row lg:flex-col">
            <p className="mt-5 text-[12px] lg:text-xl">
              PROVIDED TO YOUR EMAIL:
            </p>
            <p className="mt-5 text-[12px] lg:text-xl"> {email} </p>
          </div>
          <button
            className="mt-5 text-[12px] lg:text-xl text-white hover:text-black bg-green-700 py-3 px-4 rounded-xl"
            onClick={handleVerifyClick}
          >
            SEND LINK
          </button>
          <div className="mt-3 lg:mt-5 text-[12px] lg:text-xl flex justify-between">
            <Link to="/signupuser">Create an account again..</Link>
          </div>
          <div className="flex flex-col justify-center items-center ">
            <p className="mt-5 text-[12px] lg:text-xl">
              IF YOU CLICK THE LINK PROVIDED
            </p>
            <div className="mt-5 text-[12px] lg:text-xl py-3 lg:py-3 px-5 bg-red-600 rounded-lg ">
              <Link to="/">HOME</Link>
            </div>
          </div>
        </div>
        {/* IMAGE */}
        <div className="invisible lg:visible">
          <img src={Bb} className="rounded-2xl h-[700px] w-[500px]" />
        </div>
      </div>
    </div>
    // <div className='flex flex-col justify-center items-center h-screen bg-'>
    //     <div className='flex flex-col justify-center items-center gap-y-5 bg-green-600 h-[300px] w-[500px]'>
    //         <p>PLEASE INPUT THE VERIFICATION CODE</p>
    //         <p>TO YOUR EMAIL: {email}</p>
    //         <button className='text-black' onClick={handleVerifyClick}>
    //             SEND LINK
    //         </button>
    //         <input type="text" className='rounded-2xl border-[5px] border-black text-black text-2xl' />
    //     </div>
    // </div>
  );
};
export default Verification;
