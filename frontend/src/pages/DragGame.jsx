import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { GiHelp } from "react-icons/gi";
import correctSound from "../assets/soundeffects/correct.wav";
import wrongSound from "../assets/soundeffects/wrong.wav";
import { faMaximize } from "@fortawesome/free-solid-svg-icons";
import dragSound from "../assets/soundeffects/drag.mp3"
import warningSound from "../assets/soundeffects/jumbled.mp3";

const DragGame = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const dungeonName = searchParams.get("dungeonName");
  const [stars, setStars] = useState(0); // Initialize stars state
  const location = useLocation();
  const [words, setWords] = useState([]);
  const [user, setUser] = useState({});
  const { item } = location.state;
  const [image, setImage] = useState("");
  const [letterimage, setLetterImage] = useState("");
  const [puzzle, setPuzzle] = useState("");

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
  console.log(image);
  console.log(words);

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

  const handleAgain = () => {
    setWrongShowModal(false);
  };

  useEffect(() => {
    generatePuzzle();
  }, [words]);

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

  useEffect(() => {
    generatePuzzle();
  }, []);

  const generatePuzzle = () => {
    if (words.length > 0) {
      const randomIndex = Math.floor(Math.random() * words.length);
      const randomWord = words[randomIndex];

      let scrambledWord;
      do {
        scrambledWord = randomWord
          .split("")
          .sort(() => Math.random() - 0.5)
          .join("")
          .toUpperCase(); // Convert scrambled word to uppercase
      } while (scrambledWord === randomWord.toUpperCase());

      setPuzzle(scrambledWord);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const soundRef = useRef(null);
  const wrongsoundRef = useRef(null);
  const [wrongshowModal, setWrongShowModal] = useState(false);

  const handleGuess = (event) => {
    event.preventDefault();
    const guessedWord = event.target.elements.guess.value.trim().toLowerCase();
    const correctWord = words[0].toLowerCase(); // Assuming words array contains only one word

    if (guessedWord === correctWord) {
      generatePuzzle();
      setShowModal(true);
      const newStars = stars + 1;
      setStars(newStars);
      soundRef.current.play();
      updateStarsCount(newStars);
    } else {
      wrongsoundRef.current.play();
      setWrongShowModal(true);
    }
    event.target.reset();
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

 const dragsoundRef = useRef(null);

  useEffect(() => {
    if (!isPortrait) {
      // Check if not in portrait mode
      const timer = setTimeout(() => {
        dragsoundRef.current.play();
        setIsOpen(true);
        
      }, 500); // Delay opening the modal by 500 milliseconds

      return () => clearTimeout(timer);
    }else{
     setIsOpen(false);
   }

  }, [isPortrait]);// Run once on component mount

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    navigate(`/levelmap?id=${id}&dungeonName=${dungeonName}`, {
      state: { words: words, item: item },
    });
  };

  const [isIdle, setIsIdle] = useState(false);
  const idleTimer = useRef(null);
  const warningsoundRef = useRef(null);

  useEffect(() => {
    startIdleTimer();
    return () => {
      clearTimeout(idleTimer.current);
    };
  }, []);

  useEffect(() => {
    if (isIdle) {
      // Play warning sound every 10 seconds when idle
      const soundInterval = setInterval(() => {
        warningsoundRef.current.play();
      }, 10000);

      return () => {
        clearInterval(soundInterval);
      };
    }
  }, [isIdle]);

  const startIdleTimer = () => {
    idleTimer.current = setTimeout(() => {
      warningsoundRef.current.play();
      setIsIdle(true);
    }, 20000); // Initial 10 seconds idle time
  };

  const handleInteraction = () => {
    clearTimeout(idleTimer.current);
    setIsIdle(false);
    startIdleTimer();
  };

  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (event, index) => {
    setDraggedItem(index);
     clearTimeout(idleTimer.current);
     setIsIdle(false);
     startIdleTimer();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const targetIndex = parseInt(event.target.getAttribute("data-index"));
    const tempLetters = [...puzzle];
    const tempLetter = tempLetters[targetIndex];
    tempLetters[targetIndex] = tempLetters[draggedItem];
    tempLetters[draggedItem] = tempLetter;
    setPuzzle(tempLetters.join(""));
  };

  const handleTouchStart = (event, index) => {
    setDraggedItem(index);
    handleInteraction();
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const puzzleElements = document.querySelectorAll('[data-index]');
    puzzleElements.forEach((el) => {
      el.addEventListener('touchmove', handleTouchMove, { passive: false });
    });

    return () => {
      puzzleElements.forEach((el) => {
        el.removeEventListener('touchmove', handleTouchMove);
      });
    };
  }, [puzzle]);

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.getAttribute("data-index")) {
      const targetIndex = parseInt(element.getAttribute("data-index"));
      const tempLetters = [...puzzle];
      const tempLetter = tempLetters[targetIndex];
      tempLetters[targetIndex] = tempLetters[draggedItem];
      tempLetters[draggedItem] = tempLetter;
      setPuzzle(tempLetters.join(""));
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleBack = () => {
    navigate(`/levelmap?id=${id}`);
  };

  const [puzzleMatched, setPuzzleMatched] = useState(false);

  useEffect(() => {
    if (
      !puzzleMatched &&
      puzzle &&
      words.length > 0 &&
      puzzle.toLowerCase() === words[0].toLowerCase()
    ) {
      setShowModal(true);
      const newStars = stars + 1;
      setStars(newStars);
      soundRef.current.play();
      updateStarsCount(newStars);
      setPuzzleMatched(true); // Set the flag to true to prevent further executions
    }
  }, [puzzle, puzzleMatched, stars, words]);

  return (
    <div
      id="container"
      className="h-screen w-full flex flex-col justify-center bg-[url('/bg123.png')] bg-no-repeat bg-cover"
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
        onClick={closeModal}
        className={`fixed inset-0 flex items-center justify-center transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 999 }} // Set a high z-index to ensure the modal appears on top
      >
        <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
        <div className="flex sm:p-5 lg:p-8 rounded-lg relative fade-up">
          <div className="relative">
            <img src="/drag the letters.png" alt="" className="h-screen" />
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
      <div className="flex justify-center items-center">
        <div className="sm:w-[45%] lg:w-[50%] flex justify-center items-center ml-10">
          <div className="flex justify-center items-center">
            {item.words.map((word, index) => (
              <div
                key={index}
                className={`${word === words[0] ? "block" : "hidden"}`}
              >
                <img
                  src={`/images/${item.image[index]}`}
                  className="sm:h-[250px] md:h-[270px] lg:h-[400px] xl:h-[550px] 2xl:h-[650px]"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
        <div className="sm:w-[55%] lg:w-[50%] flex flex-col justify-center items-center">
          <div className="flex justify-center items-center">
            {item.words.map((word, index) => (
              <div
                key={index}
                className={`${word === words[0] ? "block" : "hidden"}`}
              >
                <img
                  src={`/images/${item.letterimage[index]}`}
                  className="sm:h-[200px] md:h-[230px] lg:h-[330px] xl:h-[400px] 2xl:h-[500px]"
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="mt-5 lg:mt-10 flex justify-center items-center sm:gap-2 lg:gap-5 sm:h-[50px] md:h-[70px] lg:h-[100px] xl:h-[150px] 2xl:h-[150px]">
            {puzzle.split("").map((letter, index) => (
              <div
                key={index}
                onDragStart={(event) => handleDragStart(event, index)}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onTouchStart={(event) => handleTouchStart(event, index)}
          onTouchEnd={handleTouchEnd}
                className={`flex flex-row justify-center items-center bg-white text-black sm:px-2 sm:py-2 lg:px-5 lg:py-2 xl:px-5 xl:py-4 sm:rounded-[5px] sm:text-[20px] sm:border-[3px] md:rounded-[10px] md:text-[25px] md:border-[5px] lg:rounded-[10px] lg:text-[40px] lg:border-[5px] xl:border-[5px] xl:rounded-[10px] xl:text-[50px] 2xl:text-[60px] 2xl:border-[10px] 2xl:rounded-[20px] border-black ${
                  isIdle ? "animate-pump" : ""
                }`}
                draggable="true"
                data-index={index}
              >
                {letter}
              </div>
            ))}
            <audio ref={warningsoundRef} src="warning_sound.mp3" />
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
                  src="/check.png"
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
        {wrongshowModal && (
          <div
            id="modal"
            className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 modal-open"
          >
            <div className="flex flex-col sm:p-5 lg:p-8 rounded-lg relative fade-up">
              <div className="relative">
                <img
                  src="/wrong.png"
                  alt=""
                  className=" sm:h-[200px] lg:h-[300px] xl:h-[400px]"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center lg:pt-10">
              <button
                type="button"
                className="sm:rounded-[20px] lg:rounded-[30px] sm:text-[25px] lg:text-[50px] sm:py-2 sm:px-5 lg:py-5 lg:px-10 inline-flex justify-center items-center gap-x-2 font-semibold border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                onClick={handleAgain}
              >
                TRY AGAIN
              </button>
            </div>
          </div>
        )}
      </div>
      <audio ref={wrongsoundRef} src={wrongSound} />
      <audio ref={soundRef} src={correctSound} />
      <audio ref={dragsoundRef} src={dragSound} />
      <audio ref={warningsoundRef} src={warningSound} />
    </div>
  );
};

export default DragGame;
