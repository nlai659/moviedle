import CategorySelectorModal from "../modal/CategorySelectorModal"
import { useState } from "react";

const CategorySelectorHamburger = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div className="z-50 p-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 cursor-pointer text-zinc-400 hover:text-zinc-200 transition duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={() => setModalVisible(true)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
      <CategorySelectorModal
        isVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </div>
  );
};

export default CategorySelectorHamburger;
