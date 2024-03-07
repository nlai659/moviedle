import { MediaData } from "../types/MediaData";
import {
  TMDB_movieParser,
  TMDB_tvParser,
  MAL_animeParser,
} from "../utils/dataparsers/hintDataParser";
import categoryMapping from "../utils/mappings/categoryMapping";
import {
  fetchRandomAnime,
  fetchAnimeDetails,
  fetchAnimeCredits,
} from "./apiMAL";
import {
  fetchMovieCredits,
  fetchRandomMovie,
  fetchRandomTV,
  fetchTVCredits,
} from "./apiTMDB";

const fetchData = async (category: number, isDaily: boolean) => {
  let mediaDataResponse, creditDataResponse;
  let mediaDataParsed: MediaData = {castList: [], genres: [], title: "", synopsis: "", date: "", poster_path: ""};

  switch (category) {
    case categoryMapping.MOVIE:
      while(missingData(mediaDataParsed)) {
        mediaDataResponse = await fetchRandomMovie(isDaily);
        creditDataResponse = await fetchMovieCredits(mediaDataResponse.id);

        mediaDataParsed = TMDB_movieParser(mediaDataResponse, creditDataResponse);
      }

      break;
    case categoryMapping.TV:
      while (missingData(mediaDataParsed)) {
        mediaDataResponse = await fetchRandomTV(isDaily);
        creditDataResponse = await fetchTVCredits(mediaDataResponse.id);

        mediaDataParsed = TMDB_tvParser(mediaDataResponse, creditDataResponse);
      }

      break;
    case categoryMapping.ANIME:
      while (missingData(mediaDataParsed)) {
        mediaDataResponse = await fetchRandomAnime(isDaily);
        mediaDataResponse = await fetchAnimeDetails(mediaDataResponse.id);
        creditDataResponse = await fetchAnimeCredits(mediaDataResponse.id);

        mediaDataParsed = MAL_animeParser(mediaDataResponse, creditDataResponse);
      }

      break;

    default:
      while(missingData(mediaDataParsed)) {
        mediaDataResponse = await fetchRandomMovie(isDaily);
        creditDataResponse = await fetchMovieCredits(mediaDataResponse.id);

        mediaDataParsed = TMDB_movieParser(mediaDataResponse, creditDataResponse);
      }

      break;
  }
  return mediaDataParsed;
};

// Condition for re-fetching data
const missingData = (mediaData: MediaData) => {
  if (mediaData.title === "" || mediaData.synopsis === "" || mediaData.castList.length < 3) {
    return true;
  }
  return false;
}

export { fetchData };
