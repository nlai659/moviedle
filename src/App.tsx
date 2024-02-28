import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HintArea from "./components/HintArea";
import SearchBar from "./components/SearchBar";

// Temp Data
import tempMovieData from "./assets/496243";
import tempCreditData from "./assets/credits";
import GameOverModal from "./components/GameOverModal";
import GuessNumber from "./components/GuessNumber";

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
      setGameOver(true);
      return;
    } else {
      setNumHints((prevNumHints) => prevNumHints + 1);
      console.log("Incorrect Answer");

      // Out of Hints
      if (numHints > NUM_HINTS) {
        setGameOver(true);
        return;
      }
    }
  };

  const onRandomMovie = () => {
    setNumHints(1);
    setGameOver(false);
  };

  const onModalClose = () => {
    setGameOver(false);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Header />
      <div className="mx-auto max-w-screen-md flex-1">
        {/* Loading */}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {/* Game Over Modal */}
            {gameOver && (
              <GameOverModal isVisible={gameOver} onModalClose={onModalClose} onRandomMovie={onRandomMovie} numHints={NUM_HINTS} numHintsUsed={numHints} />
            )}
            <HintArea
              movieData={movieData}
              creditData={creditData}
              numHints={numHints}
            />
          </>
        )}
      </div>
      <div className="mx-auto max-w-screen-md w-full mt-auto">
        <GuessNumber numHints={NUM_HINTS} numHintsUsed={numHints - 1} />
        <SearchBar checkAnswer={checkAnswer} />
        <Footer />
      </div>
    </div>
  );
  
}

export default App;
