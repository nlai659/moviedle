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
import {
  fetchMovieCredits,
  fetchRandomMovie,
  fetchDailyMovie,
  fetchRandomTV,
  fetchTVCredits,
  fetchDailyTV,
} from "./util/apiTMDB";
import categoryMapping from "./util/categoryMapping";
import { useAppSelector } from "./components/redux/hooks";
import { TMDB_movieParser, TMDB_tvParser } from "./util/hintDataParser";
import { MediaData } from "./types/mediaData";

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
    fetchAndSetData(category);
    configureDaily();
  }, [category]);

  const fetchAndSetData = async (category: number) => {
    let mediaDataResponse, creditDataResponse;
    let mediaDataParsed: MediaData;

    switch (category) {
      case categoryMapping.MOVIE:
        if (isDaily) {
          mediaDataResponse = await fetchDailyMovie();
        } else {
          mediaDataResponse = await fetchRandomMovie();
        }
        creditDataResponse = await fetchMovieCredits(mediaDataResponse.id);

        mediaDataParsed = TMDB_movieParser(mediaDataResponse, creditDataResponse);
        
        // Error checking (doesnt work for daily)
        if (mediaDataParsed.castList.length < 3 || mediaDataParsed.synopsis === "") {
          fetchAndSetData(category);
          return;
        }

        // Set Movie Data
        setMediaData(mediaDataParsed);
        setIsLoading(false);
        break;
      case categoryMapping.TV:
        if (isDaily) {
          mediaDataResponse = await fetchDailyTV();
        } else {
          mediaDataResponse = await fetchRandomTV();
        }
        creditDataResponse = await fetchTVCredits(mediaDataResponse.id);

        mediaDataParsed = TMDB_tvParser(mediaDataResponse, creditDataResponse);

        // Error checking (doesnt work for daily)
        if (mediaDataParsed.castList.length < 3 || mediaDataParsed.synopsis === "") {
          fetchAndSetData(category);
          return;
        }

        // Set TV Data
        setMediaData(mediaDataParsed);
        setIsLoading(false);
        break;
      default:
        // Handle default case if needed
        break;
    }
  };

  const configureDaily = () => {
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
    if (answer.toLowerCase() === mediaData.title.toLowerCase()) {
      setGameOver(true);
      setShowConfetti(true);
      if (isDaily) {
        localStorage.setItem(`gameWonDaily${category}`, "true");
      }
    } else {
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
  };

  useEffect(() => {
    if (gameOver == false) {
      fetchAndSetData(category);
    }
  }, [gameOver]);

  const resetGame = () => {
    setIsLoading(true);
    setNumHints(0);
    setGameOver(false);
    setShowConfetti(false);
  };

  const onPlay = () => {
    setIsDaily(true);
    setLandingModalVisible(false);
  };

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
        movieName={mediaData.title}
        posterPath={mediaData.poster_path}
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
