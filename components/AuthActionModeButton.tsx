import React from 'react';

interface AuthActionModeButtonProps {
  text: string;
  click: () => void;
}

const AuthActionModeButton: React.FC<AuthActionModeButtonProps> = ({ text, click }) => {
  return (
    <button
      onClick={click}
      className="border-red-700 hover:bg-gradient-to-b from-[#ffffff00] to-[#ec141460] border-4 text-xl p-2 text-white rounded-xl w-full mt-10 ">
      {text}
    </button>
  );
};

export default AuthActionModeButton;
