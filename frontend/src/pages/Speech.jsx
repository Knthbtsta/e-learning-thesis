import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../balloon.css"; // Import CSS file for styles
import axios from "axios"; // Import Axios for HTTP requests
import { useSearchParams } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegStopCircle } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import { GiHelp } from "react-icons/gi";
import correctSound from "../assets/soundeffects/correct.wav";
import wrongSound from "../assets/soundeffects/wrong.wav";
import warningSound from "../assets/soundeffects/warning.mp3";
import saySound from "../assets/soundeffects/say.mp3";
import { BiSolidMicrophone, BiSolidMicrophoneOff } from "react-icons/bi";
import { faMaximize } from "@fortawesome/free-solid-svg-icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import backgroundAudio from "../assets/music/backgroundmusic2.mp3";

const Speech = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const dungeonName = searchParams.get("dungeonName");
  const [stars, setStars] = useState(0); // Initialize stars state
  const location = useLocation();
  const [words, setWords] = useState([]);
  const [isMicActive, setIsMicActive] = useState(false);
  const [letterimage, setLetterImage] = useState("");
  const [image, setImage] = useState("");
  const [user, setUser] = useState({});
  const { item } = location.state;
  console.log(location.state);
  const navigate = useNavigate();
  const [recognizedLetters, setRecognizedWord] = useState("");

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
  console.log("Letterimage", letterimage);
  console.log("words", words);
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
        //dito mag oopen modal
        setIsOpen(true);
        saysoundRef.current.play();
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
    saysoundRef.current.play();
  };

  const [showModal, setShowModal] = useState(false);
  const [wrongshowModal, setWrongShowModal] = useState(false);
  const soundRef = useRef(null);
  const wrongsoundRef = useRef(null);
  const warningsoundRef = useRef(null);
  const saysoundRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.1;
      audio.play();
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    if (recognizedLetters && words.length > 0) {
      const transcriptLower = recognizedLetters.toLowerCase();
      const matchedWord = words.find(
        (word) => word.toLowerCase() === transcriptLower
      );
      if (matchedWord) {
        setShowModal(true);
        const newStars = stars + 1;
        setStars(newStars);
        soundRef.current.play();
        updateStarsCount(newStars);
      } else {
        wrongsoundRef.current.play();
        setWrongShowModal(true);
      }
    }
  }, [recognizedLetters, words]);

  const recognition = new window.webkitSpeechRecognition();

  const [isButtonIdle, setIsButtonIdle] = useState(false);

  useEffect(() => {
    let idleTimer;

    // Function to play the warning sound and set the button as idle
    const playWarningSound = () => {
      warningsoundRef.current.play();
      setIsButtonIdle(true);
    };

    if (!isMicActive) {
      // Start the idle animation if the button is not active
      idleTimer = setTimeout(playWarningSound, 20000); // 5 seconds idle time

      // Play the warning sound every 5 seconds while the button is idle
      const soundInterval = setInterval(playWarningSound, 20000); // 5 seconds sound loop

      return () => {
        // Clean up the timers and intervals on component unmount or when mic becomes active
        clearTimeout(idleTimer);
        clearInterval(soundInterval);
        setIsButtonIdle(false);
      };
    } else {
      // Reset the idle animation if the button is active
      clearTimeout(idleTimer);
      setIsButtonIdle(false);
    }
  }, [isMicActive]);

  const startSpeechRecognition = () => {
    if (!isMicActive) {
      recognition.lang = "en-US"; // Set language to English

      // Add event listener for when speech is recognized
      recognition.onresult = function (event) {
        // Get the recognized speech for the first result
        const transcript = event.results[0][0].transcript.trim();

        // Log the transcript for debugging
        console.log("Transcript:", transcript);

        // Update the state with the recognized word
        setRecognizedWord(transcript);

        // Stop listening after detecting the first word
        recognition.stop();
      };

      // Start speech recognition
      recognition.start();
    } else {
      // Stop listening when mic is active
      recognition.stop();
      setRecognizedWord("");
    }
    setIsMicActive((prev) => !prev);
    setIsButtonIdle(false); // Toggle mic state
  };

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

  const handlePlayTextToSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(words);
    window.speechSynthesis.speak(utterance);
  };

  const handleCancel = () => {
    setShowModal(false);
    setRecognizedWord("");
    navigate(`/PopTheBalloon?id=${id}&dungeonName=${dungeonName}`, {
      state: { words: words, item: item },
    });
  };

  const handleAgain = () => {
    setRecognizedWord("");
    setWrongShowModal(false);
    setIsMicActive(!isMicActive);
  };

  const handleBack = () => {
    navigate(`/levelmap?id=${id}`);
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
        onClick={closeModal}
        className={`fixed inset-0 flex items-center justify-center transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 999 }} // Set a high z-index to ensure the modal appears on top
      >
        <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
        <div className="flex sm:p-5 lg:p-8 rounded-lg relative fade-up">
          <div className="relative">
            <img src="/say the word.png" alt="" className="h-screen" />
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="sm:text-[20px] md:text-[25px] lg:text-[30px] xl:text-[40px] 2xl:text-[50px] text-black pl-10">
          {" "}
          <FontAwesomeIcon
            icon={faStar}
            className="text-yellow-400 sm:text-[20px] md:text-[25px] lg:text-[30px] xl:text-[40px] 2xl:text-[50px] animate-bounce"
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
        <div className="w-[40%]">
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
          <div className="flex justify-center items-center sm:gap-2 lg:gap-5 sm:h-[50px] md:h-[70px] lg:h-[100px] xl:h-[120px] 2xl:h-[160px]">
            <p className="bg-white text-black sm:px-5 lg:px-10 sm:rounded-[5px] sm:text-[20px] sm:border-[3px] md:rounded-[10px] md:text-[25px] md:border-[5px] lg:rounded-[10px] lg:text-[40px] lg:border-[5px] xl:rounded-[10px] xl:text-[40px] xl:border-[5px] 2xl:rounded-[20px] 2xl:text-[70px] 2xl:border-[10px]2xl:text-[70px] 2xl:border-[10px] border-black">
              {words}
            </p>
            <button
              onClick={handlePlayTextToSpeech}
              className="active:scale-75 transition-transform bg-white sm:px-5 py-2 text-black sm:rounded-[5px] sm:border-[3px] md:border-[5px] md:rounded-[10px] lg:border-[5px] lg:rounded-[10px] xl:border-[5px] xl:rounded-[10px] 2xl:border-[10px] 2xl:rounded-[20px] sm:text-[15px] md:text-[20px] lg:text-[40px] xl:text-[40px] 2xl:text-[70px] border-black"
            >
              <FaVolumeUp />
            </button>
          </div>
          <div className="flex justify-center items-center gap-4">
            <button
              className={`active:scale-75 transition-transform bg-white text-black py-2 px-4 sm:rounded-[5px] sm:border-[3px] md:border-[5px] md:rounded-[10px] lg:border-[5px] lg:rounded-[10px] xl:border-[5px] xl:rounded-[10px] 2xl:border-[10px] 2xl:rounded-[20px] sm:text-[15px] md:text-[20px] lg:text-[40px] xl:text-[40px] 2xl:text-[70px] border-black ${
                isButtonIdle ? "idleAnimation" : ""
              }`}
              onClick={startSpeechRecognition}
            >
              {isMicActive ? <BiSolidMicrophone /> : <BiSolidMicrophoneOff />}
            </button>
            <button
              className="active:scale-75 transition-transform bg-white text-black py-2 px-4 sm:border-[3px] md:border-[5px] md:rounded-[10px] lg:border-[5px] lg:rounded-[10px] xl:border-[5px] xl:rounded-[10px] 2xl:border-[10px] 2xl:rounded-[20px] sm:text-[15px] md:text-[20px] lg:text-[40px] xl:text-[40px] 2xl:text-[70px] border-black"
              onClick={openModal}
            >
              <GiHelp />
            </button>
          </div>
        </div>
        <div className="w-[50%] flex justify-center items-center">
          <div className="flex justify-center items-center">
            {item.words.map((word, index) => (
              <div
                key={index}
                className={`${word === words[0] ? "block" : "hidden"}`}
              >
                <img
                  src={`/images/${item.image[index]}`}
                  className="sm:h-[270px] md:h-[300px] lg:h-[450px] xl:h-[550px] 2xl:h-[750px]"
                  alt=""
                />
              </div>
            ))}
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
                  src="/welldone.png"
                  alt=""
                  className=" sm:h-[200px] lg:h-[250px] xl:h-[300px] 2xl:h-[400px]"
                />
              </div>
              <div className="z-0">
                <img
                  src="/star.png"
                  alt=""
                  className=" sm:h-[200px] lg:h-[250px] xl:h-[300px] 2xl:h-[400px]"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center lg:pt-10">
              <button
                type="button"
                className="sm:rounded-[20px] lg:rounded-[30px] sm:text-[25px] lg:text-[40px] 2xl:text-[50px] sm:py-2 sm:px-5 lg:py-2 lg:px-5 2xl:py-5 2xl:px-10 inline-flex justify-center items-center gap-x-2 font-semibold border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                onClick={handleCancel}
              >
                NEXT
              </button>
            </div>
          </div>
        )}{" "}
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
                  className=" sm:h-[200px] lg:h-[250px] xl:h-[300px] 2xl:h-[400px]"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center lg:pt-10">
              <button
                type="button"
                className="sm:rounded-[20px] lg:rounded-[30px] sm:text-[25px] lg:text-[40px] 2xl:text-[50px] sm:py-2 sm:px-5 lg:py-2 lg:px-5 2xl:py-5 2xl:px-10 inline-flex justify-center items-center gap-x-2 font-semibold border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                onClick={handleAgain}
              >
                TRY AGAIN
              </button>
            </div>
          </div>
        )}
      </div>
      <audio ref={soundRef} src={correctSound} />
      <audio ref={wrongsoundRef} src={wrongSound} />
      <audio ref={warningsoundRef} src={warningSound} />
      <audio ref={saysoundRef} src={saySound} />
      <audio ref={audioRef} src={backgroundAudio} loop />
    </div>
  );
};

export default Speech;
