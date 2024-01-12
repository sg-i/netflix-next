import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import React, { useCallback, useState } from 'react';
import Navbar from '../components/Navbar';
import { UserSession } from '../types/UserSession';
import Input from '../components/input';
import axios from 'axios';

interface UserProps {
  user: UserSession;
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: session.user,
    },
  };
}

const User = ({ user }: UserProps) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const changePassword = useCallback(async () => {
    try {
      await axios.put('/api/change/user/password', {
        email,
        oldPassword,
        newPassword,
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, oldPassword, newPassword]);
  return (
    <>
      <Navbar user={user} />
      <div
        className="
          pt-24
          px-3 sm:px-32 ">
        <div className="pt-7 text-white  container flex">
          <div className="m-auto flex flex-row  gap-10 p-7 rounded-xl bg-zinc-800 shadow-xl">
            <div className=" flex flex-col items-center gap-5">
              <div className="w-32 h-32 rounded-md overflow-hidden">
                <img alt="User image" src={user.image ? user.image : '/images/default-blue.png'} />
              </div>
              <div>{user.name}</div>
              <button className="bg-red-700  py-2 px-4 rounded-md">Change a picture</button>
            </div>
            <div className=" flex flex-col gap-4 m-auto ">
              <p className="text-xl">Settings</p>
              {/* <Input
                label="Username"
                onChange={(ev: any) => setName(ev.target.value)}
                id="name"
                value={name}
              />
              <Input
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                id="email"
                value={email}
              /> */}
              <Input
                label="Old Password"
                onChange={(ev: any) => setOldPassword(ev.target.value)}
                id="oldpassword"
                type="password"
                value={oldPassword}
              />
              <Input
                label="New Password"
                onChange={(ev: any) => setNewPassword(ev.target.value)}
                id="newpassword"
                type="password"
                value={newPassword}
              />
              <div className="flex flex-row  gap-5 mt-4">
                <button
                  onClick={changePassword}
                  className="bg-red-700 font-semibold *:py-2 px-4 flex-1 rounded-md text-nowrap">
                  Save
                </button>
                <button className="bg-zinc-400 font-semibold text-black py-2 px-4 flex-1 rounded-md">
                  Cansel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
