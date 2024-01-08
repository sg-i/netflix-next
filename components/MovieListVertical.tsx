import React from 'react';

import { divide, isEmpty } from 'lodash';
import { Movie } from '../types/movie';
import MovieCard from './MovieCard';
import MovieCardVertical from './MovieCardVertical';
import NoData from './NoData';

interface MovieListVerticalProps {
  data: Movie[];
  title: string;
}

const MovieListVertical: React.FC<MovieListVerticalProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return <NoData />;
  }

  return (
    <div>
      <div className="pb-10">
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
            /grid
            /md:grid-cols-4 /lg:grid-cols-6

            flex
            flex-row
            flex-wrap
            gap-x-7
            gap-y-10
            bg-gray-800
            ">
          {[...data, ...data, ...data, ...data].map((movie) => (
            <MovieCardVertical
              key={movie.id}
              id={movie.id}
              title={movie.title}
              image={movie.thumbnailUrl}
              verticalImage={movie.thumbnailVerticalUrl}
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

export default MovieListVertical;
