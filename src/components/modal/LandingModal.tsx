import { useState } from "react";
import { setCategory } from "../redux/categorySlice";
import { useAppDispatch } from "../redux/hooks";
import categoryMapping  from "../../utils/mappings/categoryMapping";
import { setDaily } from "../redux/dailySlice";

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

  const dispatch = useAppDispatch();
  const categoryStrings = Object.keys(categoryMapping).map(
    (key) => key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
  );

  const handleCategoryChange = (index: number) => {
    dispatch(setDaily(false))
    dispatch(setCategory(index));
    setModalVisible(false);
  };

  const handleCategoryChangeDaily = (index: number) => {
    dispatch(setDaily(true))
    dispatch(setCategory(index));
    setModalVisible(false);
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
            <h2 className="text-2xl font-bold text-white mb-4">
              Welcome to Synopdle!
            </h2>
            <p className="text-white mb-4">
              The game is simple, you will be given a movie synopsis and you
              have to guess the movie name. You have 5 hints to help you out. If
              you run out of hints, you lose.
            </p>
            <div>
            <div className="flex flex-col">
          <h1 className=" font-bold text-xl mb-2">Category:</h1>
          {categoryStrings.map((category, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className=" font-semibold text-lg">{category}</span>
              <div>
                <button
                  className={`mr-2 m-1 text-white px-4 py-2 rounded-full shadow-md hover:bg-zinc-800 bg-zinc-700 transition duration-300 ${
                    Number(localStorage.getItem(`numHintsDaily${index}`)) > 5
                      ? "opacity-50"
                      : ""
                  }`}
                  onClick={() => handleCategoryChangeDaily(index)}
                >
                  Daily
                </button>
                <button
                    className={`m-1 text-white px-4 py-2 rounded-full shadow-md hover:bg-zinc-800 bg-zinc-700 transition duration-300`}
                    onClick={() => handleCategoryChange(index)}
                >
                    Endless
                </button>
              </div>
            </div>
          ))}
        </div>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingModal;
