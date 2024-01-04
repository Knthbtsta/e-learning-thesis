import { useCallback, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaRegStar, FaStar } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";

import { Link } from "react-router-dom";

const Space = () => {
  //const [cur, setCur] = useState(0);

  const [arr, setArr] = useState(
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      lvl: i + 1,
      done: false,
      stars: getRandomNumber(1, 3),
    }))
  );

  useEffect(() => {
    let clone = [...arr]; //spread the rows array into a new array

    let obj = clone[0];

    obj.done = true;
    clone[0] = obj;

    setArr([...clone]);
  }, []);

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleTrue = (e, index) => {
    e.preventDefault();

    let clone = [...arr]; //spread the rows array into a new array

    let obj = clone[index];
    let obj1 = clone[index + 1];

    obj.done = true;
    obj1.done = true;

    clone[index] = obj;
    clone[index + 1] = obj1;

    setArr([...clone]);
  };

  //const len = 50;

  //   const leftHandle = () => {
  //     setCur(cur - 1 < 0 ? len - 1 : cur - 1);
  //   };

  //   const rightHandle = useCallback(() => {
  //     setCur(cur + 1 > len - 1 ? 0 : cur + 1);
  //   }, [cur, len]);

  //   const SlideItem = ({ slide }) => <div className="item"> {slide} </div>;

  return (
    <div className="bg-[url('/Space.png')] bg-cover bg-no-repeat">
      {/* <FaArrowLeft className="leftBtn" onClick={leftHandle} />
      <FaArrowRight className="rightBtn" onClick={rightHandle} /> */}
      <h1 className="mb-10 py-5 text-center font-bold text-5xl">Space Island</h1>
      <div className="grid grid-cols-6 gap-x-5 gap-y-12 mx-20 pb-20">
        {/* CELL */}
        {arr.map((item, index) => (
          <button
            to="/content"
            state={{ item: item }}
            key={index}
            onClick={(e) => handleTrue(e, index)}
            className="hover:scale-110 transition duration-500 cursor-pointer bg-violet-400 border-2 border-cyan-800 text-center font-bold p-5 h-[100px] rounded-xl flex flex-col relative justify-center items-center mt-5"
          >
            {item.done ? (
              <div>
                <div className="absolute -top-10 left-0 flex flex-row justify-center items-center w-full">
                  {item.stars === 3 && (
                    <div className="flex flex-row justify-center items-center w-full">
                      <FaStar size={30} color="#ffd100" />
                      <FaStar size={30} color="#ffd100" />
                      <FaStar size={30} color="#ffd100" />
                    </div>
                  )}
                  {item.stars === 2 && (
                    <div className="flex flex-row justify-center items-center w-full">
                      <FaStar size={30} color="#ffd100" />
                      <FaStar size={30} color="#ffd100" />
                      <FaRegStar size={30} />
                    </div>
                  )}
                  {item.stars === 1 && (
                    <div className="flex flex-row justify-center items-center w-full">
                      <FaStar size={30} color="#ffd100" />
                      <FaRegStar size={30} />
                      <FaRegStar size={30} />
                    </div>
                  )}
                </div>
                <h1 className="text-5xl">{item.lvl}</h1>
              </div>
            ) : (
              <div>
                <GiPadlock size={30} />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* {Array(50)
        .fill("")
        .map((_, index) => {
          return (
            <div key={index}>
              {cur === index && <SlideItem slide={index + 1} />}
            </div>
          );
        })} */}
    </div>
  );
};

export default Space;
