import React from "react";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

function Search(props: SearchProps) {
  return (
    <input
      className="w-56 h-10 p-1 text-gray-900 border-2 border-gray-400 border-solid rounded-md outline-none focus:border-8 focus:border-blue-400 focus:bg-blue-100"
      type="text"
      name="search"
      id="search"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder="Filter..."
    >
    </input>
  );
}

export default Search;
