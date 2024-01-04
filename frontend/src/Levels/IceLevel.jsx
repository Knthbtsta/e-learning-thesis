import React from "react";
import { useLocation } from "react-router-dom";

const IceLevel = () => {
  const location = useLocation();
  // console.log(location.state.item.item);
  const { item } = location.state.item;
  // console.log(item)
  return (
    <div>
      <p>{item.id}</p>
      <p>{item.lvl}</p>
      <p>{item.done ? "true" : "false"}</p>
      <p>{item.stars}</p>
    </div>
  );
};

export default IceLevel;
