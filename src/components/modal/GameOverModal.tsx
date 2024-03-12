import DailyCountDown from "./DailyCountDown";
import { MediaData } from "../../types/MediaData";

type GameOverModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  isDaily: boolean;
  onRandomMovie: () => void;
  mediaData: MediaData;
};

const GameOverModal = ({
  isVisible,
  setIsVisible,
  isDaily,
  onRandomMovie,
  mediaData,
}: GameOverModalProps) => {

  return (
    <div
      className={`z-50 fixed inset-0 flex justify-center items-center ${
        isVisible ? "" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="bg-zinc-900 rounded-3xl shadow-md p-6 max-w-md relative z-50 animate-jump-in">
        <div className="flex justify-end">
          <button
            onClick={() => setIsVisible(false)}
            className="focus:outline-none absolute top-4 right-4 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-zinc-400 hover:text-zinc-200 transition duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p className="text-white text-lg mb-4">
          Title:{" "}
          <span className="font-semibold">
            {mediaData.link ? (
              <a
                href={mediaData.link}
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {mediaData.title}
              </a>
            ) : (
              <span>{mediaData.title}</span>
            )}
          </span>
        </p>
        {isDaily && <DailyCountDown />}
        <img
          className="w-full h-auto rounded-md mt-4 min-w-[400px] min-h-[600px]"
          src={mediaData.poster_path}
          alt={mediaData.title}
        />

        <div className="flex justify-between">
          <button
            className="p-2 mt-4 flex-grow text-white bg-emerald-700 hover:bg-emerald-800 font-medium rounded-3xl text-sm transition duration-300"
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
