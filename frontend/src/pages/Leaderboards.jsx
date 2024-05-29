import React from "react";
import API_LINK from "../API";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useSearchParams } from "react-router-dom";

const Leaderboards = () => {

    const [all, setAll] = useState([]);

    const [user, setUser] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");


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


  return (
    <div className="bg-[url('/official.png')] h-screen bg-cover bg-no-repeat overflow-hidden flex flex-col justify-center">
      <div className="flex flex-col justify-center items-center text-[50px] text-black pb-[20px]">
        LEARDERBOARDS
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
              <table className="min-w-full divide-y-2 border-4 border-black  divide-black ">
                <thead>
                  <tr className="text-black">
                    <th
                      scope="col"
                      className="py-3 border-4  border-black text-[15px] lg:text-[25px] p-2 flex-1"
                    >
                      Rank
                    </th>
                    <th
                      scope="col"
                      className="py-3 border-4  border-black text-[15px] lg:text-[25px] p-2 flex-1"
                    >
                      Student Number
                    </th>
                    <th
                      scope="col"
                      className="py-3 border-4  border-black text-[15px] lg:text-[25px] flex-1"
                    >
                      First Name
                    </th>
                    <th
                      scope="col"
                      className="py-3 border-4  border-black text-[15px] lg:text-[25px] flex-1"
                    >
                      Middle Name
                    </th>
                    <th
                      scope="col"
                      className="py-3 border-4  border-black text-[15px] lg:text-[25px] flex-1"
                    >
                      Last Name
                    </th>
                    <th
                      scope="col"
                      className="py-3 border-4  border-black text-[15px] lg:text-[25px] flex-1"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-5 border-4  border-black text-[15px] lg:text-[25px] flex-1"
                    >
                      Stars
                    </th>
                  </tr>
                </thead>
                <tbody className="min-w-full text-center border-2 border-black divide-black text-black">
                  {/* Map through the filtered and sorted data */}
                  {all.map((item, idx) => (
                    <tr key={idx}>
                      {/* Render the rank */}
                      <td
                        name="rank"
                        className="border-4 p-2 text-[15px] lg:text-[25px] border-black"
                      >
                        {idx + 1} {/* Add 1 to idx since rank starts from 1 */}
                      </td>
                      {/* Render other table data */}
                      <td
                        name="_id"
                        className="border-4 p-2 text-[15px] lg:text-[25px] border-black"
                      >
                        {item.school}
                      </td>
                      <td className="border-4 p-2 text-[15px] lg:text-[25px] border-black">
                        {item.firstName}
                      </td>
                      <td className="border-4 p-2 text-[15px] lg:text-[25px] border-black">
                        {item.middleName}
                      </td>
                      <td className="border-4 p-2 text-[15px] lg:text-[25px] border-black">
                        {item.lastName}
                      </td>
                      <td className="border-4 p-2 text-[15px] lg:text-[25px] border-black">
                        {item.email}
                      </td>
                      <td className="border-4 p-2 text-[15px] lg:text-[25px] border-black">
                        {item.stars}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboards;
