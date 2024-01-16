import React, { useState, useRef, useEffect } from 'react';
import { BsEye } from 'react-icons/bs';
import { FaSortAmountDown, FaSortAmountUp, FaEye } from 'react-icons/fa';
import { BsAlphabet, BsCalendarDate } from 'react-icons/bs';
import { TiSortAlphabetically } from 'react-icons/ti';
interface DropDownSortProps {
  sort: string;
  typeSort: string;
  toggleSort: (newSort: string) => void;
  toggleTypeSort: (newTypeSort: string) => void;
}

const DropDownSort: React.FC<DropDownSortProps> = ({
  sort,
  toggleSort,
  typeSort,
  toggleTypeSort,
}) => {
  const dropdownButtonRef: any = useRef(null);
  const dropdownMenuRef: any = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close the dropdown when clicking outside of it
  const handleOutsideClick = (event: any) => {
    if (
      dropdownButtonRef.current &&
      !dropdownButtonRef.current.contains(event.target) &&
      dropdownMenuRef.current &&
      !dropdownMenuRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for outside click when the component mounts
    window.addEventListener('click', handleOutsideClick);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex flex-row items-center gap-3">
      <div
        onClick={() => {
          typeSort == 'Ascending' ? toggleTypeSort('Descending') : toggleTypeSort('Ascending');
        }}
        className="cursor-pointer items-center flex flex-row text-white hover:">
        {typeSort === 'Ascending' ? (
          <FaSortAmountUp className="" size={20} />
        ) : (
          <FaSortAmountDown className="" size={20} />
        )}
      </div>
      <div className=" relative inline-block text-left">
        <button
          ref={dropdownButtonRef}
          onClick={toggleDropdown}
          className="inline-flex justify-center items-center w-full px-1 sm:px-4 py-1  font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
          <span className="hidden sm:inline-flex text-nowrap">
            <p>{'Sort by: '}</p>
            <b>{sort}</b>
          </span>
          <span className="sm:hidden inline">
            {'Sort: '}
            <b>{sort}</b>
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-1 sm:ml-2 -mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          ref={dropdownMenuRef}
          className={`origin-top-right z-[100]  absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
            isDropdownOpen ? '' : 'hidden'
          }`}>
          <div
            className="p-2"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-button">
            <div
              onClick={() => {
                toggleSort('Views');
                toggleDropdown();
              }}
              className={`flex flex-row block items-center gap-2 ${
                sort == 'Views' ? 'font-bold text-black' : 'text-gray-700'
              } rounded-md px-4 py-2 text-base  hover:bg-gray-100 active:bg-blue-100 cursor-pointer`}
              role="menuitem">
              <BsEye
                className={`${sort == 'Views' ? 'text-black' : 'text-gray-700'} mb-[-1px]`}
                size={21}
              />
              <span>Views</span>
            </div>
            <div
              onClick={() => {
                toggleSort('Title');
                toggleDropdown();
              }}
              className={`flex flex-row block items-center gap-2 block ${
                sort == 'Title' ? 'font-bold text-black' : 'text-gray-700'
              } rounded-md px-4 py-2 text-base  hover:bg-gray-100 active:bg-blue-100 cursor-pointer`}
              role="menuitem">
              <BsAlphabet
                className={`${sort == 'Title' ? 'text-black' : 'text-gray-700'} mb-[-2px]`}
                size={21}
              />
              Title
            </div>

            <div
              onClick={() => {
                toggleSort('Year');
                toggleDropdown();
              }}
              className={`flex flex-row block items-center gap-2 ${
                sort == 'Year' ? 'font-bold text-black' : 'text-gray-700'
              } rounded-md px-4 py-2 text-base  hover:bg-gray-100 active:bg-blue-100 cursor-pointer`}
              role="menuitem">
              <BsCalendarDate
                className={`${sort == 'Year' ? 'text-black' : 'text-gray-700'} mb-[-2px]`}
                size={21}
              />
              Year
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDownSort;
