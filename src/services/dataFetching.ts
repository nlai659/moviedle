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
  fetchDailyMovie,
  fetchDailyTV,
  fetchMovieCredits,
  fetchRandomMovie,
  fetchRandomTV,
  fetchTVCredits,
} from "./apiTMDB";

const fetchData = async (category: number, isDaily: boolean) => {
  let mediaDataResponse, creditDataResponse;
  let mediaDataParsed: MediaData;

  switch (category) {
    case categoryMapping.MOVIE:
      if (isDaily) {
        mediaDataResponse = await fetchDailyMovie();
      } else {
        mediaDataResponse = await fetchRandomMovie();
      }
      creditDataResponse = await fetchMovieCredits(mediaDataResponse.id);

      mediaDataParsed = TMDB_movieParser(mediaDataResponse, creditDataResponse);

      break;
    case categoryMapping.TV:
      if (isDaily) {
        mediaDataResponse = await fetchDailyTV();
      } else {
        mediaDataResponse = await fetchRandomTV();
      }
      creditDataResponse = await fetchTVCredits(mediaDataResponse.id);

      mediaDataParsed = TMDB_tvParser(mediaDataResponse, creditDataResponse);

      break;
    case categoryMapping.ANIME:
      mediaDataResponse = await fetchRandomAnime(isDaily);
      mediaDataResponse = await fetchAnimeDetails(mediaDataResponse.id);
      creditDataResponse = await fetchAnimeCredits(mediaDataResponse.id);

      console.log(mediaDataResponse);
      console.log(creditDataResponse);

      mediaDataParsed = MAL_animeParser(mediaDataResponse, creditDataResponse);

      break;

    default:
      // Default to movie
      if (isDaily) {
        mediaDataResponse = await fetchDailyMovie();
      } else {
        mediaDataResponse = await fetchRandomMovie();
      }
      creditDataResponse = await fetchMovieCredits(mediaDataResponse.id);

      mediaDataParsed = TMDB_movieParser(mediaDataResponse, creditDataResponse);

      break;
  }
  return mediaDataParsed;
};

export { fetchData };
