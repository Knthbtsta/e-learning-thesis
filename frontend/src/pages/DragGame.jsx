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
      await axios.patch(`https://e-learning-thesis-tupm.onrender.com/api/user/${id}`, {
        stars: newStars,
      });
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
      const scrambledWord = randomWord
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("")
        .toUpperCase(); // Convert scrambled word to uppercase
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
    } else{
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

  useEffect(() => {
    if (!isPortrait) {
      // Check if not in portrait mode
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500); // Delay opening the modal by 500 milliseconds

      return () => clearTimeout(timer);
    }
  }, [isPortrait]); // Run once on component mount

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

  const handleFullScreen = () => {
    const element = document.getElementById("container");
    const isFullScreen = document.fullscreenElement;

    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      element.requestFullscreen();
    }
  };

  return (
    <div
      id="container"
      className="h-screen w-full flex flex-col justify-center bg-[url('/bg-3.png')] bg-no-repeat bg-cover"
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
        <div className="h-[350px] w-[300px] sm:w-[290px] sm:h-[290px] lg:w-[400px] lg:h-[450px] relative bg-white p-8 rounded-[30px] border-[10px] border-black max-w-md transform transition-transform ease-in duration-300">
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
          <h2 className="sm:text-[25px] lg:text-[35px] text-center font-bold lg:pb-5 text-black text-[25px]">
            TUTORIAL
          </h2>
          <p className="sm:text-[20px] lg:text-[30px] text-black text-[30px] text-center">
            ARRANGE THE JUMBLED (A) WORD LETTERS. TYPE THE CORRECT ARRANGEMENT
          </p>
          ;
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
      <div className="flex justify-center items-center">
        <div className="w-[55%] flex justify-center items-center">
          <div className="flex justify-center items-center">
            {item.words.map((word, index) => (
              <div
                key={index}
                className={`${word === words[0] ? "block" : "hidden"}`}
              >
                <img
                  src={`/images/${item.image[index]}`}
                  className="sm:h-[270px] md:h-[300px] lg:h-[450px] xl:h-[500px] 2xl:h-[750px]"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-[45%] flex flex-col justify-center items-center">
          <div className="flex justify-center items-center">
            {item.words.map((word, index) => (
              <div
                key={index}
                className={`${word === words[0] ? "block" : "hidden"}`}
              >
                <img
                  src={`/images/${item.letterimage[index]}`}
                  className="sm:h-[170px] md:h-[200px] lg:h-[300px] xl:h-[350px] 2xl:h-[450px]"
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center sm:gap-5 lg:gap-10 sm:h-[50px] md:h-[70px] lg:h-[100px] xl:h-[150px] 2xl:h-[150px]">
            <p className="bg-white text-black sm:px-5 lg:px-10 sm:rounded-[5px] sm:text-[20px] sm:border-[3px] md:rounded-[10px] md:text-[25px] md:border-[5px] lg:rounded-[10px] lg:text-[40px] lg:border-[5px] xl:rounded-[10px] xl:text-[40px] xl:border-[10px] 2xl:rounded-[20px] 2xl:text-[70px] 2xl:border-[10px]2xl:text-[70px] 2xl:border-[10px] border-black">
              {puzzle}
            </p>
            <button
              className="active:scale-75 transition-transform bg-white sm:px-5 lg:px-10 text-black sm:rounded-[5px] sm:border-[3px] md:border-[5px] md:rounded-[10px] lg:border-[5px] lg:rounded-[10px] xl:border-[10px] xl:rounded-[10px] 2xl:border-[10px] 2xl:rounded-[20px] sm:text-[20px] md:text-[25px] lg:text-[40px] xl:text-[40px] 2xl:text-[70px] border-black"
              onClick={openModal}
            >
              <GiHelp />
            </button>
          </div>
          <form onSubmit={handleGuess}>
            <div className="flex flex-row justify-center items-center gap-2">
              <div className="">
                <input
                  type="text"
                  name="guess"
                  placeholder="Enter your guess"
                  className="text-black sm:rounded-[5px] sm:h-[28px] md:h-[40px] lg:h-[50px] xl:h-[65px] 2xl:h-[95px] sm:border-[3px] md:rounded-[10px] lg:rounded-[10px] xl:rounded-[10px] 2xl:rounded-[20px] md:border-[5px] lg:border-[5px] xl:border-[10px] 2xl:border-[10px] border-[#131212] sm:text-[15px] md:text-[20px] lg:text-[20px] xl:text-[30px] 2xl:text-[40px] sm:w-[100px] md:w-[200px] lg:w-[300px] xl:w-[300px] 2xl:w-[400px] text-center" // Adjuset width as needed
                />
              </div>
              <div className="">
                <button
                  type="submit"
                  className="bg-white text-black sm:px-5  sm:rounded-[5px] sm:text-[15px] sm:border-[3px] md:rounded-[10px] md:text-[20px] md:border-[5px] lg:rounded-[10px] lg:text-[25px] lg:border-[5px] xl:rounded-[10px] xl:text-[30px] xl:border-[10px] 2xl:rounded-[20px] 2xl:text-[50px] 2xl:border-[10px] border-black"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        {showModal && (
          <div
            id="modal"
            className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 modal-open"
          >
            <div className="flex sm:p-5 lg:p-8 rounded-lg relative fade-up">
              <div className="relative">
                <img
                  src="/welldone.png"
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
    </div>
  );
};

export default DragGame;
