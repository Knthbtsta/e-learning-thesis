import React from 'react'
import Aa from "../assets/img/LoginImage.png";
import { Link } from "react-router-dom";

const VerificationSuccess = () => {
  return (
    <section className="bg-[url('/gbg.png')] min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="bg-[#4D6A1C] flex rounded-2xl shadow-lg max-w-7xl items-center p-5">
        {/* FORM */}
        <div className="flex flex-col justify-center items-center md:w-1/2 px-16 text-[#FFFFFF]">
          <p className="mt-5 text-1xl">PLEASE CLICK THE VERIFICATION LINK</p>
          <p className="mt-5 text-1xl">PROVIDED TO YOUR EMAIL:</p>
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
          <img src={Aa} className="rounded-2xl h-[700px] w-[500px]" />
        </div>
      </div>
    </section>
  )
}

export default VerificationSuccess