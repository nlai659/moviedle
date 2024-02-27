type SynopsisHintProps = {
    synopsis: string;
}

const SynopsisHint = ({synopsis}: SynopsisHintProps) => {
    return (
        <div>
            <p>Synopsis: {synopsis}</p>
        </div>
    )
}

export default SynopsisHint;