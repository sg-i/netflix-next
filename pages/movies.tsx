import React, { ChangeEvent, useEffect, useState } from 'react';
import { UserSession } from '../types/userSession';
import Navbar from '../components/Navbar';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import GenreFilterItem from '../components/GenreFilterItem';
import useFilterMovies from '../hooks/useFilterMovies';
import InfoModal from '../components/InfoModal';
import useInfoModal from '../hooks/useInfoModal';
import DropDownSort from '../components/DropDownSort';
import MovieListVertical from '../components/MovieListVertical';
import Search from '../components/Search';
import Loading from '../components/Loading';
import { useRouter } from 'next/router';
import DropDownGenre from '../components/DropDownGenre';

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

interface MoviesProps {
  user: UserSession;
}
const genres = ['All', 'Action', 'Comedy', 'Sci-Fi', 'Adventure'];
const Movies: React.FC<MoviesProps> = ({ user }) => {
  const router = useRouter();
  const [activeGenre, setActiveGenre] = useState('All');
  const [sort, setSort] = useState('Views');
  const [typeSort, setTypeSort] = useState('Descending');
  const [search, setSearch] = useState(router.query.search || '');
  const [searchText, setSearchText] = useState(router.query.search || '');
  const toggleActiveGenre = (genre: string) => {
    setActiveGenre(genre);
  };
  const toggleSort = (newSort: string) => {
    setSort(newSort);
  };
  const { data: movies = [], isLoading } = useFilterMovies({
    activeGenre,
    sort,
    typeSort,
    search: searchText,
  });
  const toggleTypeSort = (newTypeSort: string) => {
    setTypeSort(newTypeSort);
  };

  const { isOpen, closeModal } = useInfoModal();

  const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchText(search);
    }, 450);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  useEffect(() => {
    setSearchText(router.query.search || '');
    setSearch(router.query.search || '');
  }, [router.query]);

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar user={user} />
      <div
        className={`
          pt-16 sm:pt-24
          px-3 sm:px-12 md:px-20 lg:px-32
          `}>
        <Search value={search} onChange={changeSearch} />
        <div
          className=" 
            flex
            flex-row
            justify-between
            items-center">
          <div
            className="
              hidden
              lg:flex
              flex-row
              gap-6
              text-white
              overflow-auto
              ">
            {genres.map((genre) => (
              <GenreFilterItem
                key={genre}
                onClick={toggleActiveGenre}
                active={activeGenre == genre}
                title={genre}
              />
            ))}
          </div>
          <DropDownGenre
            activeGenre={activeGenre}
            toggleActiveGenre={toggleActiveGenre}
            genres={genres}
          />
          <DropDownSort
            typeSort={typeSort}
            toggleTypeSort={toggleTypeSort}
            toggleSort={toggleSort}
            sort={sort}
          />
        </div>
        <div className="pt-3 sm:pt-7">
          {isLoading ? <Loading /> : <MovieListVertical title="Movies" data={movies} />}
        </div>
      </div>
    </>
  );
};
export default Movies;
