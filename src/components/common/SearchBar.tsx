"use client";

import React from "react";

interface SearchBarProps {
  searchTerm: string;
  placeholder?: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, placeholder }) => {
  return (
    <div className="m-4">
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border w-90 search-bar"
      />
    </div>
  );
};

export default SearchBar;