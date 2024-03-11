type DateHintProps = {
    date: string;
    hidden?: boolean;
}

const DateHint = ({ date, hidden }: DateHintProps) => {
  return (
    <div className="bg-zinc-800 rounded-3xl shadow-md p-2 m-1">
      <p className="text-white font-bold ml-1">Release Date:</p>
      <div>
        <span className={`${hidden ? "hidden" : ""} text-white ml-1`}> {date} </span>
      </div>
    </div>
  );
};

export default DateHint;