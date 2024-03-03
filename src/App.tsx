import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HintArea from "./components/HintArea";
import SearchBar from "./components/SearchBar";
import GameOverModal from "./components/GameOverModal";
import GuessNumber from "./components/GuessNumber";
import LandingModal from "./components/LandingModal";
import LoadingSpinner from "./components/LoadingSpinner";
import ReactConfetti from "react-confetti";
import { fetchMovieCredits, fetchRandomMovie, fetchDailyMovie } from "./util/api";

function App() {
  // Constants
  const NUM_HINTS = 5;

  const [landingModalVisible, setLandingModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [movieData, setMovieData] = useState({});
  const [creditData, setCreditData] = useState({});
  const [movieName, setMovieName] = useState("");
  const [numHints, setNumHints] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDaily, setIsDaily] = useState(true);

  // On Mount - Fetch & Set Data
  useEffect(() => {
    console.log("App Mounted");
    fetchAndSetDailyData();
  }, []);

  const fetchAndSetDailyData = async () => {
    // Set Daily Movie Data
    const movieDataResponse = await fetchDailyMovie();
    const creditDataResponse = await fetchMovieCredits(movieDataResponse.id);

    // Set Movie Data
    setMovieData(movieDataResponse);
    setCreditData(creditDataResponse);
    setMovieName(movieDataResponse.title);
    setIsLoading(false);

    configureDaily();
  }

  const configureDaily = () => {
    const currentDate = new Date();

    // Visited Today
    if (localStorage.getItem("lastDateVisited") === currentDate.toDateString()) {
      setLandingModalVisible(false);
      
      // load previous game state
      const numHints = parseInt(localStorage.getItem("numHints") || "0");
      setNumHints(numHints);
      if (numHints >= NUM_HINTS) {
        setGameOver(true);
      }
    } else {
      // Hasn't Visited Today
      setIsDaily(true);
      setLandingModalVisible(true);
      localStorage.setItem("lastDateVisited", currentDate.toDateString());
    }
};


  const fetchAndSetData = async () => {
    const movieDataResponse = await fetchRandomMovie();
    const creditDataResponse = await fetchMovieCredits(movieDataResponse.id);

    // Set Movie Data
    setMovieData(movieDataResponse);
    setCreditData(creditDataResponse);
    setMovieName(movieDataResponse.title);
    setIsLoading(false);
  };

  const checkAnswer = (answer: string) => {
    if (answer.toLowerCase() === movieName.toLowerCase()) {
      setGameOver(true);
      setShowConfetti(true);
    } else {
      setNumHints((prevNumHints) => prevNumHints + 1);
      if (isDaily) {
        localStorage.setItem("numHints", (numHints + 1).toString());
      }

      // Out of Hints
      if (numHints >= NUM_HINTS) {
        setGameOver(true);
      }
      return false;
    }
  };

  const onRandomMovie = () => {
    setIsDaily(false);
    resetGame();
    fetchAndSetData();
    setLandingModalVisible(false);
  };

  const resetGame = () => {
    setIsLoading(true);
    setNumHints(0);
    setGameOver(false);
    setShowConfetti(false);
  }

  const onGameOverModalClose = () => {
    setGameOver(false);
  }

  const onPlay = () => {
    setIsDaily(true);
    setLandingModalVisible(false);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      {/* Confetti */}
      {showConfetti && <ReactConfetti recycle={false} numberOfPieces={500} />}

      {/* Landing Modal */}
      <LandingModal
        isVisible={landingModalVisible}
        onPlay={onPlay}
        onRandomMovie={onRandomMovie}
      />

      {/* Game Over Modal */}
      <GameOverModal
        isVisible={gameOver}
        onModalClose={onGameOverModalClose}
        onRandomMovie={onRandomMovie}
        gameWin={numHints <= NUM_HINTS}
        movieName={movieName}
        posterPath={movieData.poster_path}
        imdb_id={movieData.imdb_id}
      />

      <Header />
      <div className="mx-auto min-w-screen-md max-w-screen-md flex-1">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <HintArea
            movieData={movieData}
            creditData={creditData}
            numHints={numHints}
          />
        )}
      </div>
      <div className="mx-auto max-w-screen-md w-full mt-auto">
        <GuessNumber numHints={NUM_HINTS} numHintsUsed={numHints} />
        <SearchBar checkAnswer={checkAnswer} />
        <Footer />
      </div>
    </div>
  );
  
}

export default App;
