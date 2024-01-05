import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import useCurrentUser from '../hooks/useCurrentUser';
import Navbar from '../components/Navbar';
import Billboard from '../components/Billboard';
import useMovieList from '../hooks/useMovieList';
import MovieList from '../components/MovieList';
import { UserSession } from '../types/UserSession';
import useFavorites from '../hooks/useFavorites';
import InfoModal from '../components/InfoModal';
import useInfoModal from '../hooks/useInfoModal';
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

interface HomeProps {
  user: UserSession;
}

const Home = ({ user }: HomeProps) => {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar user={user} />
      <Billboard />
      <div className="pb-40 px-4 md:px-12 mt-4 space-y-8">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="Favorites" data={favorites} />
      </div>
    </>
  );
};

export default Home;
