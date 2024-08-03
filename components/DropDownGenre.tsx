import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
interface DropDownGenreProps {
  genres: string[];
  activeGenre: string;
  toggleActiveGenre: (genre: string) => void;
}

const DropDownGenre: React.FC<DropDownGenreProps> = ({
  genres,
  activeGenre,
  toggleActiveGenre,
}) => {
  const changedSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    toggleActiveGenre(e.target.value);
  };
  return (
    <div className="flex flex-row items-center lg:hidden">
      <label className="text-white mr-2 text-lg" htmlFor="select-genre">
        Genre:
      </label>
      <select
        onChange={changedSelect}
        value={activeGenre}
        className="rounded-md text-lg py-[3px]"
        id="select-genre">
        {genres.map((genre) => (
          <option key={genre} className="" value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDownGenre;
