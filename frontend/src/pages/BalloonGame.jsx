import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faRotate } from "@fortawesome/free-solid-svg-icons";
import "../balloon.css"; // Import CSS file for styles
import axios from "axios"; // Import Axios for HTTP requests
import { useSearchParams } from "react-router-dom";
import { BsBalloonHeartFill } from "react-icons/bs";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { IoIosHelpCircle } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { BsArrowsFullscreen } from "react-icons/bs";
import { faMaximize } from "@fortawesome/free-solid-svg-icons";

const BalloonGame = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const dungeonName = searchParams.get("dungeonName");
  const [words, setWords] = useState([]);
  const [image, setImage] = useState(""); // Initialize image state
  const [stars, setStars] = useState(0); // Initialize stars state
  const location = useLocation();
  const { item } = location.state;
  const [user, setUser] = useState({});
  const [letterimage, setLetterImage] = useState("");
  const navigate = useNavigate();
  const [completedSets, setCompletedSets] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [clickedBalloons, setClickedBalloons] = useState([]);
  const [poppedBalloons, setPoppedBalloons] = useState([]);
  const [hintActive, setHintActive] = useState(false);
  const [correctLetter, setCorrectLetter] = useState("");
  const [showModal, setShowModal] = useState(false);

  console.log(location.state);

  useEffect(() => {
    // Fetch initial stars count from the database
    fetchStarsCount();

    // Set the initial word and image based on a random index
    if (
      item &&
      item.words &&
      item.words.length > 0 &&
      item.image &&
      item.image.length > 0 &&
      item.letterimage &&
      item.letterimage.length > 0
    ) {
      console.log("Number of words:", item.words.length);
      const randomIndex = Math.floor(Math.random() * item.words.length);
      console.log("Random index:", randomIndex);
      setWords([item.words[randomIndex]]);
      setImage(item.image[randomIndex]);
      setLetterImage(item.letterimage[randomIndex]);
    }
  }, [item]);
  console.log("words", words);
  console.log("image", image);
  const fetchStarsCount = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api/user/${id}`);
      const initialStars = response.data.stars;
      setStars(initialStars);
    } catch (error) {
      console.error("Error fetching stars count:", error);
    }
  };

  const handleReset = () => {
    setTypedWord(""); // Clear the typed word when reset is clicked
  };

  useEffect(() => {
    if (completedSets === 3) {
      // Implement logic to handle completion of all sets
      setCompletedSet(true);
      console.log("All sets completed!");
    }
  }, [completedSets]);

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

  const handleLetterClick = (letter, rowIndex, colIndex) => {
    setTypedWord((prevTypedWord) => prevTypedWord + letter);
    setPopped(true);
    setHintActive(false); // Reset hint when a letter is clicked

    // Check if the clicked letter matches the next letter in the word
    if (letter.toLowerCase() !== words[0][typedWord.length].toLowerCase()) {
      // If it doesn't match, set the correct letter for hint animation
      setCorrectLetter(words[0][typedWord.length].toUpperCase());

      // Trigger hint animation on the balloon associated with the correct letter
      setTimeout(() => {
        setHintActive(true);
      }, 500); // Adjust the delay as needed
    } else {
      // If it matches, clear the correct letter for hint animation
      setCorrectLetter("");
    }
  };
  // Add a useEffect hook to trigger the hint when the user takes too long to click a balloon
  useEffect(() => {
    const hintTimer = setTimeout(() => {
      if (!typedWord.includes(correctLetter)) {
        setHintActive(true);
      }
    }, 10000); // Adjust the time limit as needed (e.g., 10 seconds)

    return () => clearTimeout(hintTimer);
  }, [typedWord, correctLetter]);

  const handleHeartClick = () => {
    // You can add any functionality you want here
    console.log("Heart clicked!");
  };

  const heartIcons = letters.map((letter, idx) => (
    <div className="flex justify-center items-center">
      <button
        key={idx}
        className="heart-btn"
        onClick={() => handleHeartClick(letter)}
      >
        <BsBalloonHeartFill className="active:scale-75 transition-transform heart-icon text-red-700 sm:text-[45px] md:text-[50px] lg:text-[60px] xl:text-[85px] 2xl:text-[130px]" />
      </button>
    </div>
  ));

  const handlePlayTextToSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(words);
    window.speechSynthesis.speak(utterance);
  };

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
      state: { words: words, item: item },
    }); // Navigate to the other page with URL parameters
  };

  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia("(orientation: portrait)").matches
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
    };

    window.addEventListener("resize", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500); // Delay opening the modal by 500 milliseconds

    return () => clearTimeout(timer);
  }, []); // Run once on component mount

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleFullScreen = () => {
    const element = document.getElementById("container");
    const isFullScreen = document.fullscreenElement;

    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      element.requestFullscreen();
    }
  };

  useEffect(() => {
    // Set a timer to activate the hint after 3 seconds of inactivity
    const hintTimer = setTimeout(() => {
      setHintActive(true);
    }, 3000);

    // Clear the timer if the user interacts with a balloon
    const resetHintTimer = () => {
      clearTimeout(hintTimer);
      setHintActive(false);
    };

    // Attach event listeners to balloons to reset the hint timer
    const balloons = document.querySelectorAll(".balloon");
    balloons.forEach((balloon) => {
      balloon.addEventListener("click", resetHintTimer);
    });

    // Clean up event listeners when component unmounts
    return () => {
      balloons.forEach((balloon) => {
        balloon.removeEventListener("click", resetHintTimer);
      });
    };
  }, []);

  return (
    <div
      id="container"
      className="h-screen w-full flex flex-col justify-center bg-[url('/minigamebg.png')] bg-no-repeat bg-cover"
    >
      {/* Modal */}
      {isPortrait && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-100 z-50">
          <div className="bg-white p-8 rounded-lg">
            <p className="text-center text-5xl text-gray-800">
              Rotate to landscape to play
            </p>
          </div>
        </div>
      )}
      <div
        className={`fixed inset-0 flex items-center justify-center transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 999 }} // Set a high z-index to ensure the modal appears on top
      >
        <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
        <div className="relative bg-white p-8 rounded-[30px] border-[10px] border-black max-w-md transform transition-transform ease-in duration-300">
          <button
            className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
            onClick={closeModal}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <h2 className="text-center font-bold mb-4 text-black text-[50px]">
            TUTORIAL
          </h2>
          <p className="text-black text-[30px] text-center">
            POP THE BALLOON LETTER TO SPELL THE (A) WORD PICTURE. CLICK THE
            RESET BUTTON TO RESET THE TEXT FIELD.
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="sm:text-[20px] md:text-[25px] lg:text-[30px] xl:text-[30px] 2xl:text-[50px] text-black pl-10">
          {" "}
          <FontAwesomeIcon
            icon={faStar}
            className="text-yellow-400 sm:text-[20px] md:text-[25px] lg:text-[30px] xl:text-[30px] 2xl:text-[50px] animate-bounce"
          />
          {user.stars}
        </div>
        <div className="flex justify-center text-black">
          <button
            onClick={handleFullScreen}
            className="active:scale-75 transition-transform sm:text-[20px] md:text-[25px] lg:text-[30px] xl:text-[30px] 2xl:text-[50px]"
          >
            <FontAwesomeIcon icon={faMaximize} />
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center sm:gap-[220px] md:gap-[160px] lg:gap-[120px] xl:gap-[50px] 2xl:gap-[40px]">
        <div className="sm:w-[20%] md:w-[30%] lg:w-[35%] xl:w-[40%] 2xl:w-[45%] flex justify-center items-center">
          <div className="sm:pl-[220px] md:pl-[190px] lg:pl-[150px] xl:pl-[120px] 2xl:pl-20 2xl:pt-6 xl:pt-3">
            <div className="p-5 bg-[url('/minigamebg.png')] bg-cover rounded-[40px] sm:border-[5px] md:border-[5px] lg:border-[5px] xl:border-[5px] 2xl:border-[10px] shadow-lg border-black md:pt-5 xl:pt-10">
              {grid.map((row, rowIndex) => (
                <div
                  className="text-red-700"
                  key={rowIndex}
                  style={{ display: "flex" }}
                >
                  {row.map((letter, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      style={{ padding: "2px", position: "relative" }}
                      onClick={() =>
                        handleLetterClick(letter, rowIndex, colIndex)
                      }
                      className={`active:scale-75 transition-transform text-red-700 ${
                        showModal ||
                        poppedBalloons.includes(`${rowIndex}-${colIndex}`)
                          ? "pointer-events-none"
                          : ""
                      } ${
                        clickedBalloons.includes(`${rowIndex}-${colIndex}`)
                          ? "balloon-pop"
                          : ""
                      } ${
                        poppedBalloons.includes(`${rowIndex}-${colIndex}`)
                          ? "hidden"
                          : ""
                      } ${
                        correctLetter === letter ? "hint-balloon" : "" // Apply hint class if it's the correct letter
                      }`}
                    >
                      <div className="z-0 letter sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl absolute -bottom-6 font-bold text-white">
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
        <div className="sm:w-[80%] md:w-[70%] lg:w-[75%] xl:w-[60%] 2xl:w-[55%] flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center sm:pb-2  md:pb-2 lg:pb-3 xl:pb-5 2xl:pb-10">
              {item.words.map((word, index) => (
                <div
                  key={index}
                  style={{
                    display: word === words[0] ? "block" : "none", // Display the image if the word matches the selected word
                  }}
                >
                  <img
                    src={`/images/${item.image[index]}`}
                    className="sm:h-[160px] md:h-[150px] lg:h-[200px] xl:h-[300px] 2xl:h-[350px]"
                    alt=""
                  />
                </div>
              ))}
              <div className="flex justify-center items-center">
                {item.words.map((word, index) => (
                  <div
                    key={index}
                    className={`${word === words[0] ? "block" : "hidden"}`}
                  >
                    <img
                      src={`/images/${item.letterimage[index]}`}
                      className="sm:h-[160px] md:h-[150px] lg:h-[200px] xl:h-[250px] 2xl:h-[400px]"
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[url('/minigamebg.png')] bg-cover text-black sm:px-5 md:px-[30px] lg:px-[50px] xl:px-[60px] 2xl:px-[90px] sm:border-[5px] md:border-[5px] lg:border-[5px] xl:border-[5px] 2xl:border-[10px] border-[#131212] rounded-[40px] bg-white text-center sm:pb-5 md:pb-5 lg:pb-10 xl:pb-10 2xl:pb-16">
              <h1 className="sm:text-[25px] md:text-[35px] lg:text-[40px] xl:text-[50px] 2xl:text-[80px]">
                {words[0]}
              </h1>
              <div className="flex md:gap-2 lg:gap-5">
                <button
                  onClick={handlePlayTextToSpeech}
                  className="sm:rounded-[10px] md:rounded-[10px] lg:rounded-[10px] xl:rounded-[10px] 2xl:rounded-[20px] sm:border-[5px] md:border-[5px] lg:border-[5px] xl:border-[5px] 2xl:border-[10px] border-black active:scale-75 transition-transform flex text-white items-center justify-center text-center md:text-[15px] xl:text-[20px] 2xl:text-[40px] mt-5 md:px-4 lg:px-5 xl:px-5 2xl:px-10 bg-[#18B35B] hover:bg-[#2DC16D] "
                >
                  <FaPlay />
                </button>
                <button
                  onClick={handleReset}
                  className="sm:rounded-[10px] md:rounded-[10px] lg:rounded-[10px] xl:rounded-[10px] 2xl:rounded-[20px] sm:border-[5px] md:border-[5px] lg:border-[5px] xl:border-[5px] 2xl:border-[10px] border-black active:scale-75 transition-transform flex text-white items-center justify-center text-center md:text-[20px] xl:text-[20px] 2xl:text-[40px] mt-5 md:px-4 lg:px-4 xl:px-5 2xl:px-10 bg-[#18B35B] hover:bg-[#2DC16D] "
                >
                  <FontAwesomeIcon
                    icon={faRotate}
                    style={{
                      color: "#FFFFFF",
                    }} // Adjust the fontSize as needed
                  />{" "}
                </button>
                <button
                  onClick={openModal}
                  className="sm:rounded-[10px] md:rounded-[10px] lg:rounded-[10px] xl:rounded-[10px] 2xl:rounded-[20px] sm:border-[5px] md:border-[5px] lg:border-[5px] xl:border-[5px] 2xl:border-[10px] border-black active:scale-75 transition-transform flex text-white items-center justify-center text-center xl:text-[20px] 2xl:text-[40px] mt-5 px-3 bg-[#18B35B] hover:bg-[#2DC16D] "
                >
                  Help
                </button>
                <div>
                  <input
                    type="text"
                    value={typedWord}
                    readOnly
                    className="sm:rounded-[10px] md:rounded-[10px] lg:rounded-[10px] xl:rounded-[10px] 2xl:rounded-[20px] sm:border-[5px] md:border-[5px] lg:border-[5px] xl:border-[5px] 2xl:border-[10px] border-[#131212] sm:text-[20px] md:text-[20px] lg:text-[20px] xl:text-[20px] 2xl:text-[40px] sm:w-[100px] md:w-[100px] lg:w-[100px] xl:w-[200px] 2xl:w-[300px] mt-6 text-center" // Adjust width as needed
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showModal && (
          <div
            id="modal"
            className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 modal-open"
          >
            <div className="flex p-8 rounded-lg relative fade-up">
              <div className="relative">
                <img src="/welldone.png" alt="" />
              </div>
              <div className="z-0">
                <img src="/star.png" alt="" />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center pt-10">
              <button
                type="button"
                className="rounded-[100px] text-[50px] py-5 px-5 inline-flex justify-center items-center gap-x-2 font-semibold border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                onClick={handleCancel}
              >
                NEXT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BalloonGame;
