import { SuggestedMediaData } from "../types/SuggestedMediaData";

const TMDB_suggestedMovieParser = (data: any[]): SuggestedMediaData[] => {
    data.sort((a: any, b: any) => a.title.localeCompare(b.title));

    const movies: SuggestedMediaData[] = data.map(
        (movie: any) => ({
            id: movie.id,
            title: movie.title,
        })
    );

    const uniqueMovies = Array.from(new Set(movies.map((movie) => movie.title))).map(
        (title) => movies.find((movie) => movie.title === title)
    ).filter((movie) => movie !== undefined) as SuggestedMediaData[];

    return uniqueMovies;
};

const TMDB_suggestedTVParser = (data: any[]): SuggestedMediaData[] => {
    data.sort((a: any, b: any) => a.name.localeCompare(b.name));

    const tvShows: SuggestedMediaData[] = data.map(
        (tvShow: any) => ({
            id: tvShow.id,
            title: tvShow.name,
        })
    );

    const uniqueTVShows: SuggestedMediaData[] = Array.from(new Set(tvShows.map((tvShow) => tvShow.title))).map(
        (title) => tvShows.find((tvShow) => tvShow.title === title)
    ).filter((tvShow) => tvShow !== undefined) as SuggestedMediaData[];

    return uniqueTVShows;
}

const MAL_suggestedAnimeParser = (data: any[]): SuggestedMediaData[] => {
    const animeList: SuggestedMediaData[] = data.map(
        (anime: any) => ({
            id: anime.mal_id,
            title: anime.name,
            img_path: anime.thumbnail_url,
        })
    );

    return animeList;
}

export { TMDB_suggestedMovieParser, TMDB_suggestedTVParser, MAL_suggestedAnimeParser };
