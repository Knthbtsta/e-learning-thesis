import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { GiHelp } from "react-icons/gi";

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
      const response = await axios.get(`http://localhost:8800/api/user/${id}`);
      const initialStars = response.data.stars;
      setStars(initialStars);
    } catch (error) {
      console.error("Error fetching stars count:", error);
    }
  };

  useEffect(() => {
    generatePuzzle();
  }, [words]);

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
  const handleGuess = (event) => {
    event.preventDefault();
    const guessedWord = event.target.elements.guess.value.trim().toLowerCase();
    const correctWord = words[0].toLowerCase(); // Assuming words array contains only one word

    if (guessedWord === correctWord) {
      generatePuzzle();
      setShowModal(true);
      const newStars = stars + 1;
      setStars(newStars);
      updateStarsCount(newStars);
    } else {
    }
    event.target.reset();
  };

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

  const handleCancel = () => {
    setShowModal(false);
    navigate(`/speech?id=${id}&dungeonName=${dungeonName}`, {
      state: { words: words, item: item },
    });
  };

  return (
    <div className="h-screen w-full bg-[url('/bg-3.png')] bg-no-repeat bg-cover">
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
            ARRANGE THE JUMBLED (A) WORD LETTERS. TYPE THE CORRECT ARRANGEMENT
          </p>
        </div>
      </div>
      <div className="text-[50px] text-black pl-10 pt-5">
        <FontAwesomeIcon
          icon={faStar}
          style={{
            color: "#FFD43B",
            fontSize: "4rem",
            paddingTop: "10px",
          }}
          bounce
        />
        {user.stars}
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[50%] flex justify-center items-center">
          <div className="flex justify-center items-center">
            {item.words.map((word, index) => (
              <div
                key={index}
                className={`${word === words[0] ? "block" : "hidden"}`}
              >
                <img
                  src={`/images/${item.image[index]}`}
                  className="h-[700px]"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-[50%] flex flex-col justify-center items-center">
          <div className="flex justify-center items-center">
            {item.words.map((word, index) => (
              <div
                key={index}
                className={`${word === words[0] ? "block" : "hidden"}`}
              >
                <img
                  src={`/images/${item.letterimage[index]}`}
                  className="h-[450px]"
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-5 pt-10">
            <p className="bg-white text-black  px-10  rounded-[20px] text-[70px] border-[10px] border-black">
              {puzzle}
            </p>
            <button
              className="active:scale-75 transition-transform bg-white text-black py-2 px-4 rounded-[20px] text-[70px] border-[10px] border-black"
              onClick={openModal}
            >
              <GiHelp />
            </button>
          </div>
          <form onSubmit={handleGuess}>
            <div className="flex flex-col justify-center items-center pt-[30px]">
              <input
                type="text"
                name="guess"
                placeholder="Enter your guess"
                className="border-[10px] border-black rounded-[20px] text-[30px]"
              />
              <div className="pt-[20px]">
                <button
                  type="submit"
                  className=" active:scale-75 transition-transform bg-white text-black border-[10px] border-black rounded-[20px] text-[30px] py-3 px-3"
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
            className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50"
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

export default DragGame;
