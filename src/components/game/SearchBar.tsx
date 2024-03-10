import React, { useState, useEffect } from "react";
import { fetchMovieList, fetchTVList } from "../../services/apiTMDB";
import { fetchAnimeList } from "../../services/apiMAL";
import { fetchMangaSearch } from "../../services/apiJikan";
import {
  TMDB_suggestedMovieParser,
  TMDB_suggestedTVParser,
  MAL_suggestedAnimeParser,
  MAL_suggestedMangaParser
} from "../../utils/dataparsers/suggestedMediaParser";
import { SuggestedMediaData } from "../../types/SuggestedMediaData";
import { useAppSelector } from "../redux/hooks";
import categoryMapping from "../../utils/mappings/categoryMapping";

type SearchBarProps = {
  checkAnswer: (answer: string) => boolean | undefined;
};

const SearchBar = ({ checkAnswer }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [shake, setShake] = useState(false);
  const [suggestedMediaList, setSuggestedMediaList] = useState<SuggestedMediaData[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1);

  const category = useAppSelector((state) => state.category.category);

  // Keyboard Navigation (For Suggestion List)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedSuggestionIndex((prevIndex) =>
          prevIndex <= 0 ? suggestedMediaList.length - 1 : prevIndex - 1
        );
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedSuggestionIndex((prevIndex) =>
          prevIndex === suggestedMediaList.length - 1 ? 0 : prevIndex + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [suggestedMediaList]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSuggestionIndex !== -1) {
      setSearchTerm(suggestedMediaList[selectedSuggestionIndex].title);
      setSuggestedMediaList([]);
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

  const fetchAndSetSuggestedMediaList = async (input: string) => {
    let uniqueMedia: SuggestedMediaData[] = [];

    switch (category) {
      case categoryMapping.MOVIE:
        uniqueMedia = await fetchMovieList(input).then((data) =>
          TMDB_suggestedMovieParser(data.results)
        );
        break;
      case categoryMapping.TV:
        uniqueMedia = await fetchTVList(input).then((data) =>
        TMDB_suggestedTVParser(data.results)
        );
        break;
      case categoryMapping.ANIME:
        uniqueMedia = await fetchAnimeList(input).then((data) =>
        MAL_suggestedAnimeParser(data)
        );
        break;
      case categoryMapping.MANGA:
        uniqueMedia = await fetchMangaSearch(input).then((data) =>
        MAL_suggestedMangaParser(data.data)
        );
        break;
      default:
        break;
    }

    setSuggestedMediaList(uniqueMedia);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length <= 2) {
      setSuggestedMediaList([]);
      setSelectedSuggestionIndex(-1);
    } else {
      fetchAndSetSuggestedMediaList(e.target.value);
    }
  };

  const handleSuggestionClick = (movie: string) => {
    setSearchTerm(movie);
    setSuggestedMediaList([]);
  };

  return (
    <div className="relative">
      {suggestedMediaList.length > 0 && (
        <div className="absolute bottom-36 w-full max-w-screen-md max-h-36 overflow-auto bg-gray-800 rounded-lg shadow-md border border-gray-700">
          {suggestedMediaList.map(
            (media: SuggestedMediaData, index: number) => (
              <div
                key={media.title}
                className={`flex items-center justify-between px-4 py-2 cursor-pointer text-white transition duration-300 rounded-lg ${
                  index === selectedSuggestionIndex
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => handleSuggestionClick(media.title)}
              >
                <span>{media.title}</span>
                {media.img_path && (
                  <img
                    src={media.img_path}
                    alt={media.title}
                    className="h-10 w-auto rounded-lg"
                  />
                )}
              </div>
            )
          )}
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
