import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"; // Heroicons library
import { useNavigate, useParams } from "react-router";

const Search = ({ onChange = ()=> {} }) => {
  const { q } = useParams(); // Get the query parameter from the URL
  const [searchTerm, setSearchTerm] = useState("");
  const [page] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}/${page}`);
      onChange();
    }
  };

  useEffect(() => {
    if (q) {
      setSearchTerm(q);
    }
    else{
      setSearchTerm("");
    }
  }, [q]);

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="flex items-center space-x-2 border border-gray-300 bg-white rounded-md px-4 py-2 "
      >
        {/* Search Input */}
        <input
          name="search"
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Search for books..."
          className="flex-grow focus:outline-none"
        />
        {/* Search Icon Button */}
        <button
          type="submit"
          className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
          aria-label="Search"
        >
          <MagnifyingGlassIcon className="h-5 w-5 font-bold" />
        </button>
      </form>
    </div>
  );
};

export default Search;
