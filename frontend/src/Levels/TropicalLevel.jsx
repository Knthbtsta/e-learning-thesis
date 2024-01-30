import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Confetti from "react-dom-confetti";
import axios from "axios";

const TropicalLevel = () => {
  const location = useLocation();
  const { item } = location.state;
  const [correctWordCount, setCorrectWordCount] = useState(0); // State to store the count of correct words
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const confettiRef = useRef(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    // Increment correctWordCount when transcript matches the current word
    if (
      transcript.toLowerCase() ===
        item.words[currentWordIndex].toLowerCase() &&
      transcript !== ""
    ) {
      setCorrectWordCount((prevCount) => prevCount + 1);
    }
  }, [transcript, item.words, currentWordIndex]);

  const handleNextWord = () => {
    const nextWordIndex = currentWordIndex + 1;
    if (nextWordIndex < item.words.length) {
      setCurrentWordIndex(nextWordIndex);
      resetTranscript();
    } else {
      alert("You Have Reached The Last Word");
    }
  };

  const handlePrevWord = () => {
    const prevWordIndex = currentWordIndex - 1;
    if (prevWordIndex === -1) {
      alert("You Have Reached The Beginning Word");
    } else if (prevWordIndex < item.words.length) {
      setCurrentWordIndex(prevWordIndex);
      resetTranscript();
    }
  };

  const handleSpeechRecognition = () => {
    SpeechRecognition.startListening({
      continuous: false,
      onEnd: () => {
        SpeechRecognition.stopListening();
      },
    });
  };

  const handlePlayTextToSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(
      item.words[currentWordIndex]
    );
    window.speechSynthesis.speak(utterance);
  };

  const confettiConfig = {
    angle: 120,
    spread: 360,
    startVelocity: 60,
    elementCount: 1000,
    dragFriction: 0.1,
    duration: 5000,
    stagger: 2,
    width: "15px",
    height: "15px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  return (
    <div className="bg-[url('/Tropical.png')] h-screen bg-no-repeat bg-cover flex flex-col justify-center items-center">
      <div className="bg-white rounded-[40px] shadow-md p-[40px] w-[500px]">
        <h1 className="text-black">SCORES: {correctWordCount} / {item.maxWords}</h1> {/* Display the number of correct words */}
        {item.words && item.words.length > 0 && (
          <div className="pt-[20px]">
            <div className="flex gap-10 justify-center ">
              <p className="text-gray-800 text-5xl text-center">
                {item.words[currentWordIndex]}
              </p>
              <button
                onClick={handlePlayTextToSpeech}
                className="bg-green-600 text-white py-2 px-4 rounded-md"
              >
                PLAY
              </button>
            </div>

            <div className="flex gap-4 pt-[50px] text-black">
              <p className="text-black">
                Microphone: {listening ? "on" : "off"}
              </p>
            </div>
            <div className="flex justify-center gap-4 pt-[50px]">
              <button
                className="bg-green-600 text-white py-2 px-4 rounded-md"
                onClick={handleSpeechRecognition}
              >
                START
              </button>
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-md"
                onClick={SpeechRecognition.stopListening}
              >
                STOP
              </button>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-md"
                onClick={resetTranscript}
              >
                RESET
              </button>
            </div>
            <div className="flex gap-4 pt-[50px] text-black">
              <p className="text-black">{transcript}</p>
            </div>
            <div className="flex flex-col gap-4 pt-[50px] justify-center">
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-md"
                onClick={handlePrevWord}
              >
                Prev Word
              </button>
              <button
                className="bg-green-600 text-white py-2 px-4 rounded-md"
                onClick={handleNextWord}
              >
                Next Word
              </button>
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-md"
                onClick={() => {
                  confettiRef.current && confettiRef.current.start();
                }}
              >
                Forfeit
              </button>
            </div>
            <Confetti
              ref={confettiRef}
              active={
                item.words[currentWordIndex].toLowerCase() ===
                transcript.toLowerCase()
              }
              config={confettiConfig}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TropicalLevel;
