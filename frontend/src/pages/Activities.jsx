import React, { useState, useEffect } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = false; // Set to false to stop after one word
mic.interimResults = true;
mic.lang = "en-US";

const Activities = () => {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState("");
  const [accuracy, setAccuracy] = useState(0);
  const [savedNotes, setsavedNotes] = useState([]);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const calculatePronunciationAccuracy = (
    transcript,
    referenceWord
  ) => {
    const reference = referenceWord.toLowerCase();
    const spoken = transcript.toLowerCase();

    const correctCharacters = spoken
      .split("")
      .filter((char, index) => char === reference[index]);

    const accuracy = (correctCharacters.length / reference.length) * 100;

    return accuracy;
  };

  const handleListen = () => {
    if (isListening) {
      mic.start();
    } else {
      mic.stop();
      handleSaveNote();
    }

    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onend = () => {
      console.log("Stopped Mic");
      // Start mic again if still in listening mode
      if (isListening) {
        mic.start();
      }
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join(" ")
        .trim();

      console.log(transcript);
      setNote(transcript);

      // Calculate accuracy
      const trueWord = "App" // Change to your reference word
      const accuracy = calculatePronunciationAccuracy(transcript, trueWord);
      setAccuracy(accuracy);

      // Check if the word is spoken correctly
      const isCorrect = transcript.toLowerCase() === trueWord.toLowerCase();
      if (isCorrect) {
        console.log("The word is spoken correctly!");
      } else {
        console.log("The word is spoken incorrectly.");
      }

      // Stop listening after one word
      setIsListening(false);
    };

    mic.onerror = (event) => {
      console.log(event.error);
    };
  };

  const handleSaveNote = () => {
    setsavedNotes([...savedNotes, note]);
    setNote("");
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      {isListening ? <span></span> : <span></span>}
      <button
        className={isListening ? "pulse-button btn-danger" : "pulse-button"}
        onClick={() => setIsListening((prevState) => !prevState)}
      >
        {isListening ? <span>🎙️Stop</span> : <span>🛑Start</span>}
      </button>
      <p className="w-300 overflow-hidden whitespace-nowrap overflow-ellipsis border border-gray-300">
        {note}
      </p>
      <div className="text-green-500 font-bold mb-2">
        <p>Accuracy: {accuracy.toFixed(2)}%</p>
      </div>
      <>
        <h2>Notes</h2>
        {savedNotes.map((n) => (
          <p key={n}>{n}</p>
        ))}
      </>
    </div>
  );
};

export default Activities;
