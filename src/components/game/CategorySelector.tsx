import categoryMapping from "../../utils/mappings/categoryMapping";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setCategory } from "../redux/categorySlice";

const CategorySelector = () => {
  const category = useAppSelector((state) => state.category.category);
  const dispatch = useAppDispatch();

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategory(Number(event.target.value)));  
  };

  return (
    <div className="z-50">
      <label htmlFor="category" className="text-white">Category:</label>
      <select id="category" value={category} onChange={handleCategoryChange} className="block w-full dark:bg-gray-700 dark:text-white dark:border-gray-600 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
        <option value="">Select...</option>
        {
            Object.entries(categoryMapping).map(([category, value]) => {
                return <option value={value} key={value}>{category}</option>;
            })
        }
      </select>
    </div>
  );
};

export default CategorySelector;
    