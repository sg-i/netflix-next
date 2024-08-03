import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import InfoModal from '../components/InfoModal';
import Navbar from '../components/Navbar';
import useInfoModal from '../hooks/useInfoModal';
import { UserSession } from '../types/userSession';
import MovieListVertical from '../components/MovieListVertical';
import useFavorites from '../hooks/useFavorites';
import Loading from '../components/Loading';

interface FavoritesProps {
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

const Favorites = ({ user }: FavoritesProps) => {
  const { data: favorites = [], isLoading } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar user={user} />
      <div
        className="
          pt-24
          px-3 sm:px-32 ">
        <div className="pt-7">
          {isLoading ? <Loading /> : <MovieListVertical title="Movies" data={favorites} />}
        </div>
      </div>
    </>
  );
};

export default Favorites;
