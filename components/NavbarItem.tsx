import Link from 'next/link';
import React from 'react';
interface NavbarItemProps {
  label: string;
  path?: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, path = '/' }) => {
  return (
    <Link href={path} className="text-white cursor-pointer hover:text-gray-300 transition">
      {label}
    </Link>
  );
};
export default NavbarItem;
