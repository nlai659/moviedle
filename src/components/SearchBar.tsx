import { useState } from "react";

type SearchBarProps = {
  checkAnswer: (answer: string) => void;
};

const SearchBar = ({ checkAnswer }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm === "") return;
    setSearchTerm("");
    
    // Check Correct Answer
    checkAnswer(searchTerm);

    // Correct Answer Logic

    // Incorrect Answer Logic
  };

  const handleSkip = () => {
    checkAnswer("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-700 rounded-lg shadow-md p-2 flex flex-wrap">
      <input
        type="text"
        placeholder="Search for a movie"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-4 w-5/6 mt-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Submit
      </button>
      <button
        type="button"
        onClick={handleSkip}
        className="bg-red-500 text-white p-4 mt-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ml-2 flex-grow"
      >
        Skip
      </button>
    </form>
  );
  
  
  
  
};

export default SearchBar;
