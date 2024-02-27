import { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    setSearchTerm("");
    e.preventDefault();
    
    // Check Correct Answer

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
