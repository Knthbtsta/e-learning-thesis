import { useCallback, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaRegStar, FaStar } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Ice = () => {
  //const [cur, setCur] = useState(0);
  const location = useLocation();
  const { item } = location.state;
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
    <div className="bg-[url('/Ice.png')] h-screen bg-cover bg-no-repeat">
      <div>
        {item.words &&
          item.words.map((items, index) => {
            console.log("items", items);
            return (
              <div key={index}>
                <h1>{items}</h1>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Ice;
