import React from 'react';

interface SearchProps {
  onChange: any;
  value: string;
}

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <div className="bg-zinc-900 w-full  pb-4">
      <input
        className="bg-zinc-900  text-white px-2 pt-4 pb-2 text-3xl w-full border-b-2 border-zinc-600 focus:border-zinc-300 hover:border-zinc-500  focus:outline-none "
        value={value}
        placeholder="Search"
        onChange={onChange}
      />
    </div>
  );
};
export default Search;
