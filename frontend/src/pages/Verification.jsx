import React from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Aa from "../assets/img/LoginImage.png";
import Bb from "../assets/img/LOGINBG.png";

const Verification = () => {
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
        "http://localhost:8800/api/send-verification-email",
        formData
      );

      console.log("Email sent successfully!", response.data);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  return (
    <section className="bg-[url('/gbg.png')] min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="bg-[#4D6A1C] flex rounded-2xl shadow-lg max-w-7xl items-center p-5">
        {/* FORM */}
        <div className="flex flex-col justify-center items-center md:w-1/2 px-16 text-[#FFFFFF]">
          <p className="mt-5 text-1xl">PLEASE CLICK THE VERIFICATION LINK</p>
          <p className="mt-5 text-1xl">PROVIDED TO YOUR EMAIL:</p>
          <p className="mt-5 text-1xl"> {email} </p>
          <button
            className="text-2xl mt-5 text-white hover:text-black bg-green-700 py-3 px-4 rounded-xl"
            onClick={handleVerifyClick}
          >
            SEND LINK
          </button>
          <div className="mt-5 text-xl flex justify-between">
            <Link to="/signupuser">Create an account again..</Link>
          </div>
          <div className="flex justify-center items-center py-10 gap-10">
            <div className="py-5 px-5 bg-red-600 rounded-lg">
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
