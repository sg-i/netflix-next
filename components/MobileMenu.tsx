import Link from 'next/link';
import React from 'react';
interface MobileMenuProps {
  visible?: boolean;
}
export const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-12 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <Link href={'/'} className="px-3 text-center text-white hover:underline">
          Home
        </Link>
        <Link href={'/movies'} className="px-3 text-center text-white hover:underline">
          Movies
        </Link>
        <Link href={'/favorites'} className="px-3 text-center text-white hover:underline">
          Favorites
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
