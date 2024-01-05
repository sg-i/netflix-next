import React, { useState, useRef, useEffect } from 'react';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
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
    console.log('drop');
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
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
          <span>
            {'Sort by: '}
            <b>{sort}</b>
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-2 -mr-1"
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
          className={`origin-top-right z-[100]  absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
            isDropdownOpen ? '' : 'hidden'
          }`}>
          <div
            className="py-2 p-2"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-button">
            <div
              onClick={() => {
                toggleSort('Views');
                toggleDropdown();
              }}
              className="flex block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
              role="menuitem">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                id="moon"
                width="18px"
                className="mr-2">
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"></path>
              </svg>
              Views
            </div>
            <div
              onClick={() => {
                toggleSort('Title');
                toggleDropdown();
              }}
              className="flex block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
              role="menuitem">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                id="light"
                width="18px"
                className="mr-2">
                <path d="M19 9.199h-.98c-.553 0-1 .359-1 .801 0 .441.447.799 1 .799H19c.552 0 1-.357 1-.799 0-.441-.449-.801-1-.801zM10 4.5A5.483 5.483 0 0 0 4.5 10c0 3.051 2.449 5.5 5.5 5.5 3.05 0 5.5-2.449 5.5-5.5S13.049 4.5 10 4.5zm0 9.5c-2.211 0-4-1.791-4-4 0-2.211 1.789-4 4-4a4 4 0 0 1 0 8zm-7-4c0-.441-.449-.801-1-.801H1c-.553 0-1 .359-1 .801 0 .441.447.799 1 .799h1c.551 0 1-.358 1-.799zm7-7c.441 0 .799-.447.799-1V1c0-.553-.358-1-.799-1-.442 0-.801.447-.801 1v1c0 .553.359 1 .801 1zm0 14c-.442 0-.801.447-.801 1v1c0 .553.359 1 .801 1 .441 0 .799-.447.799-1v-1c0-.553-.358-1-.799-1zm7.365-13.234c.391-.391.454-.961.142-1.273s-.883-.248-1.272.143l-.7.699c-.391.391-.454.961-.142 1.273s.883.248 1.273-.143l.699-.699zM3.334 15.533l-.7.701c-.391.391-.454.959-.142 1.271s.883.25 1.272-.141l.7-.699c.391-.391.454-.961.142-1.274s-.883-.247-1.272.142zm.431-12.898c-.39-.391-.961-.455-1.273-.143s-.248.883.141 1.274l.7.699c.391.391.96.455 1.272.143s.249-.883-.141-1.273l-.699-.7zm11.769 14.031l.7.699c.391.391.96.453 1.272.143.312-.312.249-.883-.142-1.273l-.699-.699c-.391-.391-.961-.455-1.274-.143s-.248.882.143 1.273z"></path>
              </svg>
              Title
            </div>

            <div
              onClick={() => {
                toggleSort('Year');
                toggleDropdown();
              }}
              className="flex block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
              role="menuitem">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                className="mr-2"
                viewBox="0 0 32 32"
                id="desktop">
                <path d="M30 2H2a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h9.998c-.004 1.446-.062 3.324-.61 4h-.404A.992.992,0,0,0,10,29c0,.552.44,1,.984,1h10.03A.992.992,0,0,0,22,29c0-.552-.44-1-.984-1h-.404c-.55-.676-.606-2.554-.61-4H30a2 2,0,0,0,2-2V4a2 2,0,0,0-2-2zM14 24l-.002.004L14 24zm4.002.004L18 24h.002v.004zM30 20H2V4h28v16z"></path>
              </svg>
              Year
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDownSort;
