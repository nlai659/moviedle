import CategorySelector from "./CategorySelector";

type CategorySelectorModalProps = {
  isVisible: boolean;
  setModalVisible: (isVisible: boolean) => void;
};

const CategorySelectorModal = ({
  isVisible,
  setModalVisible,
}: CategorySelectorModalProps) => {
  return (
    <div
      className={`z-50 fixed inset-0 flex justify-center items-center ${
        isVisible ? "" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="bg-zinc-900 rounded-3xl shadow-md p-6 w-5/6 sm:max-w-md relative z-50 text-white">
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
        </div>
      </div>
    </div>
  );
};

export default CategorySelectorModal;
