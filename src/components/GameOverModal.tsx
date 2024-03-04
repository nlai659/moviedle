import DailyCountDown from "./DailyCountDown";

type GameOverModalProps = {
    isVisible: boolean;
    isDaily: boolean;
    onRandomMovie: () => void;
    gameWin: boolean;
    movieName: string;
    posterPath: string;
    imdb_id?: string;
};

const GameOverModal = ({ isVisible, isDaily, onRandomMovie, gameWin, movieName, posterPath, imdb_id }: GameOverModalProps) => {
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
        <div className={` z-50 fixed inset-0 flex justify-center items-center ${isVisible ? '' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <div className="bg-gray-700 rounded-lg shadow-md p-6 max-w-md relative z-50 animate-jump-in">
                {modalContent}
                {isDaily && <DailyCountDown />  }
                <img
                    className="w-full h-auto rounded-md mt-4 min-w-[400px] min-h-[600px]"
                    src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                    alt={movieName}
                />
                <p className="text-white mb-4">
                    Movie: <span className="font-semibold">{movieName}</span>
                    {imdb_id && (
                        <a
                            href={`https://www.imdb.com/title/${imdb_id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-400 hover:underline ml-2"
                            >
                            (IMDB)
                        </a>
                    )}
                </p>
                <div className="flex justify-between">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
                        onClick={onRandomMovie}
                        >
                        Play Random!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameOverModal;
