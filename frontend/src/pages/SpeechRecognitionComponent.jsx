import React, { useState } from "react";

const SpeechRecognitionComponent = () => {
  const [recognizedLetters, setRecognizedLetters] = useState("");

  const startSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition(); // Create speech recognition object
    recognition.lang = "en-US"; // Set language to English

    // Add event listener for when speech is recognized
    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript.trim(); // Get the recognized speech

      // Filter out non-letter characters using a regular expression
      const lettersOnly = transcript.replace(/[^a-zA-Z]/g, "");

      // Update the state with the filtered letters
      setRecognizedLetters(lettersOnly);
    };

    // Start speech recognition
    recognition.start();
  };

  return (
    <div>
      <button onClick={startSpeechRecognition}>Start Speech Recognition</button>
      <p>Recognized Letters: {recognizedLetters}</p>
    </div>
  );
};

export default SpeechRecognitionComponent;
