import React, { useCallback } from 'react';
import useBillboard from '../hooks/useBillboard';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import PlayButton from './PlayButton';
import useInfoModal from '../hooks/useInfoModal';
const Billboard = () => {
  const { data } = useBillboard();
  const { openModal } = useInfoModal();
  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);
  return (
    <div
      className="relative 
      h-[60vh]
      sm:h-[56.25vw]">
      <video
        className="
            w-full
            h-[60vh]
            sm:h-[56.25vw]
            object-cover
            brightness-[60%]
        "
        autoPlay
        muted
        loop
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}></video>
      <div
        className="
            absolute 
            top-[30%] 
            md:top-[40%]
            ml-4
            md:ml-16">
        <p
          className="
          text-white 
            text-xl 
            md:text-5xl 
            h-full 
            w-[50%] 
            lg:text-6xl 
            font-bold
            drop-shadow-xl">
          {data?.title}
        </p>
        <p
          className="
            text-white
            text-sm
            md:text-lg
            mt-3
            md:mt-8
            w-[90%]
            md:w-[80%]
            lg:w-[50%]
            drop-shadow">
          {data?.description}
        </p>
        <div
          className="
            flex flex-row bg-red items-center mt-3 md:mt-4 gap-3 h-7 sm:h-11">
          <PlayButton movieId={data?.id} />
          <button
            onClick={handleOpenModal}
            className="
            bg-white
            text-white
            bg-opacity-30
            rounded-md
            py-1 md:py-2
            px-2 md:px-4
            w-auto
            text-sm lg:text-lg
            font-semibold
            flex 
            flex-row
            items-center
            hover:bg-opacity-20
            transition
            h-full
          ">
            <AiOutlineInfoCircle className="mr-1 mb-[-2px]" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
