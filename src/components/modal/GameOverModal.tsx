import DailyCountDown from "./DailyCountDown";

type GameOverModalProps = {
    isVisible: boolean;
    isDaily: boolean;
    onRandomMovie: () => void;
    gameWin: boolean;
    movieName: string;
    posterPath: string;
    link?: string;
};

const GameOverModal = ({ isVisible, isDaily, onRandomMovie, gameWin, movieName, posterPath, link }: GameOverModalProps) => {
    const modalContent = gameWin ? (
        <div>
            <h2 className="text-2xl font-bold text-white mb-4">Congratulations!</h2>
        </div>
    ) : (
        <div>
            <h2 className="text-2xl font-bold text-white mb-4">Unlucky!</h2>
        </div>
    );

    return (
      <div
        className={`z-50 fixed inset-0 flex justify-center items-center ${
          isVisible ? "" : "hidden"
        }`}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50"></div>
        <div className="bg-zinc-800 rounded-3xl shadow-md p-6 max-w-md relative z-50 animate-jump-in">
          {modalContent}
          {isDaily && <DailyCountDown />}
          <img
            className="w-full h-auto rounded-md mt-4 min-w-[400px] min-h-[600px]"
            src={posterPath}
            alt={movieName}
          />
          <p className="text-white mb-4">
            Title:{" "}
            <span className="font-semibold">
              {link ? (
                <a href={link} className="underline" target="_blank" rel="noopener noreferrer">
                  {movieName}
                </a>
              ) : (
                <span>{movieName}</span>
              )}
            </span>
          </p>

          <div className="flex justify-between">
            <button
              className="p-2 flex-grow text-white bg-sky-700 hover:bg-sky-800 font-medium rounded-full transition duration-300 border border-sky-700"
              onClick={onRandomMovie}
            >
              Play Endless
            </button>
          </div>
        </div>
      </div>
    );
};

export default GameOverModal;
