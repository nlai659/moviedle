import { CastData } from './CastData';

type MediaData = {
    title: string;
    synopsis: string;
    genres: string[];
    date: string;
    castList: CastData[];
    poster_path: string;
    link?: string;
}

export type { MediaData }