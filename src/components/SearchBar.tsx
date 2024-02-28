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

  return (
    <form onSubmit={handleSubmit} className="bg-gray-700 rounded-lg shadow-md p-2">
      <input
        type="text"
        placeholder="Search for a movie"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-4 w-full mt-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
  
};

export default SearchBar;
