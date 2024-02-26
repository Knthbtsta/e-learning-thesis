import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ChooseGame = () => {
  const location = useLocation();
  const { item } = location.state;
  const [all, setAll] = useState([]);

  useEffect(() => {
    if (item && Array.isArray(item.gameimage && item.minigame)) {
      setAll(item.gameimage);
    }
  }, [item]); // useEffect will run whenever 'item' changes

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[url('/minigamebg.png')] bg-no-repeat bg-cover ">
      <div className="flex justify-center items-center w-screen h-[20%]">
        {all.map((gameimage, idx) => (
          <div key={idx} style={{ margin: "-150px" }}>
            {/* Adjust margin to get images closer */}
            <button>
              <img src={`/images/${gameimage}`} className="h-[550px]" />
            </button>
            <div className="flex items-center justify-center text-black text-[100px]">
              {item.minigame[idx]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseGame;
