import genreMapping from "../mappings/genreMapping";
import { MediaData } from "../../types/MediaData";
import { CastData } from "../../types/CastData";

const TMDB_movieParser = (movieData: any, creditData: any): MediaData => {
    const castList: CastData[] = [];
    const director = creditData.crew.find((crewMember: any) => crewMember.job === "Director");

    for (let i = 0; i < 3; i++) {
        if (i === 2 && director) {
            castList.push({
                name: director.name,
                role: "Director",
                img_path: `https://image.tmdb.org/t/p/w200${director.profile_path}`
            });
            break;
        }

        if (creditData.cast[i]) {
            castList.push({
                name: creditData.cast[i].name,
                role: creditData.cast[i].character,
                img_path: `https://image.tmdb.org/t/p/w200${creditData.cast[i].profile_path}`
            });
        }
    }

    let genres;
    if (movieData.genre_ids) {
        genres = movieData.genre_ids.map((id: number) => genreMapping.genres.find((genre) => genre.id === id)?.name || "");
    } else {
        genres = movieData.genres.map((genre: any) => genre.name);
    }

    return {
        title: movieData.title,
        synopsis: movieData.overview,
        genres: genres,
        date: movieData.release_date,
        castList: castList,
        poster_path: `https://image.tmdb.org/t/p/w200${movieData.poster_path}`
    }
}

const TMDB_tvParser = (tvData: any, creditData: any): MediaData => {
    const castList: CastData[] = [];

    for (let i = 0; i < 3; i++) {
        if (creditData.cast[i]) {
            castList.push({
                name: creditData.cast[i].name,
                role: creditData.cast[i].character,
                img_path: `https://image.tmdb.org/t/p/w200${creditData.cast[i].profile_path}`
            });
        }
    }

    let genres;
    if (tvData.genre_ids) {
        genres = tvData.genre_ids.map((id: number) => genreMapping.genres.find((genre) => genre.id === id)?.name || "");
    } else {
        genres = tvData.genres.map((genre: any) => genre.name);
    }

    return {
        title: tvData.name,
        synopsis: tvData.overview,
        genres: genres,
        date: tvData.first_air_date,
        castList: castList,
        poster_path: `https://image.tmdb.org/t/p/w200${tvData.poster_path}`
    }
}

const MAL_animeParser = (animeData: any, creditData: any): MediaData => {

    const castList: CastData[] = [];

    for (let i = 0; i < 3; i++) {
        if (creditData[i]) {
            castList.push({
                name: `${creditData[i].node.first_name} ${creditData[i].node.last_name}`,
                role: creditData[i].node.alternative_name,
                img_path: creditData[i].node.main_picture.medium
            });
        }
    }

    const genres: string[] = animeData.genres.map((genre: any) => genre.name);

    const date = `${animeData.start_season.season} ${animeData.start_season.year} (${animeData.start_date})`
    const dateString = date.charAt(0).toUpperCase() + date.slice(1);

    return {
        title: animeData.title,
        synopsis: animeData.synopsis,
        genres: genres,
        date: dateString,
        castList: castList,
        poster_path: animeData.main_picture.large,
        link: `https://myanimelist.net/anime/${animeData.id}`
    }
}

const JIKAN_mangaParser = (mangaData: any, creditData: any): MediaData => {
    const castList: CastData[] = [];

    for (let i = 0; i < 3; i++) {
        if (creditData[i]) {
            castList.push({
                name: `${creditData[i].character.name}`,
                role: creditData[i].character.role,
                img_path: creditData[i].character.images.webp.image_url
            });
        }
    }

    const genres: string[] = [];
    for (let i = 0; i < mangaData.genres.length; i++) {
        genres.push(mangaData.genres[i].name);
    }

    const date = mangaData.published.string;

    return {
        title: mangaData.title,
        synopsis: mangaData.synopsis,
        genres: genres,
        date: date,
        castList: castList,
        poster_path: mangaData.images.webp.large_image_url,
        link: `https://myanimelist.net/manga/${mangaData.mal_id}`
    }
}

export { TMDB_movieParser, TMDB_tvParser, MAL_animeParser, JIKAN_mangaParser }
