type genre = {
    id: number;
    name: string;
}

type GenreHintProps = {
    genres: genre[];
}

const GenreHint = ({genres}: GenreHintProps) => {
    return (
        <div>
            <p>Genres: {genres.map((genre) => genre.name).join(", ")}</p>
        </div>
    )
}

export default GenreHint;