import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../balloon.css"; // Import CSS file for styles
import axios from "axios"; // Import Axios for HTTP requests
import { useSearchParams } from "react-router-dom";
import { BsBalloonHeartFill } from "react-icons/bs";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

const BalloonGame = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const dungeonName = searchParams.get("dungeonName");
  const [words, setWords] = useState([]);
  const [stars, setStars] = useState(0); // Initialize stars state
  const location = useLocation();
  const { item } = location.state;
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  console.log(location.state);

  useEffect(() => {
    // Fetch initial stars count from the database
    fetchStarsCount();

    if (item && item.words && item.words.length > 0) {
      const randomIndex = Math.floor(Math.random() * item.words.length);
      setWords([item.words[randomIndex]]);
    }
  }, [item]);

  useEffect(() => {
    // Use a setTimeout to change the image every 2 seconds (adjust as needed)
    const timeoutId = setTimeout(() => {
      const nextImageIndex = (currentImageIndex + 1) % item.image.length;
      setCurrentImageIndex(nextImageIndex);
    }, 2000); // Change image every 2 seconds (adjust as needed)

    // Cleanup the timeout when component unmounts or when the word changes
    return () => clearTimeout(timeoutId);
  }, [currentImageIndex, item.image]);

  const fetchStarsCount = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api/user/${id}`);
      const initialStars = response.data.stars;
      setStars(initialStars);
    } catch (error) {
      console.error("Error fetching stars count:", error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const userDetailResponse = await axios.get(
          `http://localhost:8800/api/user/${id}`
        );
        console.log(userDetailResponse);
        if (userDetailResponse.status === 200) setUser(userDetailResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const updateStarsCount = async (newStars) => {
    try {
      await axios.patch(`http://localhost:8800/api/user/${id}`, {
        stars: newStars,
      });
    } catch (error) {
      console.error("Error updating stars count:", error);
    }
  };

  const generateLettersArray = () => {
    const letters = [];
    for (let i = 65; i <= 90; i++) {
      letters.push(String.fromCharCode(i));
    }
    return letters;
  };

  const letters = generateLettersArray();
  const shuffledLetters = letters.sort(() => Math.random() - 0.5);
  const gridSize = 6;
  const numRows = Math.ceil(letters.length / gridSize);
  const numCols = gridSize;
  const grid = [];
  let index = 0;
  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let j = 0; j < numCols; j++) {
      row.push(shuffledLetters[index++]);
    }
    grid.push(row);
  }

  const [typedWord, setTypedWord] = useState("");

  const handleLetterClick = (letter) => {
    setTypedWord((prevTypedWord) => prevTypedWord + letter);
  };

  const handleHeartClick = () => {
    // You can add any functionality you want here
    console.log("Heart clicked!");
  };

  const heartIcons = letters.map((letter, idx) => (
    <button
      key={idx}
      className="heart-btn "
      onClick={() => handleHeartClick(letter)}
    >
      <BsBalloonHeartFill
        className="heart-icon "
        style={{ fontSize: "8rem" }}
      />
    </button>
  ));

  const handlePlayTextToSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(words);
    window.speechSynthesis.speak(utterance);
  };

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typedWord && words[0]) {
      const isMatch = typedWord.toLowerCase() === words[0].toLowerCase();
      if (isMatch && !showModal) {
        setShowModal(true);
        // Increment stars when word matches
        const newStars = stars + 1;
        setStars(newStars);
        // Update stars count in the database
        updateStarsCount(newStars);
      } else if (!isMatch && showModal) {
        setShowModal(false);
      }
    }
  }, [typedWord, words, showModal, stars]);

  const handleCancel = () => {
    setTypedWord("");
    setShowModal(false);
    navigate(`/speech?id=${id}&dungeonName=${dungeonName}`, {
      state: { words: words, currentImageIndex: image },
    }); // Navigate to the other page with URL parameters
  };

  return (
    <div className="h-screen w-full bg-[url('/minigamebg.png')] bg-no-repeat bg-cover">
      <div className="text-[50px] text-black pl-10 pt-5">
        {" "}
        <FontAwesomeIcon
          icon={faStar}
          style={{
            color: "#FFD43B",
            fontSize: "4rem",
            paddingTop: "10px",
          }} // Adjust the fontSize as needed
          bounce
        />
        {user.stars}
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[45%] flex justify-center items-center">
          <div className="pl-20 pt-5">
            <div className="p-5 bg-[url('/minigamebg.png')] rounded-[100px] border-[10px] border-black pt-10">
              {grid.map((row, rowIndex) => (
                <div
                  className="text-red-700 text-[40px]"
                  key={rowIndex}
                  style={{ display: "flex" }}
                >
                  {row.map((letter, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      style={{ padding: "2px", position: "relative" }}
                      onClick={() => handleLetterClick(letter)}
                      className={`animated-item text-red-700 ${
                        showModal ? "pointer-events-none" : ""
                      }`}
                    >
                      <div className="letter text-5xl absolute -bottom-6 font-bold text-white">
                        {letter}
                      </div>
                      {heartIcons[rowIndex * numCols + colIndex]}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[55%] flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center">
              {item.image.map((image, index) => (
                <div
                  key={index}
                  style={{
                    display: index === currentWordIndex ? "block" : "none", // Use currentWordIndex to sync with the current word
                  }}
                >
                  <img src={`/images/${image}`} className="h-[500px]" alt="" />
                </div>
              ))}
              <div className="text-[300px] text-black bounce-in pr-20">
                {dungeonName}
              </div>
            </div>
            <div className=" text-black px-10 border-8 border-black bg-white text-center pb-10">
              <h1 className="text-[100px] border-b-8 border-black">
                {words[0]}
              </h1>
              <div className="flex">
                <button
                  onClick={handlePlayTextToSpeech}
                  className="flex  items-center justify-center text-center text-[40px] mt-5 py-1 px-4 rounded-lg bg-green-500 "
                >
                  <FaPlay /> Play
                </button>
                <div>
                  <input
                    type="text"
                    value={typedWord}
                    readOnly
                    className="rounded-xl  border-2 border-[#966347] text-[50px] w-[300px] mt-6 mx-14 text-center" // Adjust width as needed
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showModal && (
          <div
            id="modal"
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
          >
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  WELL DONE!!!!!
                </h2>
              </div>
              <div className="flex flex-col justify-center items-center pt-10">
                <button
                  type="button"
                  className="py-2.5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BalloonGame;
