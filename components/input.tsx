import React from 'react';

interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({ id, onChange, value, label, type, disabled = false }) => {
  return (
    <div className="relative">
      <input
        disabled={disabled}
        id={id}
        value={value}
        type={type}
        onChange={onChange}
        className="
            disabled:opacity-65
            block 
            rounded-md 
            px-6 pt-6 
            pb-1 
            w-full 
            text-white 
            bg-neutral-700 
            appearance-none 
            focus:outline-none 
            focus:ring-0 peer
        "
        placeholder=" "
      />
      <label
        className="
            cursor-text
            absolute text-md 
            text-zinc-400 
            duration-150 
            transform 
            -translate-y-3 
            scale-75 
            top-4 
            z-10 
            origin-[0] 
            left-6 
            peer-placeholder-shown:scale-100 
            peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 
            peer-focus:-translate-y-3
        "
        htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
export default Input;
