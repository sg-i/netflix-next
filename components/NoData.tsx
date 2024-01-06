import React from 'react';
import Loading from './Loading';

type NoDataProps = {};

const NoData = ({}: NoDataProps) => {
  return (
    <div className="text-white justify-start items-center flex flex-col h-[40vh] ">
      <div className="text-center text-3xl">No movies found</div>
    </div>
  );
};

export default NoData;
