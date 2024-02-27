type SynopsisHintProps = {
    synopsis: string;
}

const SynopsisHint = ({synopsis}: SynopsisHintProps) => {
    return (
        <div>
            <p>{synopsis}</p>
        </div>
    )
}

export default SynopsisHint;