import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../balloon.css"; // Import CSS file for styles

const BalloonGame = () => {
  const location = useLocation();
  const { items } = location.state;
  console.log("item", items);
  // Function to generate an array of letters from A to Z
  const generateLettersArray = () => {
    const letters = [];
    for (let i = 65; i <= 90; i++) {
      letters.push(String.fromCharCode(i));
    }
    return letters;
  };

  // Generate the letters array
  const letters = generateLettersArray();

  // Shuffle the letters array
  const shuffledLetters = letters.sort(() => Math.random() - 0.5);

  // Calculate the number of rows and columns based on gridSize
  const gridSize = 6; // Adjust the grid size as needed
  const numRows = Math.ceil(letters.length / gridSize);
  const numCols = gridSize;

  // Create an array of arrays to represent the grid
  const grid = [];
  let index = 0;
  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let j = 0; j < numCols; j++) {
      row.push(shuffledLetters[index++]);
    }
    grid.push(row);
  }

  // Create an array of heart icons for each letter
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

  // State to track which letters have been clicked
  const [clickedLetters, setClickedLetters] = useState(
    Array("WAVE".length).fill(false)
  );

  // Function to handle click on heart icons
  const handleHeartClick = (letter) => {
    // Find all occurrences of the clicked letter in "WAVE"
    const indices = [];
    for (let i = 0; i < "WAVE".length; i++) {
      if ("WAVE"[i] === letter) {
        indices.push(i);
      }
    }
    // Update the state for each occurrence
    const updatedClickedLetters = [...clickedLetters];
    indices.forEach((index) => {
      updatedClickedLetters[index] = !updatedClickedLetters[index];
    });
    setClickedLetters(updatedClickedLetters);
  };

  // Function to handle click on letters
  const handleLetterClick = (letter) => {
    // Find all occurrences of the clicked letter in "WAVE"
    const indices = [];
    for (let i = 0; i < "WAVE".length; i++) {
      if ("WAVE"[i] === letter) {
        indices.push(i);
      }
    }
    // Update the state for each occurrence
    const updatedClickedLetters = [...clickedLetters];
    indices.forEach((index) => {
      updatedClickedLetters[index] = !updatedClickedLetters[index];
    });
    setClickedLetters(updatedClickedLetters);
  };

  // Function to handle text-to-speech for the word "WAVE"
  const handlePlayTextToSpeech = () => {
    const utterance = new SpeechSynthesisUtterance("WAVE");
    window.speechSynthesis.speak(utterance);
  };

  // State to track if all letters in "WAVE" are yellow
  const [allLettersYellow, setAllLettersYellow] = useState(false);

  useEffect(() => {
    // Check if all letters in "WAVE" are yellow
    const allYellow = clickedLetters.every((isClicked) => isClicked);
    setAllLettersYellow(allYellow);
  }, [clickedLetters, setAllLettersYellow]);

  // Function to handle canceling the modal
  const handleCancel = () => {
    // Reset allLettersYellow to false to enable hover animation and clicks on letters
    setAllLettersYellow(false);
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
                    allLettersYellow ? "pointer-events-none" : ""
                  }`}
                  onClick={() => handleLetterClick(letter, rowIndex, colIndex)}
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
          <div className="text-[300px] text-black">Aa</div>
          <div className="flex justify-center items-center gap-10">
            <div className="text-[100px]">
              <button
                onClick={handlePlayTextToSpeech}
                className="bg-green-600 text-white py-2 px-6 rounded-[50px]"
              >
                PLAY
              </button>
            </div>
            <div className="text-[150px]">
              {clickedLetters.map((isClicked, index) => (
                <span
                  className=""
                  key={index}
                  style={{ color: isClicked ? "yellow" : "black" }}
                >
                  {"WAVE"[index]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Modal to show when all letters in "WAVE" are clicked and yellow */}
      {allLettersYellow && (
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
