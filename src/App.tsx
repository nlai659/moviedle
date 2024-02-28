import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HintArea from "./components/HintArea";
import SearchBar from "./components/SearchBar";
import GameOverModal from "./components/GameOverModal";
import GuessNumber from "./components/GuessNumber";
import { getRandomNumber, getRandomYear } from "./util/random";
import LandingModal from "./components/LandingModal";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  // Constants
  const NUM_HINTS = 5;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_READ_ACCESS = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;
  const API_URL = "https://api.themoviedb.org/3/";

  const [landingModalVisible, setLandingModalVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [movieData, setMovieData] = useState({});
  const [creditData, setCreditData] = useState({});
  const [movieName, setMovieName] = useState("");
  const [numHints, setNumHints] = useState(1);

  // On Mount - Fetch & Set Data
  useEffect(() => {
    //fetchAndSetData();
  }, []);

  const fetchAndSetData = async () => {
    const randomYear = getRandomYear();
    const randomPage = getRandomNumber(1, 3);
    const randomNumber = getRandomNumber(0, 19);
    
    // Fetch Movie Data
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${API_READ_ACCESS}`,
      },
    }

    const movieDataResponse = await fetch(
      `${API_URL}discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${randomPage}&primary_release_year=${randomYear}`, options
    ).then((res) => res.json()).then((data) => data.results[randomNumber]);

    // Fetch Credit Data
    const creditDataResponse = await fetch(
      `${API_URL}movie/${movieDataResponse.id}/credits?api_key=${API_KEY}`
    ).then((res) => res.json());

    // Set Movie Data
    setMovieData(movieDataResponse);
    setCreditData(creditDataResponse);
    setMovieName(movieDataResponse.title);
    setIsLoading(false);
  };

  const checkAnswer = (answer: string) => {
    // Check Answer
    if (answer.toLowerCase() === movieName.toLowerCase()) {
      setGameOver(true);
      return true;
    } else {
      setNumHints((prevNumHints) => prevNumHints + 1);

      // Out of Hints
      if (numHints > NUM_HINTS) {
        setGameOver(true);
        return;
      }

      return false;
    }
  };

  const onRandomMovie = () => {
    setIsLoading(true);
    fetchAndSetData();
    setNumHints(1);
    setGameOver(false);
    setLandingModalVisible(false);
  };

  const onGameOverModalClose = () => {
    setGameOver(false);
  }

  const onLandingModalClose = () => {
    setLandingModalVisible(false);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      {/* Landing Modal */}
      <LandingModal isVisible={landingModalVisible} onModalClose={onLandingModalClose} onRandomMovie={onRandomMovie} />

      {/* Game Over Modal */}
      {gameOver && (
        <GameOverModal
          isVisible={gameOver}
          onModalClose={onGameOverModalClose}
          onRandomMovie={onRandomMovie}
          numHints={NUM_HINTS}
          numHintsUsed={numHints}
          movieName={movieName}
          posterPath={movieData.poster_path}
          imdb_id={movieData.imdb_id}
        />
      )}

      <Header />
      <div className="mx-auto min-w-screen-md max-w-screen-md flex-1">
        {/* Loading */}
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
        <GuessNumber numHints={NUM_HINTS} numHintsUsed={numHints - 1} />
        <SearchBar checkAnswer={checkAnswer} />
        <Footer />
      </div>
    </div>
  );
  
}

export default App;
