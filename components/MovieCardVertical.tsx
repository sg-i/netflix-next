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
      bg-red-100
      group 
      col-span  
      w-[42vw] sm:w-[12vw] 
      h-auto sm:h-auto
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
            h-[65vw] sm:h-[15vw]"
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
            className="
                cursor-pointer
                bg-white
                w-4 
                h-4 
                lg:h-8 
                lg:w-8 
                rounded-full
                flex
                justify-center
                items-center
                transition
                hover:bg-neutral-300
                "
            onClick={() => router.push(`/watch/${id}`)}>
            <BsFillPlayFill className="mr-[-3px]" size={30} />
          </div>
          <FavoriteButton sizeBig={8} sizeSmall={4} movieId={id} />
          <div
            onClick={() => openModal(id)}
            className="
                cursor-pointer 
                ml-auto 
                group/item 
                w-4 
                h-4 
                lg:h-8 
                lg:w-8 
                border-white 
                border-2 
                rounded-full 
                flex 
                justify-center 
                items-center 
                transition 
                hover:border-neutral-300">
            <BiChevronDown size={30} className="text-white group-hover/item:text-neutral-300 " />
          </div>
        </div>

        <p className="text-white text-base font-semibold mt-2">{title}</p>

        <div className="flex flex-row justify-between mt-2 gap-2 items-center">
          <p className="text-white text-[15px] lg:text-sm">{genre}</p>
        </div>
        <div className="flex flex-row justify-between mt-1 gap-2 items-center">
          <p className="text-green-400  ">
            <span className="text-white">{year}</span>
          </p>
          <p className="text-white  ">{duration}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCardVertical;
