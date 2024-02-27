import React from 'react';

type Genre = {
    id: number;
    name: string;
}

type GenreHintProps = {
    genres: Genre[];
    hidden?: boolean;
}

const GenreHint: React.FC<GenreHintProps> = ({ genres, hidden }) => {
    return (
        <div>
            <p>Genres: <span className={hidden ? 'invisible' : ''}>{genres.map(genre => genre.name).join(", ")}</span></p>
        </div>
    );
}

export default GenreHint;