import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import { BsBalloonHeartFill } from "react-icons/bs";
import "../balloon.css"; // Import CSS file for styles

const BalloonGame = () => {
  // Hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const dungeonName = searchParams.get("dungeonName");
  const [words, setWords] = useState([]);
  const location = useLocation();
  const { item } = location.state;
  console.log("item", item);
  const [typedWord, setTypedWord] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // Add this line
  // Effects
  useEffect(() => {
    if (item && item.words && item.words.length > 0) {
      const randomIndex = Math.floor(Math.random() * item.words.length);
      setWords([item.words[randomIndex]]);
    }
  }, [item]);

  useEffect(() => {
    if (typedWord && words[0]) {
      setShowModal(typedWord.toLowerCase() === words[0].toLowerCase());
    }
  }, [typedWord, words[0]]);

  // Helper functions
  const generateLettersArray = () => {
    const letters = [];
    for (let i = 65; i <= 90; i++) {
      letters.push(String.fromCharCode(i));
    }
    return letters;
  };

  useEffect(() => {
    // Use a setTimeout to change the image every 2 seconds (adjust as needed)
    const timeoutId = setTimeout(() => {
      const nextImageIndex = (currentImageIndex + 1) % item.image.length;
      setCurrentImageIndex(nextImageIndex);
    }, 2000); // Change image every 2 seconds (adjust as needed)

    // Cleanup the timeout when component unmounts or when the word changes
    return () => clearTimeout(timeoutId);
  }, [currentImageIndex, item.image]);

  const handleHeartClick = (letter) => {
    setTypedWord((prevTypedWord) => prevTypedWord + letter);
  };

  const handlePlayTextToSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(words);
    window.speechSynthesis.speak(utterance);
  };

  const handleCancel = () => {
    setTypedWord("");
    setShowModal(false);
  };

  // Rendering
  const letters = generateLettersArray();
  const shuffledLetters = letters.sort(() => Math.random() - 0.5);
  const gridSize = 6;
  const numRows = Math.ceil(letters.length / gridSize);
  const numCols = gridSize;
  const grid = [];

  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let j = 0; j < numCols; j++) {
      row.push(shuffledLetters[i * numCols + j]);
    }
    grid.push(row);
  }

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

  return (
    <div className="bg-[url('/minigamebg.png')] h-screen  bg-no-repeat bg-cover pt-12 pb-12 ">
      {/* Left side */}
      <div className="bg-[url('/minigamebg.png')] bg-cover bg-center border-8 border-[#966347] flex flex-col justify-center w-1/2 h-full mx-12  ">
        <div className="">
          {grid.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="text-5xl  mx-16 "
              style={{ display: "flex" }}
            >
              {row.map((letter, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  style={{ padding: "2px", position: "relative" }}
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
      {/* Right side */}
      <div className="flex flex-col justify-center  bg-red-500">
        <div className="absolute -top-0 right-0 mr-[300px] pt-12">
          <div className="bg-yellow-500 border-8 border-[#966347]">
            {item.image.map((image, index) => (
              <div
                key={index}
                style={{
                  display: index === currentWordIndex ? "block" : "none", // Use currentWordIndex to sync with the current word
                }}
              >
                <img src={`/images/${image}`} className="h-[300px]" alt="" />
                <div className="text-black">{dungeonName}</div>
              </div>
            ))}
          </div>
          <div className=""></div>
        </div>
      </div>
      {/* Modal */}
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
  );
};

export default BalloonGame;
