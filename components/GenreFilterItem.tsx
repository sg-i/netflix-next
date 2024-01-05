import React from 'react';

interface GenreFilterItemProps {
  title: string;
  active: boolean;
  onClick: (genre: string) => void;
}

const GenreFilterItem: React.FC<GenreFilterItemProps> = ({ title, active, onClick }) => {
  return (
    <div
      onClick={() => onClick(title)}
      className={`
            ${active ? 'bg-red-600' : 'bg-zinc-800'}
            cursor-pointer
            px-9
            py-1
            rounded-3xl
            border-violet-500
            hover:opacity-85
            
            `}>
      {title}
    </div>
  );
};

export default GenreFilterItem;
