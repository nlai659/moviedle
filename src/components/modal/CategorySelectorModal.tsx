import categoryMapping from "../../utils/mappings/categoryMapping";
import { useAppDispatch } from "../redux/hooks";
import { setCategory } from "../redux/categorySlice";

type CategorySelectorModalProps = {
  isVisible: boolean;
  setModalVisible: (isVisible: boolean) => void;
  setIsDaily: (isDaily: boolean) => void;
};

const CategorySelectorModal = ({ isVisible, setModalVisible, setIsDaily }: CategorySelectorModalProps) => {
  const dispatch = useAppDispatch();
  const categoryStrings = Object.keys(categoryMapping).map(
    (key) => key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
  );

  const handleCategoryChange = (index: number) => {
    setIsDaily(false);
    dispatch(setCategory(index));
    setModalVisible(false);
  };

  const handleCategoryChangeDaily = (index: number) => {
    setIsDaily(true);
    dispatch(setCategory(index));
    setModalVisible(false);
  };


  return (
    <div
      className={`z-50 fixed inset-0 flex justify-center items-center ${
        isVisible ? "" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="bg-zinc-800 rounded-3xl shadow-md p-6 max-w-md min-w-md w-2/3 relative z-50 text-white">
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
  );
};

export default CategorySelectorModal;
