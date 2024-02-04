import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../balloon.css"; // Import CSS file for styles
import axios from "axios"; // Import Axios for HTTP requests
import { useSearchParams } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Speech = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const dungeonName = searchParams.get("dungeonName");
  const [words, setWords] = useState([]);
  const [stars, setStars] = useState(0); // Initialize stars state
  const location = useLocation();
  const item = location.state?.item;
  const [user, setUser] = useState({});
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
  }

  useEffect(() => {
    // Fetch initial stars count from the database
    fetchStarsCount();

    if (item && item.words && item.words.length > 0) {
      const randomIndex = Math.floor(Math.random() * item.words.length);
      setWords([item.words[randomIndex]]);
    }
  }, [item]);

  const fetchStarsCount = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api/user/${id}`);
      const initialStars = response.data.stars;
      setStars(initialStars);
    } catch (error) {
      console.error("Error fetching stars count:", error);
    }
  };

  const handleSpeechRecognition = () => {
    SpeechRecognition.startListening({
      continuous: false,
      onEnd: () => {
        // Automatically stop the microphone after recording one word
        SpeechRecognition.stopListening();
      },
    });
  };

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

  const handlePlayTextToSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(words);
    window.speechSynthesis.speak(utterance);
  };

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (transcript && words.length > 0) {
      const transcriptLower = transcript.toLowerCase();
      const matchedWord = words.find(
        (word) => word.toLowerCase() === transcriptLower
      );
      if (matchedWord) {
        setShowModal(true);
        const newStars = stars + 1;
        setStars(newStars);
        updateStarsCount(newStars);
      }
    }
  }, [transcript, words]);

  const handleCancel = () => {
    resetTranscript();
    setShowModal(false);
  };

  return (
    <div className="h-screen w-full bg-[url('/minigamebg.png')] bg-no-repeat bg-cover">
      <div className="text-[100px] text-black pl-10">
        <FontAwesomeIcon
          icon={faStar}
          style={{
            color: "#FFD43B",
            fontSize: "6rem",
            paddingTop: "10px",
          }}
          bounce
        />
        {user.stars}
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[45%] flex flex-col justify-center items-center">
          <div className="text-[100px] pt-[100px]">
            <button
              onClick={handlePlayTextToSpeech}
              className="bg-green-600 text-white px-4 rounded-[50px]"
            >
              PLAY
            </button>
            <span className="text-[150px] text-black px-10 bounce-in">
              {words.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
            </span>
          </div>
          <div className="flex flex-col gap-4 pt-[50px] text-black">
            <p className="text-black text-[50px]">
              Microphone: {listening ? "on" : "off"}
            </p>
          </div>
          <div className="flex justify-center gap-4 pt-[50px]">
            <button
              className="bg-green-600 text-white py-2 px-4 rounded-[50px] text-[50px]"
              onClick={handleSpeechRecognition}
            >
              START
            </button>
            <button
              className="bg-red-600 text-white py-2 px-4 rounded-[50px] text-[50px]"
              onClick={SpeechRecognition.stopListening}
            >
              STOP
            </button>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-[50px] text-[50px]"
              onClick={resetTranscript}
            >
              RESET
            </button>
          </div>
          <div className="flex gap-4 pt-[50px] text-black">
            <p className="text-black text-[50px]">{transcript}</p>
          </div>
        </div>
        <div className="w-[55%] flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <div className="text-[300px] text-black bounce-in">
              {dungeonName}
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
    </div>
  );
};

export default Speech;
