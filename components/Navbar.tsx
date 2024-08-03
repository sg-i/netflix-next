import { useCallback, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { MobileMenu } from './MobileMenu';
import NavbarItem from './NavbarItem';
import { BsChevronDown, BsSearch } from 'react-icons/bs';
import AccountMenu from './AccountMenu';
import { UserSession } from '../types/userSession';
import Link from 'next/link';
import { useRouter } from 'next/router';
const TOP_OFFSET = 66;

interface NavbarProps {
  user: UserSession;
}

const Navbar = ({ user }: NavbarProps) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const router = useRouter();
  const SearchMovies = () => {
    router.push({
      pathname: '/movies',
      query: { search: searchValue },
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    SearchMovies();
  };
  return (
    <nav
      className="
        w-full
        fixed
        z-40
      ">
      <div
        className={`
            px-4
            md:px-16
            py-6
            flex
            flex-row
            items-center
            transition
            duration-500
           ${showBackground ? ' bg-zinc-900 bg-opacity-90' : ''}
            `}>
        <Link href={'/'}>
          <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo" />
        </Link>
        <div
          className="
            flex-row
            items-center
            md:ml-8
            ml-5
            md:gap-6
            gap-5
            hidden
            md:flex
          ">
          <NavbarItem path="/" label="Home" />
          <NavbarItem path="/movies" label="Movies" />
          <NavbarItem path="/favorites" label="My List" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-row items-center gap-2 ml-5 cursor-pointer">
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div
          className="
          flex 
          flex-row 
          ml-auto 
          sm:gap-7 
          gap-0
          items-center
          text-white
          focus-within:text-black">
          <form
            onSubmit={handleSubmit}
            className="
              focus:opacity-100
              opacity-75
              flex 
              gap-3 
              flex-row 
              items-center ">
            <input
              className="
                hidden
                sm:flex
                focus:bg-gray-100 
                focus:text-black 
                text-white 
                bg-zinc-800 
                text-xl 
                py-1 
                px-3 
                pr-9
                rounded-md 
                focus:outline-none"
              value={searchValue}
              onChange={handleSearch}
              placeholder="Search"
              type="text"
            />
            <div onClick={SearchMovies} className="cursor-pointer select-none ml-[-40px]">
              <BsSearch className="" />
            </div>
          </form>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img alt="User image" src={user.image ? user.image : '/images/default-blue.png'} />
            </div>
            <BsChevronDown
              className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}
            />
            <AccountMenu
              username={user.name}
              image={user.image ? user.image : '/images/default-blue.png'}
              visible={showAccountMenu}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
