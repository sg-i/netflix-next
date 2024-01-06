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
    <div
    // className="
    // px-4
    // md:px-12
    // mt-4
    // space-y-8
    // "
    >
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
            flex
            flex-row
            flex-wrap
           
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
