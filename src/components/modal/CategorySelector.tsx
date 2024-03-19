import categoryMapping from "../../utils/mappings/categoryMapping";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCategory } from "../redux/categorySlice";
import { setDaily } from "../redux/dailySlice";

type CategorySelectorModalProps = {
  setModalVisible: (isVisible: boolean) => void;
};

const CategorySelector = ({ setModalVisible }: CategorySelectorModalProps) => {
  const category = useAppSelector((state) => state.category.category);
  const daily = useAppSelector((state) => state.daily.daily);

  const dispatch = useAppDispatch();
  const categoryStrings = Object.keys(categoryMapping).map(
    (key) => key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
  );

  const handleCategoryChange = (index: number) => {
    dispatch(setDaily(false));
    dispatch(setCategory(index));
    setModalVisible(false);
  };

  const handleCategoryChangeDaily = (index: number) => {
    dispatch(setDaily(true));
    dispatch(setCategory(index));
    setModalVisible(false);
  };

  return (
    <>
      <h1 className=" font-bold text-xl mb-2">Category:</h1>
      {categoryStrings.map((categoryString, index) => (
        <div key={index} className="flex justify-between items-center">
          <span className=" font-semibold text-lg">{categoryString}</span>
          <div>
            <button
              className={`mr-2 m-1 text-white text-sm sm:text-base px-4 py-2 rounded-full shadow-md hover:bg-zinc-800 bg-zinc-700 transition duration-300 ${
                localStorage.getItem(`gameOverDaily${index}`) === "true"
                  ? "opacity-50"
                  : ""
              } ${category === index && daily ? "border border-zinc-400 drop-shadow-xl" : ""}`}
              onClick={() => handleCategoryChangeDaily(index)}
            >
              Daily
            </button>
            <button
              className={`m-1 text-white text-sm sm:text-base px-4 py-2 rounded-full shadow-md hover:bg-zinc-800 bg-zinc-700 transition duration-300 ${
                category === index && !daily ? "border border-zinc-400 drop-shadow-xl" : ""
              }`}
              onClick={() => handleCategoryChange(index)}
            >
              Endless
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CategorySelector;
