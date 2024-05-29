import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";

const Temporary = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" },
    { id: 5, name: "Eve" },
  ]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex items-center justify-center mb-4">
        <FaStar className="text-yellow-500 mr-2" />
        <h1 className="text-2xl font-bold">Leaderboard</h1>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {users.map((user) => (
          <div key={user.id} className="flex text-black items-center px-4 py-3 border-b">
            <div className="flex items-center flex-1">
              <div className="flex-shrink-0">
                <BsPersonFill className="text-gray-500" />
              </div>
              <div className="ml-3">
                <div className="font-semibold">{user.name}</div>
              </div>
            </div>
            <div className="flex items-center">
              <FaStar className="text-yellow-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Temporary;
