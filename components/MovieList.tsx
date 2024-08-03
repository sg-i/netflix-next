import React from 'react';

import { isEmpty } from 'lodash';
import { Movie } from '../types/Movie';
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
            grid-cols-2 md:grid-cols-4
            gap-4
            ">
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
  );
};

export default MovieList;
