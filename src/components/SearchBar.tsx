import { useState } from "react";

type SearchBarProps = {
  checkAnswer: (answer: string) => boolean;
};

const SearchBar = ({ checkAnswer }: SearchBarProps) => {
  const API_URL = "https://api.themoviedb.org/3/search/movie"
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_READ_ACCESS = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

  const [searchTerm, setSearchTerm] = useState("");
  const [shake, setShake] = useState(false);
  const [movieList, setMovieList] = useState([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm === "") return;
    setSearchTerm("");
    
    // Check Correct Answer
    const answer = checkAnswer(searchTerm);

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
        "Accept": "application/json",
        "Authorization": `Bearer ${API_READ_ACCESS}`,
      },
    }

    const movieListResponse = await fetch(
      `${API_URL}?query=${input}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((data) => data.results);
    // Sort movies by popularity
    movieListResponse.sort((a, b) => b.popularity - a.popularity);
    
    // Extract titles of the first 5 movies
    const movieList = movieListResponse.slice(0, 5).map((movie: any) => movie.title);
    
    setMovieList(movieList);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    fetchMovieList(e.target.value);
  };

  const handleSuggestionClick = (movie: string) => {
    setSearchTerm(movie);
    setMovieList([]);
  };

  return (
    <div className="relative">
      {movieList.length > 0 && (
        <div className="absolute -top-52 w-full max-w-screen-md bg-gray-800 rounded-lg shadow-md border border-gray-700">
          {movieList.map((movie: string) => (
            <div
              key={movie}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white transition duration-300 rounded-lg"
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
