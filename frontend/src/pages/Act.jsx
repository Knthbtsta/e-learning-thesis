import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import Confetti from "react-dom-confetti";
import { Link } from "react-router-dom";
const Act = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const quiz_id = searchParams.get("quiz_id");
  const [quiz, setQuiz] = useState({});
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
  }
  const confettiRef = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const quizDetailResponse = await axios.get(
          `https://e-learning-thesis-tupm.onrender.com/api/quiz/${quiz_id}`
        );
        console.log(quizDetailResponse);
        if (quizDetailResponse.status === 200) setQuiz(quizDetailResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  console.log(quiz);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const handleNextWord = () => {
    const nextWordIndex = currentWordIndex + 1;
    if (nextWordIndex < quiz.items.length) {
      setCurrentWordIndex(nextWordIndex);
      resetTranscript();
    } else {
      alert("You Have Reach The Last Word");
    }
  };
  const handlePrevWord = () => {
    const PrevWordIndex = currentWordIndex - 1;
    if (PrevWordIndex === -1) {
      alert("You Have Reach The Beginning Word");
    } else if (PrevWordIndex < quiz.items.length) {
      setCurrentWordIndex(PrevWordIndex);
      resetTranscript();
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
console.log(transcript);
  const handlePlayTextToSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(
      quiz.items[currentWordIndex].word
    );
    window.speechSynthesis.speak(utterance);
  };

  const confettiConfig = {
    angle: 120,
    spread: 360,
    startVelocity: 60, // Increased start velocity for a more explosive effect
    elementCount: 1000, // More confetti elements
    dragFriction: 0.1, // Adjusted drag friction
    duration: 5000,
    stagger: 2,
    width: "15px", // Adjusted confetti size
    height: "15px", // Adjusted confetti size
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
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
  }, [isPortrait]);

  return (
    <div className="bg-[url('/background2.png')] bg-no-repeat bg-cover flex flex-col justify-center items-center h-screen">
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
      {quiz.title ? (
        <div className="bg-white rounded-[40px] shadow-md p-7 lg:p-[40px] w-[500px] h-[300px] lg:h-[600px]">
          <h1 className="text-[20px] text-gray-600 font-bold lg:mb-2">
            {quiz.title}
          </h1>
          <h1 className="text-[10px] lg:text-lg text-gray-600 lg:mb-4">
            {quiz.category}
          </h1>
          {quiz.items && quiz.items.length > 0 && (
            <div className="lg:pt-[20px]">
              <div className="flex gap-10 justify-center ">
                <p className="text-gray-800 text-[50px] lg:text-5xl text-center">
                  {quiz.items[currentWordIndex].word}
                </p>
                <button
                  onClick={handlePlayTextToSpeech}
                  className="bg-green-600 text-white m-3 lg:m-0 lg:py-2 px-4 rounded-md"
                >
                  PLAY
                </button>
              </div>
              {/* Add more properties as needed */}

              {/* Check if transcript is equal to the current word */}
              {transcript.toLowerCase() ===
                quiz.items[currentWordIndex].word.toLowerCase() &&
              transcript !== "" ? (
                <div className="bg-green-500 text-white text-center p-2 lg:p-4 rounded-md lg:mt-10">
                  CORRECT!!! NICE!!!
                </div>
              ) : transcript !== "" ? (
                <div className="bg-red-500 text-white text-center p-2 lg:p-4 rounded-md lg:mt-10">
                  NICE TRY!!! TRY AGAIN!!!
                </div>
              ) : null}
              <div className="flex justify-center gap-4 pt-2 lg:pt-[50px]">
                <button
                  className="bg-green-600 text-white py-2 px-2 lg:py-2 lg:px-4  rounded-md"
                  onClick={handleSpeechRecognition}
                >
                  START
                </button>
                <button
                  className="bg-red-600 text-white py-2 px-2 lg:py-2 lg:px-4  rounded-md"
                  onClick={SpeechRecognition.stopListening}
                >
                  STOP
                </button>
                <button
                  className="bg-blue-600 text-white py-2 px-2 lg:py-2 lg:px-4  rounded-md"
                  onClick={resetTranscript}
                >
                  RESET
                </button>
              </div>
              <div className="flex flex-row lg:flex-col gap-4 pt-2 lg:pt-[50px] justify-center">
                <button
                  className="bg-blue-600 text-white py-2 px-2 lg:py-2 lg:px-4  rounded-md"
                  onClick={handlePrevWord}
                >
                  Prev Word
                </button>
                <button
                  className="bg-green-600 text-white py-2 px-2 lg:py-2 lg:px-4 rounded-md"
                  onClick={handleNextWord}
                >
                  Next Word
                </button>
                <Link
                  className="bg-red-600 text-white py-2 px-2 lg:py-2 lg:px-4 uptext-center rounded-md"
                  onClick={() => {
                    confettiRef.current && confettiRef.current.start();
                  }}
                  to='/activitycontents'
                >
                  Forfeit
                </Link>
              </div>
              <Confetti
                ref={confettiRef}
                active={
                  quiz.items[currentWordIndex].word.toLowerCase() ===
                  transcript.toLowerCase()
                }
                config={confettiConfig}
              />
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Act;
