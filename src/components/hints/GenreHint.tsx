import React from 'react';
import genreMapping from '../../util/genreMapping';

type Genre = {
    id: number;
    name: string;
}

type GenreHintProps = {
  genres?: Genre[];
  genre_ids?: number[];
  hidden?: boolean;
};

const GenreHint: React.FC<GenreHintProps> = ({ genres, genre_ids, hidden }) => {
  if (!genres) {
    genres = (genre_ids?.map((id) => genreMapping.genres.find((genre) => genre.id === id)) || []) as Genre[];
  }

  return (
    <div className="bg-gray-700 rounded-lg shadow-md p-2 m-1">
      <p className="text-white font-bold ml-1">Genres:</p>
      <div className="flex flex-wrap">
        {genres.map((genre) => (
          <span
            key={genre.id}
            className={`${
              hidden ? "hidden" : ""
            } text-sm font-semibold bg-gray-200 rounded-full px-2 py-1 mr-2 my-2`}
          >
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GenreHint;
