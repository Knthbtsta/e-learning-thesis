import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import Confetti from "react-dom-confetti";

const TropicalLevel = () => {
  const location = useLocation();
  const { item } = location.state;
  console.log("item", item);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSuportsSpeechRecognition,
  } = useSpeechRecognition();
  if (!browserSuportsSpeechRecognition) {
    console.log("Speech recognition is not supported on this browser");
  }

  const confettiRef = useRef(null);

  const handleSpeechRecognition = () => {
    SpeechRecognition.startListening({
      continuous: false,
      onEnd: () => {
        SpeechRecognition.stopListening();
      },
    });
  };

  return (
    <div className="bg-[url('/Tropical.png')] h-screen bg-no-repeat bg-cover">
      <div className="flex flex-row w-96   ml-32 pt-52 gap-12">
        {item.words &&
          item.words.map((items, index) => {
            console.log("items", items);
            return (
              <div className="text-yellow-200 text-5xl text-center" key={index}>
                <h1 className="px-3 py-4 h-[600px] w-[300px] bg-sky-500">
                  {items}
                </h1>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TropicalLevel;
