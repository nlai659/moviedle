import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HintArea from "./components/HintArea";
import SearchBar from "./components/SearchBar";

// Temp Data
import tempMovieData from "./assets/496243";
import tempCreditData from "./assets/credits";

function App() {
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
  }, []);

  const checkAnswer = (answer) => {
    if (answer.toLowerCase() === movieName.toLowerCase()) {
      console.log("Correct Answer");
    } else {
      setNumHints((prevNumHints) => prevNumHints + 1);
      console.log("Incorrect Answer");
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-800">
      <Header />
      <div className="mx-auto">
        <HintArea movieData={tempMovieData} creditData={tempCreditData} numHints={numHints} />
        <SearchBar checkAnswer={checkAnswer} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
