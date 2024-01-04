import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "animate.css";
import { FcSpeaker } from "react-icons/fc";
import axios from "axios";

const EasyShorta = () => {
  const [getWordsByRandom, setGetWordsByRandom] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [spokenWords, setSpokenWords] = useState([]);
  const [started, setStarted] = useState(false);
  const [hoverChances, setHoverChances] = useState({});

  const toggleStartReset = () => {
    if (started) {
      console.log("Calling resetState");
      resetState();
    } else {
      setStarted(true);
      speakAllWords();
    }
  };

  const resetState = () => {
    setStarted(false);
    setCurrentWordIndex(0);
    setSpokenWords([]);
    setHoverChances({});
    window.speechSynthesis.cancel();
  };

  const getFemaleVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (voice) => voice.name === "Google UK English Female"
    );
    return femaleVoice;
  };

  const speakWord = (word, index) => {
    const value = new SpeechSynthesisUtterance(word);

    const femaleVoice = getFemaleVoice();
    if (femaleVoice) {
      value.voice = femaleVoice;
    }

    value.onend = () => {
      setCurrentWordIndex(
        (prevIndex) => (prevIndex + 1) % getWordsByRandom.length
      );
    };

    window.speechSynthesis.speak(value);
    setSpokenWords((prevWords) => [...prevWords, word]);
  };

  const speakAllWords = () => {
    getWordsByRandom.forEach((wordObject, index) => {
      setTimeout(() => {
        speakWord(wordObject.word, index);
      }, index * 2300);
    });
  };

  useEffect(() => {
    const fetchGetWordsByRandom = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/words");
        setGetWordsByRandom(response.data);
        setHoverChances(
          response.data.reduce((acc, wordObject) => {
            acc[wordObject.word] = 5;
            return acc;
          }, {})
        );
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchGetWordsByRandom();
  }, []);

  const speakWordOnHover = (word) => {
    if (hoverChances[word] > 0) {
      const value = new SpeechSynthesisUtterance(word);

      const femaleVoice = getFemaleVoice();
      if (femaleVoice) {
        value.voice = femaleVoice;
      }

      window.speechSynthesis.speak(value);
      setSpokenWords((prevWords) => [...prevWords, word]);
      setHoverChances((prevChances) => ({
        ...prevChances,
        [word]: prevChances[word] - 1,
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[url('/official3.png')] bg-no-repeat bg-cover relative"
    >
      <div className="flex flex-col justify-center items-center text-center">
        <div className="p-10 sm:text-2xl lg:text-4xl xl:text-5xl px-40 rounded-l-[50%] rounded-r-[50%] sm:tracking-widest font-bold bg-gradient-to-br from-teal-700 via-sky-400 to-sky-700 hover:bg-gradient-to-bl">
          <h1>SHORT A SOUND!</h1>
        </div>
      </div>

      <div className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center text-center ml-20 sm:ml-6 md:ml-12 xl:ml-24 mt-10 md:mt-10 lg:mt-10 xl:mt-12 pb-12 items-start sm:text-2xl lg:text-4xl xl:text-5xl text-2xl">
        {getWordsByRandom.map((item, index) => (
          <div
            key={index}
            className={`bg-cyan-600 mt-5 h-[15rem] w-[330px] rounded-t-[20%] rounded-b-[20%] shadow-lg rounded-md tracking-widest ${
              index === currentWordIndex
                ? "bg-yellow-200 animate__animated animate__tada"
                : ""
            }`}
            onMouseEnter={() => speakWordOnHover(item.word)}
          >
            <p
              className="p-10 rounded-b-[50%] rounded-r-[10%] bg-cyan-500 transition duration-300 transform hover:scale-110"
              key={item._id}
            >
              {item.word}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start fixed bottom-0 left-0 mt-12 mb-10 ml-10 font-bold tracking-widest">
        <Link
          to="/phonics"
          className="px-5 py-4 bg-gradient-to-br from-teal-700 via-sky-400 to-sky-700 hover:bg-gradient-to-bl rounded-full"
        >
          BACK TO PAGE
        </Link>
      </div>

      <div className="flex flex-col items-end fixed bottom-0 right-0 mb-10 mr-10 font-bold tracking-widest">
        <Link
          to="/phonics"
          className="px-5 py-4 bg-gradient-to-br from-teal-700 via-sky-400 to-sky-700 hover:bg-gradient-to-bl rounded-full"
        >
          NEXT PAGE
        </Link>
      </div>
    </motion.div>
  );
};

export default EasyShorta;
