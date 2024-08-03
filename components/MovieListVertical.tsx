import React from 'react';

import { divide, isEmpty } from 'lodash';
import { Movie } from '../types/Movie';
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
            text-lg sm:text-md md:text-xl lg:text-2xl
            font-base sm:font-semibold
            mb-2 sm:mb-4">
          {title}
        </p>
        <div
          className="
            items-center
            grid
            grid-cols-2 sm:grid-cols-3 md:grid-cols-4
            lg:flex
            lg:flex-row
            lg:flex-wrap
            gap-x-7
            gap-y-10
            ">
          {data.map((movie) => (
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
