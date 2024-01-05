import React from 'react';

import { divide, isEmpty } from 'lodash';
import { Movie } from '../types/movie';
import MovieCard from './MovieCard';

interface MovieListProps {
  data: Movie[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div
    // className="
    // px-4
    // md:px-12
    // mt-4
    // space-y-8
    // "
    >
      <div>
        <p
          className="
            text-white
            text-md md:text-xl lg:text-2xl
            font-semibold
            mb-4">
          {title}
        </p>
        <div
          className="
            grid
            grid-cols-4
            gap-4">
          {data.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              image={movie.thumbnailUrl}
              duration={movie.duration}
              genre={movie.genre}
              year={movie.year}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
