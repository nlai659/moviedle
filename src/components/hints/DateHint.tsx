type DateHintProps = {
    date: string;
}

const DateHint = ({date}: DateHintProps) => {
    return (
        <div>
            <p> Release Date: </p>
            <p>{date}</p>
        </div>
    )
}

export default DateHint;