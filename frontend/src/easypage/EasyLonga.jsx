import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import API_LINK from "../API";

const EasyLonga = () => {
  const [all, setAll] = useState([]);

  const [info, setInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${API_LINK}/info/`);

      setAll(res.data);
    };

    fetchData();
  }, []);

  const handleSearch = async (e) => {
    try {
      e.preventDefault();

      const id = info._id;

      const result = await axios.get(`${API_LINK}/info/${id}`);

      setInfo(result.data);
    } catch (e) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();

      const id = info._id;

      const result = await axios.patch(`${API_LINK}/info/${id}`, info);

      console.log(result);
    } catch (e) {
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    try {
      e.preventDefault();

      const id = info._id;

      const result = await axios.delete(`${API_LINK}/info/${id}`);

      console.log(result);
    } catch (e) {
      console.log(err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(info);
    try {
      const result = await axios.post(`${API_LINK}/info`, info);

      console.log(result);
    } catch (e) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    try {
      setInfo((prev) => ({
        ...prev,

        [e.target.name]: e.target.value,
      }));
    } catch (e) {
      console.log(err);
    }
  };

  // const calculateAge = (birthDate) => {
  //   const today = new Date();
  //   const birthDateObj = new Date(birthDate);
  //   let age = today.getFullYear() - birthDateObj.getFullYear();
  //   const monthDiff = today.getMonth() - birthDateObj.getMonth();
  //   if (
  //     monthDiff < 0 ||
  //     (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
  //   ) {
  //     age--;
  //   }

  //   return age;
  // };
  return (
    <div className="flex flex-col justify-center items-center text-center text-white">
      <form className="text-black">
        <input
          type="text"
          value={info.firstName}
          onChange={handleChange}
          name="firstName"
          placeholder="First Name"
        />

        <input
          type="text"
          value={info.lastName}
          onChange={handleChange}
          name="lastName"
          placeholder="Last Name"
        />

        <input
          onChange={handleChange}
          type="text"
          value={info.age}
          name="age"
          placeholder="Age"
        />
        <input
          onChange={handleChange}
          type="text"
          value={info.address}
          name="address"
          placeholder="address"
        />

        <input
          type="email"
          value={info.email}
          onChange={handleChange}
          name="email"
          placeholder="Email"
        />
        <div className="flex justify-between">
          <button onClick={handleAdd}>Add New Info</button>
          <button onClick={handleSearch}>Search Info</button>
          <button onClick={handleUpdate}>Update Info</button>
          <button onClick={handleDelete}>Delete Info</button>
        </div>
      </form>
      <div>
        {all.map((item, idx) => (
          <div key={idx}>
            <p>{item._id}</p>
            <p>{item.firstName}</p>
            <p>{item.lastName}</p>

            <p>{item.age}</p>
            <p>{item.address}</p>
            <p>{item.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EasyLonga;
