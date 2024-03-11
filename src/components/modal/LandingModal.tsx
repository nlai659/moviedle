import { useState } from "react";
import CategorySelector from "./CategorySelector";

type LandingModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  setModalVisible: (isVisible: boolean) => void;
};

const LandingModal = ({
  isVisible,
  setIsVisible,
  setModalVisible,
}: LandingModalProps) => {
  const [animateFadeOut, setAnimateFadeOut] = useState(false);

  const onAnimationEnd = () => {
    setIsVisible(false);
    setAnimateFadeOut(false);
  };

  return (
    <>
      {isVisible && (
        <div
          className={`z-50 fixed inset-0 flex justify-center items-center text-white ${
            isVisible && animateFadeOut ? "animate-fade animate-reverse" : ""
          }`}
          onAnimationEnd={onAnimationEnd}
        >
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="bg-zinc-900 rounded-3xl shadow-md p-6 max-w-md relative">
            <div className="flex justify-end">
              <button
                onClick={() => setModalVisible(false)}
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
            <h2 className="mb-6 text-4xl font-extrabold leading-none tracking-tight text-center text-white">
              Synopdle
            </h2>
            <p className="text-white mb-6">
              Given the synopsis, can you guess the media?
            </p>
            <hr className="border-t-2 border-gray-300 mb-6" />
            <div>
              <div className="flex flex-col">
                <CategorySelector setModalVisible={setModalVisible} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingModal;
