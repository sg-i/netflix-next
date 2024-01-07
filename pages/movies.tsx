import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { UserSession } from '../types/UserSession';
import Navbar from '../components/Navbar';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import GenreFilterItem from '../components/GenreFilterItem';
import useMovie from '../hooks/useMovie';
import useFilterMovies from '../hooks/useFilterMovies';
import MovieList from '../components/MovieList';
import InfoModal from '../components/InfoModal';
import useInfoModal from '../hooks/useInfoModal';
import DropDownSort from '../components/DropDownSort';
import MovieListVertical from '../components/MovieListVertical';
import Input from '../components/input';
import { EventEmitter } from 'stream';
import Search from '../components/Search';
import Loading from '../components/Loading';
import { useRouter } from 'next/router';

export async function getServerSideProps(context: NextPageContext) {
  console.log(context.query);
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
      // searchQuery: context.query.search || '',
    },
  };
}

interface MoviesProps {
  user: UserSession;
}
const genres = ['All', 'Action', 'Comedy', 'Sci-Fi', 'Adventure'];
const sorts = ['Views', 'Title', 'Year'];
const typesSorts = ['Ascending', 'Descending'];
const Movies: React.FC<MoviesProps> = ({ user }) => {
  const router = useRouter();
  const [activeGenre, setActiveGenre] = useState('All');
  const [sort, setSort] = useState('Views');
  const [typeSort, setTypeSort] = useState('Descending');
  const [search, setSearch] = useState(router.query.search || '');
  const [searchText, setSearchText] = useState(router.query.search || '');
  const toggleActiveGenre = useCallback(
    (genre: string) => {
      setActiveGenre(genre);
    },
    [activeGenre],
  );
  const toggleSort = useCallback(
    (newSort: string) => {
      setSort(newSort);
    },
    [sort],
  );
  const toggleTypeSort = useCallback(
    (newTypeSort: string) => {
      setTypeSort(newTypeSort);
    },
    [typeSort],
  );
  const { data: movies = [], isLoading } = useFilterMovies({
    activeGenre,
    sort,
    typeSort,
    search: searchText,
  });
  const { isOpen, closeModal } = useInfoModal();

  let timerId: NodeJS.Timeout;
  const changeSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [search],
  );

  // timeout for search
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
        className="
          pt-24
          px-3 sm:px-32 ">
        <Search value={search} onChange={changeSearch} />
        <div
          className=" 
            flex
            flex-row
            justify-between
            items-center">
          <div
            className="
              flex
              flex-row
              gap-6
              text-white">
            {genres.map((genre) => (
              <GenreFilterItem
                key={genre}
                onClick={toggleActiveGenre}
                active={activeGenre == genre}
                title={genre}
              />
            ))}
          </div>

          <DropDownSort
            typeSort={typeSort}
            toggleTypeSort={toggleTypeSort}
            toggleSort={toggleSort}
            sort={sort}
          />
        </div>
        <div className="pt-7">
          {isLoading ? <Loading /> : <MovieListVertical title="Movies" data={movies} />}

          {/* {movies?.map((m: any) => (
            <div key={m.id}>{m.title}</div>
          ))} */}
        </div>
      </div>
    </>
  );
};
export default Movies;
