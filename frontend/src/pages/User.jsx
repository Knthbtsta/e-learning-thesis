import React from "react";
import { Link } from "react-router-dom";

const User = () => {
  return (
    <section className="bg-[url('/background2.png')] h-screen bg-no-repeat bg-cover">
      <div className="flex flex-col justify-center items-center text-center pt-64">
        <div className=" text-white rounded-lg  bg-cyan-600 p-10 pt-12 pb-12">
          <h1 className="text-3xl">ARE YOU A ADMIN OR STUDENT?</h1>
          <div className="flex flex-col gap-10 mt-10 text-2xl">
            <Link
              to="/signupuser"
              href="/signupuser"
              className="bg-amber-500 hover:bg-amber-600 px-14 py-4 rounded-lg"
            >
              STUDENT
            </Link>
            <div class="py-3 flex items-center text-sm  before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 text-white dark:before:border-gray-600 dark:after:border-gray-600">
              OR
            </div>
            <Link
              to="/signupadmin"
              href="/signupadmin"
              className="bg-amber-500 hover:bg-amber-600 px-14 py-4 rounded-lg"
            >
              ADMIN
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default User;
