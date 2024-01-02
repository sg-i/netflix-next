import React from 'react';

import { divide, isEmpty } from 'lodash';
import { Movie } from '../types/movie';

interface MovieListProps {
  data: Movie[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  console.log('mov', data);
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div
      className="
        px-4
        md:px-12
        mt-4
        space-y-8
        ">
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
            gap-2">
          {data.map((movie) => (
            <div className="text-white" key={movie.id}>
              {movie.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
