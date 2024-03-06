import { getRandomNumber, splitmix32 } from "./random";

const API_CLIENT_ID = import.meta.env.VITE_MAL_CLIENT_ID;
const API_URL = "https://cors-anywhere.herokuapp.com/https://api.myanimelist.net/v2/";
const API_SEARCH_URL =
  "https://myanimelist.net/search/prefix.json?type=anime&keyword=jobless&v=1";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    "X-MAL-CLIENT-ID": `${API_CLIENT_ID}`,
  },
};

const fetchRandomAnime = async (isDaily: boolean) => {
  let randomNumber;

  if (isDaily) {
    const currentDate = new Date();

    // Extract day, month, and year
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Adding 1 since months are zero-indexed
    const year = currentDate.getFullYear();

    // Concatenate and parse into a single number
    const singleNumberFromDate = parseInt(
      `${year}${month < 10 ? "0" : ""}${month}${day < 10 ? "0" : ""}${day}`
    );

    randomNumber = splitmix32(singleNumberFromDate, 0, 499);
  } else {
    randomNumber = getRandomNumber(0, 499);
  }

  const animeDataResponse = await fetch(
    `${API_URL}anime/ranking?ranking_type=bypopularity&limit=1&offset=${randomNumber}`,
    options
  )
    .then((res) => res.json())
    .then((data) => data.data[0]);

    console.log(animeDataResponse);

  return animeDataResponse;
};

export { fetchRandomAnime };