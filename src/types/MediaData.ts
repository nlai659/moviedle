import { CastData } from './castData';

type MediaData = {
    title: string;
    synopsis: string;
    genres: string[];
    date: string;
    castList: CastData[];
    poster_path: string;
}

export type { MediaData }