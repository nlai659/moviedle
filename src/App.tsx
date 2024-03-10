import { useEffect, useState } from "react";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import HintArea from "./components/game/HintArea";
import SearchBar from "./components/game/SearchBar";
import GameOverModal from "./components/modal/GameOverModal";
import GuessNumber from "./components/game/GuessNumber";
import LandingModal from "./components/modal/LandingModal";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ReactConfetti from "react-confetti";
import { useAppSelector } from "./components/redux/hooks";
import { MediaData } from "./types/MediaData";
import { fetchData } from "./services/dataFetching";

function App() {
  // Constants
  const NUM_HINTS = 5;

  const [landingModalVisible, setLandingModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [mediaData, setMediaData] = useState({} as MediaData);
  const [numHints, setNumHints] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDaily, setIsDaily] = useState(true);

  const category = useAppSelector((state) => state.category.category);

  useEffect(() => {
    resetGame();
    setIsDaily(true);
    fetchAndSetData(category, true);
    configureSettings();
  }, [category]);

  const fetchAndSetData = async (category: number, isDaily: boolean) => {
    const mediaData = await fetchData(category, isDaily);
    setMediaData(mediaData);
    setIsLoading(false);
  };

  // Configure Settings - daily, numHints, gameWon etc.
  const configureSettings = () => {
    if (!isDaily) return;

    const currentDate = new Date();

    // Visited Today
    if (
      localStorage.getItem(`lastDateVisited${category}`) ===
      currentDate.toDateString()
    ) {
      setLandingModalVisible(false);

      // load previous game state
      const gameWon = localStorage.getItem(`gameWonDaily${category}`);
      const numHints = parseInt(
        localStorage.getItem(`numHintsDaily${category}`) || "0"
      );
      if (gameWon === "true") {
        setGameOver(true);
        setShowConfetti(true);
      }
      setNumHints(numHints);
      if (numHints > NUM_HINTS) {
        setGameOver(true);
      }
    } else {
      // Hasn't Visited Today
      setIsDaily(true);
      setLandingModalVisible(true);
      localStorage.setItem(
        `lastDateVisited${category}`,
        currentDate.toDateString()
      );
    }
  };

  const checkAnswer = (answer: string) => {
    // Correct Answer
    if (answer.toLowerCase() === mediaData.title.toLowerCase()) {
      setGameOver(true);
      setShowConfetti(true);
      if (isDaily) {
        localStorage.setItem(`gameWonDaily${category}`, "true");
      }
      return true;
    }
    // Incorrect Answer
    else {
      setNumHints((prevNumHints) => prevNumHints + 1);
      if (isDaily) {
        localStorage.setItem(
          `numHintsDaily${category}`,
          (numHints + 1).toString()
        );
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
    fetchAndSetData(category, false)
  };

  const resetGame = () => {
    setMediaData({} as MediaData);
    setIsLoading(true);
    setNumHints(0);
    setGameOver(false);
    setShowConfetti(false);
  };

  const onPlayDaily = () => {
    setLandingModalVisible(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      {/* Confetti */}
      {showConfetti && <ReactConfetti recycle={false} numberOfPieces={500} />}

      {/* Landing Modal */}
      <LandingModal
        isVisible={landingModalVisible}
        onPlayDaily={onPlayDaily}
        onRandomMovie={onRandomMovie}
      />

      {/* Game Over Modal */}
      <GameOverModal
        isVisible={gameOver}
        isDaily={isDaily}
        onRandomMovie={onRandomMovie}
        gameWin={numHints <= NUM_HINTS}
        movieName={mediaData.title}
        posterPath={mediaData.poster_path}
        link={mediaData.link}
      />

      <Header />
      <div className="mx-auto min-w-screen-md max-w-screen-md flex-1">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <HintArea
            mediaData={mediaData}
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
