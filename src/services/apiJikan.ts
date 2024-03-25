import { getRandomNumber, splitmix32 } from "../utils/random";

const API_URL = "https://api.jikan.moe/v4/";
const API_SEARCH_URL = `https://api.jikan.moe/v4/manga?order_by=popularity&page=1&q=`;

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

const fetchRandomManga = async (isDaily: boolean, retryNumber: number) => {
  let randomNumber: number, randomPage: number;

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

    randomPage = splitmix32(singleNumberFromDate, 1, 20) + retryNumber;
    randomNumber = splitmix32(singleNumberFromDate, 0, 24);
  } else {
    randomPage = getRandomNumber(1, 20);
    randomNumber = getRandomNumber(0, 24);
  }

  const mangaDataResponse = await fetch(
    `${API_URL}manga?order_by=popularity&page=${randomPage}`,
    options
  )
    .then((res) => res.json())
    .then((data) => data.data[randomNumber]);

  return mangaDataResponse;
}

const fetchMangaCharacters = async (id: number) => {
    const mangaCharactersResponse = await fetch(
        `${API_URL}manga/${id}/characters`,
        options
    ).then((res) => res.json())
    .then((data) => data.data);

    return mangaCharactersResponse;
}

const fetchMangaList = async (query: string) => {
    const searchResults = await fetch(
        `${API_SEARCH_URL}${query}`,
    ).then((res) => res.json());

    return searchResults;
}

export { fetchRandomManga, fetchMangaCharacters, fetchMangaList };
