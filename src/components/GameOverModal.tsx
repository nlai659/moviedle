type GameOverModalProps = {
    isVisible: boolean;
    onModalClose: () => void;
    onRandomMovie: () => void;
    numHints: number;
    numHintsUsed: number;
};

const GameOverModal = ({ isVisible, onModalClose, onRandomMovie, numHints, numHintsUsed }: GameOverModalProps) => {
    const win = numHintsUsed-1 <= numHints;

    const modalContent = win ? (
        <div>
            <h2 className="text-2xl font-bold text-white mb-4">Congratulations!</h2>
            <p className="text-gray-200 mb-4">You guessed the movie!</p>
        </div>
    ) : (
        <div>
            <h2 className="text-2xl font-bold text-white mb-4">Game Over!</h2>
            <p className="text-gray-200 mb-4">Better luck next time!</p>
        </div>
    );

    return (
        <div className={`fixed inset-0 flex justify-center items-center ${isVisible ? '' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <div className="bg-gray-700 rounded-lg shadow-md p-8 max-w-md relative z-50">
                {modalContent}
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-300"
                    onClick={onModalClose}
                >
                    Close
                </button>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300 ml-4"
                    onClick={onRandomMovie}
                >
                    Play Again!
                </button>
            </div>
        </div>
    );
};

export default GameOverModal;
