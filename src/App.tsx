import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HintArea from "./components/HintArea";
import SearchBar from "./components/SearchBar";

// Temp Data
import tempMovieData from "./assets/496243";
import tempCreditData from "./assets/credits";
import GameOverModal from "./components/GameOverModal";

function App() {
  const NUM_HINTS = 5;

  const [isLoading, setIsLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [movieData, setMovieData] = useState({});
  const [creditData, setCreditData] = useState({});
  const [movieName, setMovieName] = useState("");
  const [numHints, setNumHints] = useState(1);

  useEffect(() => {
    console.log("App Mounted");
    // Set Data
    setMovieData(tempMovieData);
    setCreditData(tempCreditData);
    setMovieName(tempMovieData.title);
    setIsLoading(false);
  }, []);

  const checkAnswer = (answer: string) => {
    // Check Answer
    if (answer.toLowerCase() === movieName.toLowerCase()) {
      console.log("Correct Answer");
      console.log("Game Over WIN");
    } else {
      setNumHints((prevNumHints) => prevNumHints + 1);
      console.log("Incorrect Answer");

      // Out of Hints
      if (numHints > NUM_HINTS) {
        setGameOver(true);
        console.log("Game Over LOSE");
        return;
      }
    }
  };

  const resetGame = () => {
    setNumHints(1);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-800">
      <Header />
      <div className="mx-auto max-w-screen-md">
        {/* Loading */}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {/* Game Over Modal */}
            {gameOver && (
              <GameOverModal isVisible={gameOver} onClose={resetGame} />
            )}
            <HintArea
              movieData={movieData}
              creditData={creditData}
              numHints={numHints}
            />
            <SearchBar checkAnswer={checkAnswer} />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
