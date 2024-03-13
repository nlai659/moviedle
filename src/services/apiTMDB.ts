import { getRandomNumber, getRandomYear, splitmix32 } from "../utils/random";

let API_READ_ACCESS: any;
if (typeof process !== "undefined") {
  API_READ_ACCESS = process.env.VITE_TMDB_READ_ACCESS_TOKEN;
} else {
  API_READ_ACCESS = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;
}
const API_URL = "https://api.themoviedb.org/3/";
const API_SEARCH_URL = "https://api.themoviedb.org/3/search/";


const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${API_READ_ACCESS}`,
  },
};

const fetchRandomMovie = async (isDaily: boolean) => {
  let randomYear: number;
  let randomPage: number;
  let randomNumber: number;

  if (isDaily) {
    const currentDate = new Date();

    // Extract day, month, and year
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Adding 1 since months are zero-indexed
    const year = currentDate.getFullYear();
  
    // Concatenate and parse into a single number
    const singleNumberFromDate = parseInt(`${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`);
  
    randomYear = splitmix32(singleNumberFromDate, 1990, new Date().getFullYear());
    randomPage = splitmix32(singleNumberFromDate, 1, 3);
    randomNumber = splitmix32(singleNumberFromDate, 0, 19);
  } else {
    randomYear = getRandomYear();
    randomPage = getRandomNumber(1, 3);
    randomNumber = getRandomNumber(0, 19);
  }

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
    `${API_SEARCH_URL}/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  ).then((res) => res.json());
  return movieListResponse;
};

const fetchRandomTV = async (isDaily: boolean) => {
  let randomYear: number;
  let randomPage: number;
  let randomNumber: number;

  if (isDaily) {
    const currentDate = new Date();

    // Extract day, month, and year
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Adding 1 since months are zero-indexed
    const year = currentDate.getFullYear();
  
    // Concatenate and parse into a single number
    const singleNumberFromDate = parseInt(`${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`);
  
    randomYear = splitmix32(singleNumberFromDate, 1990, new Date().getFullYear());
    randomPage = splitmix32(singleNumberFromDate, 1, 3);
    randomNumber = splitmix32(singleNumberFromDate, 0, 19);
  } else {
    randomYear = getRandomYear();
    randomPage = getRandomNumber(1, 3);
    randomNumber = getRandomNumber(0, 19);
  }

  const tvDataResponse = await fetch(
    `${API_URL}discover/tv?language=en-US&sort_by=vote_average.desc&vote_count.gte=200&include_adult=false&include_video=false&page=${randomPage}&first_air_date_year=${randomYear}`,
    options
  )
    .then((res) => res.json())
    .then((data) => data.results[randomNumber]);

  return tvDataResponse;
};

const fetchTVCredits = async (tvId: number) => {
  // Fetch Credit Data
  const creditDataResponse = await fetch(
    `${API_URL}tv/${tvId}/credits`,
    options
  ).then((res) => res.json());

  return creditDataResponse;
};

const fetchTVList = async (query: string) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${API_READ_ACCESS}`,
    },
  };

  const TVListResponse = await fetch(
    `${API_SEARCH_URL}/tv?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  ).then((res) => res.json());
  return TVListResponse;
};



export { fetchRandomMovie, fetchMovieCredits, fetchMovieList, fetchRandomTV, fetchTVCredits, fetchTVList };
