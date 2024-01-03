import Image from 'next/image';
import React from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import FavoritesButton from './FavoritesButton';
type MovieCardProps = {
  id: string;
  title: string;
  image: string;
  duration: string;
  genre: string;
};

const MovieCard: React.FC<MovieCardProps> = ({ id, title, image, duration, genre }) => {
  return (
    <div className="group col-span h-[13vw] relative">
      <img
        className="
        cursor-pointer 
        object-cover
        transition 
        duration
        shadow-xl
        rounded-md
        group-hover:opacity-90
        sm:group-hover:opacity-0
        w-full
        h-[13vw]
        "
        src={image}
      />
      <div
        className="
            opacity-0
            absolute
            top-0
            transition
            duration-200
            z-10
            invisible
            sm:visible
            delay-75
            scale-0
            group-hover:scale-110
            group-hover:opacity-100
            group-hover:translate-y-[-6vw]
        ">
        <img
          className="
            cursor-pointer 
            object-cover
            transition 
            duration
            shadow-xl
            rounded-t-md
            w-full
            h-[13vw]"
          src={image}
          alt="Thumbnail"
        />
        <div
          className="
            z-10
            bg-zinc-800
            p-2
            lg:p-4
            absolute
            w-full
            transition
            shadow-md
            rounded-b-md
            ">
          <div className="flex flex-row items-center gap-3">
            <div
              className="
                cursor-pointer
                bg-white
                w-6
                h-6
                lg:w-10
                lg:h-10
                rounded-full
                flex
                justify-center
                items-center
                transition
                hover:bg-neutral-300
                "
              onClick={() => {}}>
              <BsFillPlayFill className="mr-[-3px]" size={30} />
            </div>
            <FavoritesButton movieId={id} />
          </div>
          <p className="text-white text-xl font-semibold mt-4">{title}</p>

          <div className="flex flex-row justify-between mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{genre}</p>
          </div>
          <div className="flex flex-row justify-between mt-4 gap-2 items-center">
            <p className="text-green-400 font-semibold ">
              New <span className="text-white">2023</span>
            </p>
            <p className="text-white font-semibold ">{duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
