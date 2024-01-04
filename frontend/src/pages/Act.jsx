import React, { useEffect, useState, useRef} from 'react';
import { useSearchParams } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import Confetti from 'react-dom-confetti';

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
            `http://localhost:8800/api/quiz/${quiz_id}`
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
        if (nextWordIndex < quiz.items.length){
            setCurrentWordIndex(nextWordIndex);
            resetTranscript();
        }else{
            alert("You Have Reach The Last Word")
        }
    };
     const handlePrevWord = () => {
        const PrevWordIndex = currentWordIndex - 1;
        if (PrevWordIndex === -1){
            alert("You Have Reach The Beginning Word")
        }
        else if (PrevWordIndex < quiz.items.length){
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

    const handlePlayTextToSpeech = () => {
      const utterance = new SpeechSynthesisUtterance(quiz.items[currentWordIndex].word);
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
      width: '15px', // Adjusted confetti size
      height: '15px', // Adjusted confetti size
      perspective: '500px',
      colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
    };

  return (
    
    <div className="bg-[url('/background2.png')] bg-no-repeat bg-cover flex flex-col justify-center items-center h-screen">
      {quiz.title ? (
        <div className="bg-white rounded-[40px] shadow-md p-[40px] w-[500px]">
          <h1 className="text-2xl text-gray-600 font-bold mb-2">{quiz.title}</h1>
          <h1 className="text-lg text-gray-600 mb-4">{quiz.category}</h1>
          {quiz.items && quiz.items.length > 0 && (
            <div className="pt-[20px]">
              <div className="flex gap-10 justify-center ">
              <p className="text-gray-800 text-5xl text-center">{quiz.items[currentWordIndex].word}</p>
              <button 
              onClick={handlePlayTextToSpeech}
              className="bg-green-600 text-white py-2 px-4 rounded-md">
                PLAY
              </button>
              </div>
              {/* Add more properties as needed */}

               {/* Check if transcript is equal to the current word */}
               {transcript.toLowerCase() === quiz.items[currentWordIndex].word.toLowerCase() && transcript !== '' ? (
                <div className="bg-green-500 text-white text-center p-4 rounded-md mt-10">
                  CORRECT!!! NICE!!!
                </div>
              ) : transcript !== '' ? (
                <div className="bg-red-500 text-white text-center p-4 rounded-md mt-10">
                  NICE TRY!!! TRY AGAIN!!!
                </div>
              ) : null}


              <div className="flex gap-4 pt-[50px] text-black">
                <p className="text-black">Microphone: {listening ? 'on' : 'off'}</p>
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
                active={quiz.items[currentWordIndex].word.toLowerCase() === transcript.toLowerCase()}
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
