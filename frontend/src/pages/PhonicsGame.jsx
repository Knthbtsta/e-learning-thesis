import React, { useState, useEffect } from "react";
import axios from "axios";

const PhonicsGame = () => {
  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState("");
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/island/");
        if (response.status === 200) {
          setWords(response.data); // Assuming your API returns an array of words with properties like 'word' and 'image'
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  const handleCardClick = (word) => {
    if (selectedWord === "") {
      // First card selected
      setSelectedWord(word);
    } else {
      // Second card selected
      if (selectedWord === word) {
        // Matched!
        setMatchedPairs([...matchedPairs, selectedWord]);
        setScore(score + 1);
      }
      // Reset selected word for the next attempt
      setSelectedWord("");
    }
  };

  const renderCards = () => {
    return words.map((wordObj, index) => {
      const isMatched = matchedPairs.includes(wordObj.word);
      const isFlipped = selectedWord === wordObj.word || isMatched;

      return (
        <div
          key={index}
          className={`card ${isFlipped ? "flipped" : ""}`}
          onClick={() => !isFlipped && handleCardClick(wordObj.word)}
        >
          {isFlipped ? (
            <img src={wordObj.image} alt={wordObj.word} />
          ) : (
            <div className="card-cover"></div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="phonics-game">
      <div className="score">Score: {score}</div>
      <div className="game-board">{renderCards()}</div>
    </div>
  );
};

export default PhonicsGame;
