import React from 'react';

type GameOverModalProps = {
    isVisible: boolean;
    onClose: () => void;
};

const GameOverModal = ({ isVisible, onClose }: GameOverModalProps) => {
    return (
        <div className={`fixed inset-0 flex justify-center items-center ${isVisible ? '' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md relative z-50">
                <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
                <p className="text-gray-700 mb-4">Better luck next time!</p>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    onClick={onClose}
                >
                    Play Again!
                </button>
            </div>
        </div>
    );
};

export default GameOverModal;
