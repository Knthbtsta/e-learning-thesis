import React from 'react'
import {useState, useEffect} from "react"
import axios from "axios";
import API_LINK from '../API';
const AddNewStudent = () => {

    const [all, setAll] = useState([]);

  const [info, setInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(API_LINK);

      setAll(res.data);
    };

    fetchData();
  }, []);

  const handleSearch = async (e) => {
    try {
      e.preventDefault();

      const id = info._id;

      const result = await axios.get(`${API_LINK}/${id}`);

      setInfo(result.data);
    } catch (e) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();

      const id = info._id;

      const result = await axios.patch(`${API_LINK}/${id}`, info);

      console.log(result);
    } catch (e) {
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    try {
      e.preventDefault();

      const id = info._id;

      const result = await axios.delete(`${API_LINK}/${id}`);

      console.log(result);
    } catch (e) {
      console.log(err);
    }
  };

  const handleAdd = async (e) => {
    try {
      const result = await axios.post(API_LINK, info);

      console.log(result);
    } catch (e) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setInfo((prev) => ({
      ...prev,

      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
    
    <div className="flex flex-col justify-center items-center text-center">
  <form>
    {/* Your input fields remain the same */}
    
  </form>
  <div>
    <table className="min-w-full  border-gray-300">
      <thead>
        <tr>
          <th className="border p-2">Object ID</th>
          <th className="border p-2">First Name</th>
          <th className="border p-2">Last Name</th>
          <th className="border p-2">Email</th>
        </tr>
      </thead>
      <tbody>
        {all.map((item, idx) => (
          <tr key={idx}>
            <td className="border p-2">{item._id}</td>
            <td className="border p-2">{item.firstName}</td>
            <td className="border p-2">{item.lastName}</td>
            <td className="border p-2">{item.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="flex justify-between">
    {/* Your buttons remain the same */}
    <button onClick={handleAdd}>Add New Info</button>
            <button onClick={handleSearch}>Search Info</button>
            <button onClick={handleUpdate}>Update Info</button>
            <button onClick={handleDelete}>Delete Info</button>
  </div>
</div>
</>

  )
}

export default AddNewStudent