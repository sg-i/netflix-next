import React from 'react';
import useMovie from '../../hooks/useMovie';
import { useRouter } from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);
  return (
    <div
      className="
        h-screen 
        w-screen
        bg-black

        ">
      <nav
        className="
            fixed
            w-full
            p-4
            z-10
            flex
            flex-row
            items-center
            gap-7
            bg-black
            bg-opacity-70
        ">
        <AiOutlineArrowLeft
          onClick={() => router.back()}
          className="
          text-white 
            text-3xl md:text-4xl 
            mb-[-4px]
            cursor-pointer
            hover:text-neutral-300"
        />
        <p className="text-white text-2xl md:text-3xl">
          <span className="font-light">Watching: </span>
          {data?.title}
        </p>
      </nav>
      <video
        className="
            h-full
            w-full"
        src={data?.videoUrl}
        autoPlay
        controls></video>
    </div>
  );
};
export default Watch;
