import { useState } from "react";

type SearchBarProps = {
  checkAnswer: (answer: string) => void;
};

const SearchBar = ({ checkAnswer }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    if (searchTerm === "") return;
    setSearchTerm("");
    e.preventDefault();
    
    // Check Correct Answer
    checkAnswer(searchTerm);

    // Correct Answer Logic

    // Incorrect Answer Logic
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-4 w-full mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
