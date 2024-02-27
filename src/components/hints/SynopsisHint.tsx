type SynopsisHintProps = {
    synopsis: string;
}

const SynopsisHint = ({ synopsis }: SynopsisHintProps) => {
  return (
    <div className="bg-gray-700 rounded-lg shadow-md p-2 m-1">
      <p className="text-white font-bold ml-1">Synopsis:</p>
      <div>
        <p className="text-white ml-1">{synopsis}</p>
      </div>
    </div>
  );
};

export default SynopsisHint;