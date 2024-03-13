import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SpeechRecognitionComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const dungeonName = searchParams.get("dungeonName");
  const location = useLocation();
  const { words } = location.state;
  const [user, setUser] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const { item } = location.state;
  const [recognizedLetters, setRecognizedLetters] = useState("");

  useEffect(() => {
    // Fetch initial stars count from the database

    if (words && words.length > 0) {
      const randomIndex = Math.floor(Math.random() * words.length);
      [words[randomIndex]];
    }
  }, [words]);

  useEffect(() => {
    // Use a setTimeout to change the image every 2 seconds (adjust as needed)
    const timeoutId = setTimeout(() => {
      const nextImageIndex = (currentImageIndex + 1) % item.image.length;
      setCurrentImageIndex(nextImageIndex);
    }, 2000); // Change image every 2 seconds (adjust as needed)

    // Cleanup the timeout when component unmounts or when the word changes
    return () => clearTimeout(timeoutId);
  }, [currentImageIndex, item.image]);

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

  const startSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition(); // Create speech recognition object
    recognition.lang = "en-US"; // Set language to English

    // Initialize variable to store recognized letters
    let recognizedLetters = "";

    // Add event listener for when speech is recognized
    recognition.onresult = function (event) {
      for (let i = 0; i < event.results.length; i++) {
        // Loop through each recognition result
        const transcript = event.results[i][0].transcript.trim(); // Get the recognized speech for this result

        // Log the transcript for debugging
        console.log("Transcript:", transcript);

        // Check if the transcript is a single word
        const isSingleWord = transcript.split(" ").length === 1;

        // If it's a single word, skip adding it to recognizedLetters
        if (isSingleWord) {
          continue;
        }

        // Filter out non-letter characters and append to recognizedLetters
        const letters = transcript.match(/[a-zA-Z]/g);
        if (letters) {
          recognizedLetters += letters.join("");
        }
      }

      // Log the recognized letters for debugging
      console.log("Recognized Letters:", recognizedLetters);

      // Update the state with the recognized letters
      setRecognizedLetters(recognizedLetters);
    };

    // Start speech recognition
    recognition.start();
  };
  const resetRecognizedLetters = () => {
    setRecognizedLetters("");
  };
  return (
    <div className="h-screen w-full bg-[url('/minigamebg.png')] bg-no-repeat bg-cover">
      <div className="flex justify-center items-center h-full">
        <div className="w-[45%] flex flex-col justify-center items-center">
          <div className="flex gap-10">
            <button
              className="bg-green-600 text-white py-2 px-4 rounded-[50px] text-[50px]"
              onClick={startSpeechRecognition}
            >
              Start
            </button>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-[50px] text-[50px]"
              onClick={resetRecognizedLetters}
            >
              RESET
            </button>
          </div>
          <p>Recognized Letters: {recognizedLetters}</p>
        </div>
        <div className="w-[55%] flex justify-center items-center">
          <div className="flex justify-center items-center">
            {item.image.map((image, index) => (
              <div
                key={index}
                style={{
                  display: index === currentWordIndex ? "block" : "none", // Use currentWordIndex to sync with the current word
                }}
              >
                <img src={`/images/${image}`} className="h-[600px]" alt="" />
              </div>
            ))}
            <div className="text-[300px] text-black bounce-in pr-20">
              {dungeonName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechRecognitionComponent;
