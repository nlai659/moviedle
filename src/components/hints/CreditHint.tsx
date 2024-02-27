type CreditHintProps = {
    name: string;
    character: string;
    profile_path: string;
}

const CreditHint = ({name, character, profile_path}: CreditHintProps) => {
    return (
        <div>
            <p>{name} as {character}</p>
            <img src={`https://image.tmdb.org/t/p/w500${profile_path}`} alt={name} />
        </div>
    )
}

export default CreditHint;