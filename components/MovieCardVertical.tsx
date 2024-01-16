import Image from 'next/image';
import React from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';
import FavoriteButton from './FavoriteButton';
import PlayButton from './PlayButton';
import { useRouter } from 'next/router';
import useInfoModal from '../hooks/useInfoModal';
type MovieCardVerticalProps = {
  id: string;
  title: string;
  image: string;
  verticalImage: string;
  duration: string;
  genre: string;
  year: number;
};
const size = 9;
const sizeSm = 6;
const sizeMd = 7;
const sizeLg = 8;
const MovieCardVertical: React.FC<MovieCardVerticalProps> = ({
  id,
  title,
  image,
  verticalImage,
  duration,
  genre,
  year,
}) => {
  const router = useRouter();
  const { openModal } = useInfoModal();

  return (
    <div
      className="
      flex
      flex-col
      group 
      col-span  
      w-[42vw] sm:w-[24vw] md:w-[18vw] lg:w-[12vw]
      h-auto 
      shadow-xl 
      relative 
      transition 
      hover:scale-105">
      <img
        onClick={() => openModal(id)}
        className="
            cursor-pointer 
            object-cover
            transition 
            duration
            shadow-xl
            rounded-t-md
            w-full
            h-[65vw] sm:h-[34vw] md:h-[25vw] lg:h-[15vw]"
        src={verticalImage}
        alt="Thumbnail"
      />
      <div
        className="
            z-10
            bg-zinc-800
            p-2
            lg:p-3
            w-full
            transition
            shadow-md
            rounded-b-md
            ">
        <div className="flex flex-row items-center gap-3">
          <div
            className={`
                cursor-pointer
                bg-white
                w-${size} sm:w-${sizeSm} md:w-${sizeMd} lg:w-${sizeLg} 
                h-${size} sm:h-${sizeSm} md:h-${sizeMd} lg:h-${sizeLg}  
                rounded-full
                flex
                justify-center
                items-center
                transition
                hover:bg-neutral-300
                `}
            onClick={() => router.push(`/watch/${id}`)}>
            <BsFillPlayFill className="text-3xl sm:text-2xl mr-[-3px]" />
          </div>
          <FavoriteButton
            size={size}
            sizeSm={sizeSm}
            sizeMd={sizeMd}
            sizeLg={sizeLg}
            movieId={id}
          />
          <div
            onClick={() => openModal(id)}
            className={`
                cursor-pointer 
                ml-auto 
                group/item 
                w-${size} sm:w-${sizeSm} md:w-${sizeMd} lg:w-${sizeLg} 
                h-${size} sm:h-${sizeSm} md:h-${sizeMd} lg:h-${sizeLg}  
                border-white 
                border-2 
                rounded-full 
                flex 
                justify-center 
                items-center 
                transition 
                hover:border-neutral-300`}>
            <BiChevronDown className="text-white group-hover/item:text-neutral-300 text-3xl sm:text-2xl" />
          </div>
        </div>

        <p className="text-white text-lg sm:text-base font-semibold mt-2 text-nowrap overflow-hidden">
          {title}
        </p>

        <div className="flex flex-row justify-between mt-0 sm:mt-2 gap-2 items-center">
          <p className="text-white text-[15px] lg:text-sm">{genre}</p>
        </div>
        <div className="flex flex-row justify-between mt-0 sm:mt-1 gap-2 items-center">
          <p className="text-green-400">
            <span className="text-white">{year}</span>
          </p>
          <p className="text-white  ">{duration}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCardVertical;
