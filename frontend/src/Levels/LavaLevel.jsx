import React, { useEffect, useState, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import Confetti from "react-dom-confetti";

const LavaLevel = () => {
  const location = useLocation()
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
    <div className="bg-[url('/Lava.png')] h-screen bg-no-repeat bg-cover">
      <div className="">
        {item.words &&
          item.words.map((items, index) => {
            console.log("items", items);
            return (
              <div key={index}>
                <h1>{items}</h1>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default LavaLevel;
