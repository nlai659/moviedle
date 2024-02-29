import { getRandomNumber, getRandomYear } from "./random";

const API_READ_ACCESS = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;
const API_URL = "https://api.themoviedb.org/3/";
const API_SEARCH_URL = "https://api.themoviedb.org/3/search/movie";


const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${API_READ_ACCESS}`,
  },
};

const fetchRandomMovie = async () => {
  const randomYear = getRandomYear();
  const randomPage = getRandomNumber(1, 3);
  const randomNumber = getRandomNumber(0, 19);

  const movieDataResponse = await fetch(
    `${API_URL}discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${randomPage}&primary_release_year=${randomYear}`,
    options
  )
    .then((res) => res.json())
    .then((data) => data.results[randomNumber]);

  return movieDataResponse;
};

const fetchMovieCredits = async (movieId: number) => {
  // Fetch Credit Data
  const creditDataResponse = await fetch(
    `${API_URL}movie/${movieId}/credits`,
    options
  ).then((res) => res.json());

  return creditDataResponse;
};

const fetchMovieList = async (query: string) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${API_READ_ACCESS}`,
    },
  };

  const movieListResponse = await fetch(
    `${API_SEARCH_URL}?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  ).then((res) => res.json());
  return movieListResponse;
};

export { fetchRandomMovie, fetchMovieCredits, fetchMovieList };
