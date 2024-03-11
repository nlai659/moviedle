type GuessNumberProps = {
  numHints: number;
  numHintsUsed: number;
};

const GuessNumber = ({ numHints, numHintsUsed }: GuessNumberProps) => {
  // Ensure numHintsUsed is never greater than numHints
  if (numHintsUsed > numHints) {
    numHintsUsed = numHints;
  }

  return (
    <div>
      <p className="text-center text-zinc-600 mb-1">
        {numHintsUsed} / {numHints} hints used
      </p>
    </div>
  );
};

export default GuessNumber;
