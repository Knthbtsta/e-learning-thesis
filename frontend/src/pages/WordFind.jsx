import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Import Axios for HTTP requests

const WordFind = () => {
  const gridSize = 6; // Adjust the grid size
  const [grid, setGrid] = useState([]);
  const [words, setWords] = useState([]);
  const [image, setImage] = useState("");
  const location = useLocation();
  const { item } = location.state;

  const directions = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];

  useEffect(() => {
    // Generate grid and initialize words when item changes
    if (
      item &&
      item.words &&
      item.words.length > 0 &&
      item.image &&
      item.image.length > 0
    ) {
      const randomIndex = Math.floor(Math.random() * item.words.length);
      setWords([item.words[randomIndex]]);
      setImage(item.image[randomIndex]);
      setGrid(generateGrid());
    }
  }, [item]);

  console.log("WORD", words);
  
  const generateGrid = () => {
    const grid = [];
    for (let i = 0; i < gridSize; i++) {
      grid.push([]);
      for (let j = 0; j < gridSize; j++) {
        grid[i][j] = "."; // Initialize with dots to represent empty cells
      }
    }

    // Place words horizontally or vertically
    for (const word of words) {
      const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
      const maxLength =
        direction === "horizontal" ? gridSize - word.length + 1 : gridSize;

      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * maxLength);

        if (direction === "horizontal") {
          placed = placeWordHorizontal(grid, word, row, col);
        } else {
          placed = placeWordVertical(grid, word, row, col);
        }
      }
    }

    // Fill the remaining cells with random letters
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (grid[i][j] === ".") {
          grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random uppercase letter
        }
      }
    }

    return grid;
  };

  const placeWordHorizontal = (grid, word, row, col) => {
    if (col + word.length > gridSize) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[row][col + i] !== "." && grid[row][col + i] !== word[i])
        return false;
    }
    for (let i = 0; i < word.length; i++) {
      grid[row][col + i] = word[i];
    }
    return true;
  };

  const placeWordVertical = (grid, word, row, col) => {
    if (row + word.length > gridSize) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[row + i][col] !== "." && grid[row + i][col] !== word[i])
        return false;
    }
    for (let i = 0; i < word.length; i++) {
      grid[row + i][col] = word[i];
    }
    return true;
  };

  const handleWordSearch = (event) => {
    event.preventDefault();
    const inputWord = event.target.elements.word.value.toUpperCase();
    const foundWord = findWord(inputWord);
    if (foundWord) {
      alert(
        `Found word "${inputWord}" from (${foundWord.start.row},${foundWord.start.col}) to (${foundWord.end.row},${foundWord.end.col})`
      );
    } else {
      alert(`Word "${inputWord}" not found.`);
    }
    event.target.reset();
  };

  const findWord = (word) => {
    const wordLength = word.length;
    const height = grid.length;
    const width = grid[0].length;

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        for (const [dRow, dCol] of directions) {
          let found = true;
          for (let i = 0; i < wordLength; i++) {
            const newRow = row + i * dRow;
            const newCol = col + i * dCol;
            if (
              newRow < 0 ||
              newRow >= height ||
              newCol < 0 ||
              newCol >= width ||
              grid[newRow][newCol] !== word[i]
            ) {
              found = false;
              break;
            }
          }
          if (found) {
            return {
              start: { row, col },
              end: {
                row: row + (wordLength - 1) * dRow,
                col: col + (wordLength - 1) * dCol,
              },
            };
          }
        }
      }
    }
    return null;
  };

  return (
    <div className="App">
      <h1>Word Search Game</h1>
      <p>Find words hidden in the grid:</p>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((letter, colIndex) => (
              <span key={colIndex}>{letter}</span>
            ))}
          </div>
        ))}
      </div>
      <form onSubmit={handleWordSearch}>
        <input type="text" name="word" placeholder="Enter a word" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default WordFind;
