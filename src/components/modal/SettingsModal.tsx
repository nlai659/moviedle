import CategorySelector from "./CategorySelector";
import YearRangeSlider from "./YearRangeSlider";

type SettingsModalProps = {
  isVisible: boolean;
  setModalVisible: (isVisible: boolean) => void;
};

const SettingsModal = ({ isVisible, setModalVisible }: SettingsModalProps) => {
  return (
    <div>
      <div
        className={`z-50 fixed inset-0 flex justify-center items-center ${
          isVisible ? "" : "hidden"
        }`}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50"></div>
        <div className="bg-zinc-900 rounded-3xl shadow-md p-6 max-w-md min-w-md w-2/3 relative z-50 text-white">
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
          <div className="flex flex-col">
            <CategorySelector setModalVisible={setModalVisible} />
            <hr className="border-t-2 border-gray-300 m-6" />
            <YearRangeSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
