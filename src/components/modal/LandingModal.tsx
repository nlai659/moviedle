import { useState } from "react";

type LandingModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onRandomMovie: () => void;
};

const LandingModal = ({
  isVisible,
  setIsVisible,
  onRandomMovie,
}: LandingModalProps) => {
  const [animateFadeOut, setAnimateFadeOut] = useState(false);

  const handleOnRandomMovie = () => {
    setAnimateFadeOut(true);
    onRandomMovie();
  };

  const onAnimationEnd = () => {
    setIsVisible(false);
    setAnimateFadeOut(false);
  };

  return (
    <>
      {isVisible && (
        <div
          className={`z-50 fixed inset-0 flex justify-center items-center ${
            isVisible && animateFadeOut ? "animate-fade animate-reverse" : ""
          }`}
          onAnimationEnd={onAnimationEnd}
        >
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="bg-gray-700 rounded-lg shadow-md p-6 max-w-md relative">
            <h2 className="text-2xl font-bold text-white mb-4">
              Welcome to Synopdle!
            </h2>
            <p className="text-white mb-4">
              The game is simple, you will be given a movie synopsis and you
              have to guess the movie name. You have 5 hints to help you out. If
              you run out of hints, you lose.
            </p>
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
                onClick={() => setAnimateFadeOut(true)}
              >
                Play Daily!
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
                onClick={handleOnRandomMovie}
              >
                Play Endless
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingModal;
