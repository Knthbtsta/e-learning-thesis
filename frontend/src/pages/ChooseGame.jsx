import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ChooseGame = () => {
  const location = useLocation();
  const { item } = location.state;
  const [all, setAll] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const dungeonName = searchParams.get("dungeonName");
  const [image, setImage] = useState("");
  const [words, setWords] = useState([]);
  const [user, setUser] = useState({});
  const [stars, setStars] = useState(0);
  console.log(stars);

  useEffect(() => {
    // Fetch initial stars count from the database
    fetchStarsCount();

    // Set the initial word and image based on a random index
    if (
      item &&
      item.words &&
      item.words.length > 0 &&
      item.image &&
      item.image.length > 0
    ) {
      console.log("Number of words:", item.words.length);
      const randomIndex = Math.floor(Math.random() * item.words.length);
      console.log("Random index:", randomIndex);
      setWords([item.words[randomIndex]]);
      setImage(item.image[randomIndex]);
    }
  }, [item]);
  console.log(image);
  console.log(words);

  useEffect(() => {
    fetchStarsCount();
    if (item && Array.isArray(item.gameimage && item.minigame)) {
      setAll(item.gameimage);
    }
  }, [item]); // useEffect will run whenever 'item' changes
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
  const fetchStarsCount = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api/user/${id}`);
      const initialStars = response.data.stars;
      setStars(initialStars);
    } catch (error) {
      console.error("Error fetching stars count:", error);
    }
  };

  const handleChoose = () => {
    const newStars = stars + 1;
    setStars(newStars);
    // Update stars count in the database
    updateStarsCount(newStars);
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    navigate(
      `/speechrecognitioncomponent?id=${id}&dungeonName=${dungeonName}`,
      {
        state: { words: words, item: item },
      }
    ); // Navigate to the other page with URL parameters
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

  const handlePlayTextToSpeech = (index) => {
    const utterance = new SpeechSynthesisUtterance(item.minigame[index]);
    window.speechSynthesis.speak(utterance);
    // Use a text-to-speech library or API to speak the text
  };
  const PlayTextToSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(words);
    window.speechSynthesis.speak(utterance);
    // Use a text-to-speech library or API to speak the text
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center bg-[url('/bg-3.png')] bg-no-repeat bg-cover">
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
            CHOOSE OR CLICK THE (A) SOUND WORD OR IMAGE CLICK THE WORDS TO PLAY
          </p>
        </div>
      </div>
      <div className="sm:text-[20px] md:text-[30px] lg:text-[30px] xl:text-[30px] 2xl:text-[50px] text-black pl-10 2xl:pt-5">
        {" "}
        <FontAwesomeIcon
          icon={faStar}
          className="text-yellow-400 md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-6xl xl:pt-5 2xl:pt-10 animate-bounce"
        />
        {user.stars}
      </div>
      <div className="flex flex-col justify-center items-center p-[50px]">
        <div className="flex justify-center items-center">
          {all.map((gameimage, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <button onClick={() => handleImageClick(gameimage)}>
                <img
                  src={`/images/${gameimage}`}
                  className="lg:h-[250px] xl:h-[300px] 2xl:h-[450px] px-10 active:scale-75 transition-transform flex"
                  alt={gameimage}
                />
              </button>
              <button
                onClick={() => handlePlayTextToSpeech(idx)}
                className="active:scale-75 transition-transform flex"
              >
                <div className="flex items-center justify-center text-black lg:text-[50px] xl:text-[70px] 2xl:text-[100px]">
                  {item.minigame[idx]}
                </div>
              </button>
            </div>
          ))}
          <div className="flex flex-col items-center">
            <button>
              {item.words.map((word, index) => (
                <div
                  key={index}
                  className={`${word === words[0] ? "block" : "hidden"}`}
                >
                  <img
                    src={`/images/${item.image[index]}`}
                    className="lg:h-[250px] xl:h-[300px] 2xl:h-[450px] px-10 active:scale-75 transition-transform flex"
                    alt=""
                    onClick={handleChoose}
                  />
                </div>
              ))}
            </button>
            <button
              onClick={PlayTextToSpeech}
              className="active:scale-75 transition-transform flex"
            >
              <div className="flex items-center justify-center text-black lg:text-[50px] xl:text-[70px] 2xl:text-[100px]">
                {words}
              </div>
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={openModal}
            className="active:scale-75 transition-transform bg-white text-black px-10 lg:rounded-[20px] lg:text-[40px] lg:border-[10px] xl:rounded-[20px] xl:text-[40px] xl:border-[10px] 2xl:rounded-[20px] 2xl:text-[70px] 2xl:border-[10px]2xl:text-[70px] 2xl:border-[10px] border-black"
          >
            Help
          </button>
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
  );
};

export default ChooseGame;
