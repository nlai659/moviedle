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
import CategorySelectorHamburger from "./components/game/CategorySelectorHamburger";
import { useAppDispatch } from "./components/redux/hooks";
import { setDaily } from "./components/redux/dailySlice";

function App() {
  // Constants
  const NUM_HINTS = 5;

  const [landingModalVisible, setLandingModalVisible] = useState(false);
  const [gameOverModalVisible, setGameOverModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mediaData, setMediaData] = useState({} as MediaData);
  const [numHints, setNumHints] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.category.category);
  const daily = useAppSelector((state) => state.daily.daily);

  useEffect(() => {
    resetGame();
    fetchAndSetData(category, daily);
    configureSettings();
  }, [category, daily]);

  const fetchAndSetData = async (category: number, isDaily: boolean) => {
    const mediaData = await fetchData(category, isDaily);
    setMediaData(mediaData);
    setIsLoading(false);
  };

  // Configure Settings - daily, numHints, gameWon etc.
  const configureSettings = () => {
    if (!daily) return;
  
    const currentDate = new Date();
    const lastDateVisitedKey = `lastDateVisited`;
    const gameOverDailyKey = `gameOverDaily${category}`;
    const numHintsKey = `numHintsDaily${category}`;
    const lastDateVisited = localStorage.getItem(lastDateVisitedKey);
  
    if (lastDateVisited === currentDate.toDateString()) {
      setLandingModalVisible(false);
  
      const gameOver = localStorage.getItem(gameOverDailyKey);
      const numHints = parseInt(localStorage.getItem(numHintsKey) || "0");
  
      if (gameOver === "true" && numHints <= NUM_HINTS) {
        setGameOverModalVisible(true);
        setShowConfetti(true);
      }
  
      setNumHints(numHints);
  
      if (numHints > NUM_HINTS) {
        setGameOverModalVisible(true);
        if (daily) {
          localStorage.setItem(`gameOverDaily${category}`, "true");
        }
      }
    } else {
      setLandingModalVisible(true);
      localStorage.setItem(lastDateVisitedKey, currentDate.toDateString());
    }
  };
  

  const checkAnswer = (answer: string) => {
    if (numHints > NUM_HINTS) {
      setGameOverModalVisible(true);
      return;
    }

    // Correct Answer
    if (answer.toLowerCase() === mediaData.title.toLowerCase()) {
      setGameOverModalVisible(true);
      setShowConfetti(true);
      if (daily) {
        localStorage.setItem(`gameOverDaily${category}`, "true");
      }
      return true;
    }
    // Incorrect Answer
    else {
      setNumHints((prevNumHints) => prevNumHints + 1);
      if (daily) {
        localStorage.setItem(
          `numHintsDaily${category}`,
          (numHints + 1).toString()
        );
      }

      // Out of Hints
      if (numHints + 1 > NUM_HINTS) {
        setGameOverModalVisible(true);
        if (daily) {
          localStorage.setItem(`gameOverDaily${category}`, "true");
        }
      }
      return false;
    }
  };

  const onRandomMovie = () => {
    dispatch(setDaily(false))
    resetGame();
  };

  const resetGame = () => {
    setMediaData({} as MediaData);
    setIsLoading(true);
    setNumHints(0);
    setGameOverModalVisible(false);
    setShowConfetti(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900">
      {/* Confetti */}
      {showConfetti && <ReactConfetti recycle={false} numberOfPieces={500} />}

      {/* Landing Modal */}
      <LandingModal
        isVisible={landingModalVisible}
        setIsVisible={setLandingModalVisible}
        setModalVisible={setLandingModalVisible}
      />

      {/* Game Over Modal */}
      <GameOverModal
        isVisible={gameOverModalVisible}
        setIsVisible={setGameOverModalVisible}
        isDaily={daily}
        onRandomMovie={onRandomMovie}
        mediaData={mediaData}
      />

      <div className="flex flex-row justify-between">
      <Header />
      <CategorySelectorHamburger/>
      </div>
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
