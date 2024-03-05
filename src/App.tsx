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
import CategorySelector from "./components/CategorySelector";
import categoryMapping from "./util/categoryMapping";
import { useAppSelector } from "./components/redux/hooks";

function App() {
  // Constants
  const NUM_HINTS = 5;

  const [landingModalVisible, setLandingModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [mediaData, setMediaData] = useState({});
  const [creditData, setCreditData] = useState({});
  const [movieName, setMovieName] = useState("");
  const [numHints, setNumHints] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDaily, setIsDaily] = useState(true);

  const category = useAppSelector((state) => state.category.category);

  useEffect(() => {
    resetGame();
    fetchAndSetData(category)
    configureDaily();
  }, [category]);

  const fetchAndSetData = async (category: number) => {
    let mediaDataResponse, creditDataResponse;
  
    switch (category) {
      case categoryMapping.MOVIE:
        mediaDataResponse = await fetchRandomMovie();
  
        if (isDaily) {
          mediaDataResponse = await fetchDailyMovie();
        }
  
        creditDataResponse = await fetchMovieCredits(mediaDataResponse.id);
        // Set Movie Data
        setMediaData(mediaDataResponse);
        setCreditData(creditDataResponse);
        setMovieName(mediaDataResponse.title);
        setIsLoading(false);
        break;
      default:
        // Handle default case if needed
        break;
    }
  };
  
  

  const configureDaily = () => {
    if(!isDaily) return;

    const currentDate = new Date();

    // Visited Today
    if (
      localStorage.getItem("lastDateVisited") === currentDate.toDateString()
    ) {
      setLandingModalVisible(false);

      // load previous game state
      const numHints = parseInt(localStorage.getItem("numHintsDaily") || "0");
      console.log("numHints in visit", numHints);
      setNumHints(numHints);
      setGameOver(true);
      if (numHints > NUM_HINTS) {
        setGameOver(true);
      }
    } else {
      // Hasn't Visited Today
      setIsDaily(true);
      setLandingModalVisible(true);
      localStorage.setItem("lastDateVisited", currentDate.toDateString());
    }
  };

  const checkAnswer = (answer: string) => {
    if (answer.toLowerCase() === movieName.toLowerCase()) {
      setGameOver(true);
      setShowConfetti(true);
    } else {
      setNumHints((prevNumHints) => prevNumHints + 1);
      if (isDaily) {
        localStorage.setItem("numHintsDaily", (numHints + 1).toString());
        console.log("numHintsDaily", numHints + 1);
      }

      // Out of Hints
      if (numHints + 1 > NUM_HINTS) {
        setGameOver(true);
      }
      return false;
    }
  };

  const onRandomMovie = () => {
    setIsDaily(false);
    setLandingModalVisible(false);
    resetGame();
    fetchAndSetData(category);
  };
  
  const resetGame = () => {
    setIsLoading(true);
    setNumHints(0);
    setGameOver(false);
    setShowConfetti(false);
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
        isDaily={isDaily}
        onRandomMovie={onRandomMovie}
        gameWin={numHints <= NUM_HINTS}
        movieName={movieName}
        posterPath={mediaData.poster_path}
        imdb_id={mediaData.imdb_id}
      />

      <Header />
      <div className="mx-auto min-w-screen-md max-w-screen-md flex-1">

        <CategorySelector />
        {isLoading ? (  
          <LoadingSpinner />
        ) : (
          <HintArea
            movieData={mediaData}
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
