import React from 'react';

type GenreHintProps = {
  genres: string[];
  hidden?: boolean;
};

const GenreHint: React.FC<GenreHintProps> = ({ genres, hidden }) => {
  return (
    <div className="bg-gray-700 rounded-lg shadow-md p-2 m-1">
      <p className="text-white font-bold ml-1">Genres:</p>
      <div className="flex flex-wrap">
        {genres.map((genre, index) => (
          <span
            key={index}
            className={`${
              hidden ? "hidden" : ""
            } text-sm font-semibold bg-gray-200 rounded-full px-2 py-1 mr-2 my-2`}
          >
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GenreHint;
