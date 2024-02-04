import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../balloon.css"; // Import CSS file for styles
import { useSearchParams } from "react-router-dom";

const BalloonGame = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dungeonName = searchParams.get("dungeonName");
  const [words, setWords] = useState([]);
  const location = useLocation();
  const { item } = location.state;

  useEffect(() => {
    if (item && item.words && item.words.length > 0) {
      const randomIndex = Math.floor(Math.random() * item.words.length);
      setWords([item.words[randomIndex]]);
    }
  }, [item]);

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

  const heartIcons = letters.map((letter, idx) => (
    <button
      key={idx}
      className="heart-btn"
      onClick={() => handleHeartClick(letter)}
    >
      <FontAwesomeIcon
        icon={faHeart}
        className="heart-icon heart-icon-border"
        style={{ fontSize: "5.5rem" }}
      />
    </button>
  ));

  const [typedWord, setTypedWord] = useState("");

  const handleHeartClick = (letter) => {
    setTypedWord((prevTypedWord) => prevTypedWord + letter);
  };

  const handlePlayTextToSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(words);
    window.speechSynthesis.speak(utterance);
  };

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typedWord && words[0]) {
      if (typedWord.toLowerCase() === words[0].toLowerCase()) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    }
  }, [typedWord, words[0]]);

  const handleCancel = () => {
    setTypedWord("");
    setShowModal(false);
  };

  return (
    <div className="flex justify-center items-center h-full w-full bg-[url('/minigamebg.png')] bg-no-repeat bg-cover">
      <div className="w-[45%] h-screen flex justify-center items-center">
        <div className="p-5 bg-white rounded-[100px] border-[10px] border-black">
          {grid.map((row, rowIndex) => (
            <div
              className="text-red-700 text-[40px]"
              key={rowIndex}
              style={{ display: "flex" }}
            >
              {row.map((letter, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  style={{ padding: "5px", position: "relative" }}
                  className={`animated-item ${
                    showModal ? "pointer-events-none" : ""
                  }`}
                >
                  <div className="letter">{letter}</div>
                  {heartIcons[rowIndex * numCols + colIndex]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="h-screen w-[55%] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="text-[300px] text-black">{dungeonName}</div>
          <div className="text-[100px] gap-5">
            <button
              onClick={handlePlayTextToSpeech}
              className="bg-green-600 text-white py-2 px-4 rounded-[100px]"
            >
              PLAY
            </button>
            <span className="text-[150px] text-black">{words[0]}</span>
          </div>
          <div className="pt-10">
            <input
              type="text"
              value={typedWord}
              readOnly
              className="bg-white text-black text-[50px] rounded-[50px]"
            />
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
  );
};

export default BalloonGame;
