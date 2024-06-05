import React, { useState, useEffect, useRef } from "react";
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
import popSound from "../assets/soundeffects/pop.wav";
import correctSound from "../assets/soundeffects/correct.wav";
import letterSound from "../assets/soundeffects/letter.mp3";
import wrongletterSound from "../assets/soundeffects/wrongletter.mp3";
import lettergreatSound from "../assets/soundeffects/lettergreat.mp3";
import letterverygoodSound from "../assets/soundeffects/letterverygood.mp3";
import letterniceSound from "../assets/soundeffects/letternice.mp3";
import balloonSound from "../assets/soundeffects/clickballoon.mp3";

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
  const [hintAnimationActive, setHintAnimationActive] = useState(false);
  const [hintClicked, setHintClicked] = useState(false);

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
      const response = await axios.get(
        `https://e-learning-thesis-tupm.onrender.com/api/user/${id}`
      );
      const initialStars = response.data.stars;
      setStars(initialStars);
    } catch (error) {
      console.error("Error fetching stars count:", error);
    }
  };

  const handleReset = () => {
    setPoppedBalloons([]); // I-clear ang popped balloons
    setTypedWord(""); // I-clear ang typed word
    setClickedBalloons([]); // I-clear ang clicked balloons
    setHintActive(false); // I-reset ang hint active state
    setHintClicked(false); // I-reset ang hint clicked state
    setShowModal(false); // Isara ang anumang bukas na modal
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
          `https://e-learning-thesis-tupm.onrender.com/api/user/${id}`
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
      await axios.patch(
        `https://e-learning-thesis-tupm.onrender.com/api/user/${id}`,
        {
          stars: newStars,
        }
      );
    } catch (error) {
      console.error("Error updating stars count:", error);
    }
  };

  const generateLettersArray = (numWords) => {
    const letters = [];
    for (let i = 65; i <= 90; i++) {
      letters.push(String.fromCharCode(i));
    }
    const shuffledLetters = letters.sort(() => Math.random() - 0.5);
    return { letters, shuffledLetters };
  };

  const numWords = item.words.length;
  const { letters, shuffledLetters } = generateLettersArray(numWords);
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
  const audioRef = useRef(null);
  const soundRef = useRef(null);
  const letterRef = useRef(null);
  const wrongletterRef = useRef(null);
  const lettergreatRef = useRef(null);
  const letterverygoodRef = useRef(null);
  const letterniceRef = useRef(null);
  const balloonsoundRef = useRef(null);

  useEffect(() => {
    let hintTimeout;

    const currentWord = words[currentWordIndex]?.toUpperCase();
    const nextLetterIndex = typedWord.length;

    if (currentWord && nextLetterIndex < currentWord.length) {
      // Get the index of the next letter that the user needs to guess
      const nextLetter = currentWord[nextLetterIndex];

      // Check if the next letter has already been clicked
      const nextLetterClicked = clickedBalloons.includes(
        `${currentWordIndex}-${nextLetterIndex}`
      );

      if (!nextLetterClicked) {
        hintTimeout = setTimeout(() => {
          setHintActive(true);
          setCorrectLetter(nextLetter);
        }, 5000); // Set the delay here (in milliseconds)
      }
    }

    return () => {
      clearTimeout(hintTimeout);
    };
  }, [typedWord, words, currentWordIndex, clickedBalloons]);

  const handleLetterClick = (letter, rowIndex, colIndex) => {
    const currentWord = words[0].toLowerCase();
    const typedLetter = letter.toLowerCase();

    if (typedLetter === currentWord[typedWord.length]) {
      // If first letter is clicked, disable hint
      if (typedLetter === currentWord[0]) {
        setHintActive(false);
      }

      // Reset hint animation timer
      setHintAnimationActive(false);

      // Play sounds and update the typed word
      const randomSoundIndex = Math.floor(Math.random() * 4);
      const sounds = [
        letterRef,
        lettergreatRef,
        letterverygoodRef,
        letterniceRef,
      ];
      sounds[randomSoundIndex].current.play();
      audioRef.current.play();
      setTypedWord((prevTypedWord) => prevTypedWord + letter);
      setPoppedBalloons((prevPoppedBalloons) => [
        ...prevPoppedBalloons,
        `${rowIndex}-${colIndex}`,
      ]);

      // Remove the clicked balloon from the hint
      const clickedBalloonIndex = clickedBalloons.findIndex(
        (balloon) => balloon === `${rowIndex}-${colIndex}`
      );
      if (clickedBalloonIndex === -1) {
        setClickedBalloons((prevClickedBalloons) => [
          ...prevClickedBalloons,
          `${rowIndex}-${colIndex}`,
        ]);
      }

      // Show hint only if it's not already active
      if (!hintActive) {
        // Show hint for 3 seconds
        setHintActive(true);
        setCorrectLetter(typedLetter);
        setTimeout(() => {
          setHintActive(false);
        }, 3000);
      }
    } else {
      wrongletterRef.current.play();
    }
  };
  const handleHeartClick = () => {
    // You can add any functionality you want here
    console.log("Heart clicked!");
  };

  const heartIcons = letters.map((letter, idx) => {
    const isHint =
      hintActive && letter.toUpperCase() === correctLetter.toUpperCase();

    return (
      <div className="flex justify-center items-center" key={idx}>
        <button className="heart-btn" onClick={() => handleHeartClick(letter)}>
          <BsBalloonHeartFill
            className={`heart-icon text-red-700 sm:text-[40px] md:text-[50px] lg:text-[65px] xl:text-[85px] 2xl:text-[125px] ${
              isHint ? "hint-active" : ""
            }`}
          />
        </button>
      </div>
    );
  });

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
        soundRef.current.play();
      } else if (!isMatch && showModal) {
        setShowModal(false);
      }
    }
  }, [typedWord, words, showModal, stars]);

  const handleCancel = () => {
    setShowModal(false);
    navigate(`/SpellTheWord?id=${id}&dungeonName=${dungeonName}`, {
      state: { words: words, item: item },
    });
  };

  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia("(orientation: portrait)").matches
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
    };

    window.addEventListener("resize", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  useEffect(() => {
    if (!isPortrait) {
      // Check if not in portrait mode
      const timer = setTimeout(() => {
        balloonsoundRef.current.play();
        setIsOpen(true);
      }, 500); // Delay opening the modal by 500 milliseconds

      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [isPortrait]); // Run once on component mount

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleBack = () => {
    navigate(`/levelmap?id=${id}`);
  };

  return (
    <div
      id="container"
      className="h-screen w-full flex flex-col justify-center bg-[url('/minigamebg.png')] bg-no-repeat bg-cover"
    >
      {/* Modal */}
      {isPortrait && (
        <div class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-100 z-50">
          <div class="bg-white p-8 rounded-lg transform scale-100">
            <p class="text-center text-5xl text-gray-800">
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
        <div
          onClick={closeModal}
          className={`fixed inset-0 flex items-center justify-center transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{ zIndex: 999 }} // Set a high z-index to ensure the modal appears on top
        >
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="flex sm:p-5 lg:p-8 rounded-lg relative fade-up">
            <div className="relative">
              <img src="/click the balloons.png" alt="" className="h-screen" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="sm:text-[20px] md:text-[25px] lg:text-[30px] xl:text-[30px] 2xl:text-[50px] text-black pl-10">
          {" "}
          <FontAwesomeIcon
            icon={faStar}
            className="text-yellow-400 sm:text-[20px] md:text-[25px] lg:text-[30px] xl:text-[30px] 2xl:text-[50px] animate-bounce"
          />
          {user.stars}
        </div>
        <div className="flex justify-center bg-red-600 rounded-[50px] px-5 lg:px-7 my-1 lg:my-2 text-white">
          <button
            onClick={handleBack}
            className="active:scale-75 transition-transform sm:text-[15px] md:text-[15px] lg:text-[30px] xl:text-[30px] 2xl:text-[30px]"
          >
            BACK
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center sm:gap-[190px] md:gap-[150px] lg:gap-[100px] xl:gap-[90px] 2xl:gap-[10px]">
        <div className="sm:w-[20%] md:w-[30%] lg:w-[35%] xl:w-[40%] 2xl:w-[45%] flex justify-center items-center">
          <div className="sm:pl-[200px] md:pl-[160px] lg:pl-[150px] xl:pl-[120px] 2xl:pl-10 sm:pt-2 md:pt-1 2xl:pt-6 xl:pt-3">
            <div className="p-5 bg-[url('/minigamebg.png')] bg-cover sm:rounded-[20px] xl:rounded-[40px] sm:border-[5px] md:border-[5px] lg:border-[5px] xl:border-[5px] 2xl:border-[10px] shadow-lg border-black sm:py-[22px] sm:px-[15px] md:px-[15px] md:py-[15px] lg:px-[20px] lg:py-[20px] xl:px-[20px] xl:py-[15px]">
              {grid.map((row, rowIndex) => (
                <div
                  className="text-red-700"
                  key={rowIndex}
                  style={{ display: "flex" }}
                >
                  {row.map(
                    (letter, colIndex) =>
                      !hintClicked && ( // Only render if hint is not clicked
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          style={{
                            padding: "2px",
                            position: "relative",
                            animationDelay: `${
                              (rowIndex * numCols + colIndex) * 0.2
                            }s`,
                          }}
                          onClick={() =>
                            handleLetterClick(letter, rowIndex, colIndex)
                          }
                          className={`balloon ${
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
                            hintActive &&
                            correctLetter === letter &&
                            !clickedBalloons.includes(`${rowIndex}-${colIndex}`)
                              ? "zoom-in-out"
                              : ""
                          }`}
                        >
                          <div className="z-0 letter sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl absolute -bottom-6 font-bold text-white">
                            {letter}
                          </div>
                          {heartIcons[rowIndex * numCols + colIndex]}
                        </div>
                      )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sm:w-[80%] md:w-[70%] lg:w-[75%] xl:w-[60%] 2xl:w-[55%] flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center sm:pb-2 gap-2 md:pb-2 lg:pb-3 xl:pb-5 2xl:pb-10">
              {item.words.map((word, index) => (
                <div
                  key={index}
                  style={{
                    display: word === words[0] ? "block" : "none", // Display the image if the word matches the selected word
                  }}
                >
                  <img
                    src={`/images/${item.image[index]}`}
                    className="sm:h-[120px] md:h-[150px] lg:h-[180px] xl:h-[250px] 2xl:h-[350px]"
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
                      className="sm:h-[120px] md:h-[150px] lg:h-[180px] xl:h-[250px] 2xl:h-[350px]"
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[url('/minigamebg.png')] bg-cover text-black sm:px-[15px] md:px-[20px] lg:px-[50px] xl:px-[60px] 2xl:px-[90px] sm:border-[5px] md:border-[5px] lg:border-[5px] xl:border-[5px] 2xl:border-[10px] border-[#131212] sm:rounded-[20px] xl:rounded-[40px] bg-white text-center sm:pb-5 md:pb-4 lg:pb-10 xl:pb-10 2xl:pb-12">
              <h1 className="sm:text-[35px] md:text-[40px] lg:text-[50px] xl:text-[60px] 2xl:text-[90px]">
                {words[0]}
              </h1>
              <div className="flex sm:gap-2 md:gap-2 lg:gap-5">
                <button
                  onClick={handlePlayTextToSpeech}
                  className="sm:rounded-[10px] md:rounded-[10px] lg:rounded-[10px] xl:rounded-[10px] 2xl:rounded-[20px] sm:border-[5px] md:border-[5px] lg:border-[5px] xl:border-[5px] 2xl:border-[10px] border-black active:scale-75 transition-transform flex text-white items-center justify-center text-center sm:text-[10px] md:text-[15px] lg:text-[20px] xl:text-[20px] 2xl:text-[40px] sm:my-2 lg:mt-6 sm:px-4 md:px-4 lg:px-5 xl:px-5 2xl:px-8 bg-[#18B35B] hover:bg-[#2DC16D] "
                >
                  <FaPlay />
                </button>
                <button
                  onClick={handleReset}
                  className="sm:rounded-[10px] md:rounded-[10px] lg:rounded-[10px] xl:rounded-[10px] 2xl:rounded-[20px] sm:border-[5px] md:border-[5px] lg:border-[5px] xl:border-[5px] 2xl:border-[10px] border-black active:scale-75 transition-transform flex text-white items-center justify-center text-center sm:text-[10px] md:text-[15px] lg:text-[20px] xl:text-[20px] 2xl:text-[40px] sm:my-2 lg:mt-6 sm:px-4 md:px-4 lg:px-4 xl:px-5 2xl:px-8 bg-[#18B35B] hover:bg-[#2DC16D] "
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
                  className="sm:rounded-[10px] md:rounded-[10px] lg:rounded-[10px] xl:rounded-[10px] 2xl:rounded-[20px] sm:border-[5px] md:border-[5px] lg:border-[5px] xl:border-[5px] 2xl:border-[10px] border-black active:scale-75 transition-transform flex text-white items-center justify-center text-center sm:text-[10px] md:text-[15px] lg:text-[20px] xl:text-[20px] 2xl:text-[40px] sm:my-2 lg:mt-6 sm:px-3 md:px-4 lg:px-4 xl:px-5 2xl:px-5 bg-[#18B35B] hover:bg-[#2DC16D] "
                >
                  Help
                </button>
                <div>
                  <input
                    type="text"
                    value={typedWord}
                    readOnly
                    className="sm:rounded-[10px] md:rounded-[10px] lg:rounded-[10px] xl:rounded-[10px] 2xl:rounded-[20px] sm:border-[5px] md:border-[5px] lg:border-[5px] xl:border-[5px] 2xl:border-[10px] border-[#131212] sm:text-[15px] md:text-[15px] lg:text-[20px] xl:text-[20px] 2xl:text-[35px] sm:w-[100px] md:w-[130px] lg:w-[100px] xl:w-[200px] 2xl:w-[300px] sm:my-2 lg:mt-6 text-center" // Adjust width as needed
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
            <div className="flex sm:p-5 lg:p-8 rounded-lg relative fade-up">
              <div className="relative">
                <img
                  src="/yey.png"
                  alt=""
                  className=" sm:h-[200px] lg:h-[300px] xl:h-[400px]"
                />
              </div>
              <div className="z-0">
                <img
                  src="/star.png"
                  alt=""
                  className=" sm:h-[200px] lg:h-[300px] xl:h-[400px]"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center lg:pt-10">
              <button
                type="button"
                className="sm:rounded-[20px] lg:rounded-[30px] sm:text-[25px] lg:text-[50px] sm:py-2 sm:px-5 lg:py-5 lg:px-10 inline-flex justify-center items-center gap-x-2 font-semibold border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                onClick={handleCancel}
              >
                NEXT
              </button>
            </div>
          </div>
        )}
      </div>
      <audio ref={audioRef} src={popSound} />
      <audio ref={soundRef} src={correctSound} />
      <audio ref={letterRef} src={letterSound} />
      <audio ref={wrongletterRef} src={wrongletterSound} />
      <audio ref={lettergreatRef} src={lettergreatSound} />
      <audio ref={letterverygoodRef} src={letterverygoodSound} />
      <audio ref={letterniceRef} src={letterniceSound} />
      <audio ref={balloonsoundRef} src={balloonSound} />
    </div>
  );
};

export default BalloonGame;
