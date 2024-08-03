import React from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
interface AccountMenuProps {
  visible?: boolean;
  username?: string;
  image?: string;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible, username, image }) => {
  const router = useRouter();

  if (!visible) return null;
  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-2 ">
        <div
          onClick={() => router.push('/user')}
          className="px-6 group/item flex flex-row gap-3 items-center w-full ">
          <img className="w-9 h-9 rounded-md" src={image} alt="Iser image" />
          <p className="text-white text-xl group-hover/item:underline">{username}</p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          onClick={() => signOut()}
          className="px-3 text-center text-white text-lg hover:underline">
          Sign Out of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
