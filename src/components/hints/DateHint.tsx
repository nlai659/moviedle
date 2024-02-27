type DateHintProps = {
    date: string;
    hidden?: boolean;
}

const DateHint = ({date, hidden}: DateHintProps) => {
    return (
        <div>
            <p> Release Date: <span className={hidden ? 'invisible' : ''}> {date} </span> </p>
        </div>
    )
}

export default DateHint;