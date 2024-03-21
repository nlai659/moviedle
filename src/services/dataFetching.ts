import { MediaData } from "../types/MediaData";
import { SuggestedMediaData } from "../types/SuggestedMediaData";
import {
  TMDB_movieParser,
  TMDB_tvParser,
  MAL_animeParser,
  JIKAN_mangaParser
} from "../utils/dataparsers/hintDataParser";
import categoryMapping from "../utils/mappings/categoryMapping";
import {
  fetchRandomAnime,
  fetchAnimeDetails,
  fetchAnimeCredits,
  fetchAnimeList,
} from "./apiMAL";
import {
  fetchMovieCredits,
  fetchRandomMovie,
  fetchMovieList,
  fetchRandomTV,
  fetchTVCredits,
  fetchTVList,
} from "./apiTMDB";
import {
  fetchMangaCharacters,
  fetchRandomManga,
  fetchMangaList,
} from "./apiJikan"
import { TMDB_suggestedMovieParser, TMDB_suggestedTVParser, MAL_suggestedAnimeParser, MAL_suggestedMangaParser } from "../utils/dataparsers/suggestedMediaParser";

const fetchData = async (category: number, isDaily: boolean) => {
  let mediaDataResponse, creditDataResponse;
  let mediaDataParsed: MediaData = {castList: [], genres: [], title: "", synopsis: "", date: "", poster_path: ""};

  let retryNumber = 0;

  try {
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
          mediaDataResponse = await fetchRandomTV(isDaily, retryNumber);
          creditDataResponse = await fetchTVCredits(mediaDataResponse.id);
  
          mediaDataParsed = TMDB_tvParser(mediaDataResponse, creditDataResponse);
          retryNumber++;
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
      case categoryMapping.MANGA:
        while (missingData(mediaDataParsed)) {
          mediaDataResponse = await fetchRandomManga(isDaily, retryNumber);
          creditDataResponse = await fetchMangaCharacters(mediaDataResponse.mal_id);
  
          mediaDataParsed = JIKAN_mangaParser(mediaDataResponse, creditDataResponse);
          retryNumber++;
        }
  
        break;
  
      default:  
        break;
    }
    return mediaDataParsed;
  } catch (error) {
    console.error(error);
    return mediaDataParsed;
  }
};

const fetchSuggestedData = async (category: number, searchTerm: string) => {
  let uniqueMedia: SuggestedMediaData[] = [];

  switch (category) {
    case categoryMapping.MOVIE:
      uniqueMedia = await fetchMovieList(searchTerm).then((data) =>
        TMDB_suggestedMovieParser(data.results)
      );
      break;
    case categoryMapping.TV:
      uniqueMedia = await fetchTVList(searchTerm).then((data) =>
        TMDB_suggestedTVParser(data.results)
      );
      break;
    case categoryMapping.ANIME:
      uniqueMedia = await fetchAnimeList(searchTerm).then((data) =>
        MAL_suggestedAnimeParser(data)
      );
      break;
    case categoryMapping.MANGA:
      uniqueMedia = await fetchMangaList(searchTerm).then((data) =>
        MAL_suggestedMangaParser(data.data)
      );
      break;
    default:
      break;
  }

  return uniqueMedia;
}

// Condition for re-fetching data
const missingData = (mediaData: MediaData) => {
  if (mediaData.title === "" || mediaData.synopsis === "" || mediaData.castList === undefined || mediaData.castList.length < 3) {
    return true;
  }
  return false;
}

export { fetchData, fetchSuggestedData };
