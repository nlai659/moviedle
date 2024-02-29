import React, { useState, useEffect } from "react";

type SearchBarProps = {
  checkAnswer: (answer: string) => boolean | undefined;
};

const SearchBar = ({ checkAnswer }: SearchBarProps) => {
  const API_URL = "https://api.themoviedb.org/3/search/movie";
  const API_READ_ACCESS = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

  const [searchTerm, setSearchTerm] = useState("");
  const [shake, setShake] = useState(false);
  const [movieList, setMovieList] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedSuggestionIndex((prevIndex) =>
          prevIndex <= 0 ? movieList.length - 1 : prevIndex - 1
        );
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedSuggestionIndex((prevIndex) =>
          prevIndex === movieList.length - 1 ? 0 : prevIndex + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [movieList]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSuggestionIndex !== -1) {
      setSearchTerm(movieList[selectedSuggestionIndex]);
      setMovieList([]);
      setSelectedSuggestionIndex(-1);
      return;
    }

    if (searchTerm === "") return;
    
    // Check Correct Answer
    const answer = checkAnswer(searchTerm);
    setSearchTerm("");
    
    // Shake if incorrect
    if (!answer) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 500);
    }
  };

  const handleSkip = () => {
    checkAnswer("");
  };

  const fetchMovieList = async (input: string) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${API_READ_ACCESS}`,
      },
    };

    const movieListResponse = await fetch(
      `${API_URL}?query=${input}&include_adult=false&language=en-US&page=1`,
      options
    ).then((res) => res.json());

    if (movieListResponse.results) {
      // Sort movies by popularity
      movieListResponse.results.sort(
        (a: { popularity: number }, b: { popularity: number }) =>
          b.popularity - a.popularity
      );

      // Extract titles of the first 5 movies
      const movies = movieListResponse.results
        .slice(0, 5)
        .map((movie: any) => movie.title);

      setMovieList(movies);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length <= 2) {
      setMovieList([]);
      setSelectedSuggestionIndex(-1);
    } else {
      fetchMovieList(e.target.value);
    }
  };

  const handleSuggestionClick = (movie: string) => {
    setSearchTerm(movie);
    setMovieList([]);
  };

  return (
    <div className="relative">
      {movieList.length > 0 && (
        <div className="absolute bottom-36 w-full max-w-screen-md bg-gray-800 rounded-lg shadow-md border border-gray-700">
          {movieList.map((movie: string, index: number) => (
            <div
              key={movie}
              className={`px-4 py-2 cursor-pointer text-white transition duration-300 rounded-lg ${
                index === selectedSuggestionIndex
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => handleSuggestionClick(movie)}
            >
              {movie}
            </div>
          ))}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-700 rounded-lg shadow-md p-2 flex flex-wrap"
      >
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => onInputChange(e)}
          className={`w-full p-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-500 ${
            shake ? "animate-shake" : ""
          }`}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-4 w-5/6 mt-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleSkip}
          className="bg-red-500 text-white p-4 mt-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ml-2 flex-grow"
        >
          Skip
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
