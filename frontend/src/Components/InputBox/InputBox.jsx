import React from "react";

export default function InputBox({
  label,
  name,
  type,
  placeholder,
  value,
  onChange = () => {},
  disabled = false,
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        htmlFor={name}
        className="text-base font-bold text-gray-800 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={`
          bg-white dark:bg-[#2a2a2a] border border-gray-300 dark:border-gray-600 
          px-4 py-2 rounded-md text-sm font-inter 
          text-gray-900 dark:text-white 
          placeholder-gray-400 dark:placeholder-gray-500 
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        onChange={onChange}
        value={value || ""}
        disabled={disabled}
      />
    </div>
  );
}
