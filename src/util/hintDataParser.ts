import genreMapping from "./genreMapping";
import { MediaData } from "../types/mediaData";
import { CastData } from "../types/castData";

const TMDB_movieParser = (movieData: any, creditData: any): MediaData => {
    const castList: CastData[] = [];
    const director = creditData.crew.find((crewMember: any) => crewMember.job === "Director");

    console.log(creditData)

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
    console.log(tvData)
    console.log(creditData)

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

export { TMDB_movieParser, TMDB_tvParser }
