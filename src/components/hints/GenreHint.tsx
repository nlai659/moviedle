import React from 'react';

type Genre = {
    id: number;
    name: string;
}

type GenreHintProps = {
  genres: Genre[];
  hidden?: boolean;
};

const GenreHint: React.FC<GenreHintProps> = ({ genres, hidden }) => {
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
