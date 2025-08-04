import React from "react";

export default function TextArea({
  label,
  name,
  rows = 4,
  placeholder = "",
  value = "",
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
      <textarea
        name={name}
        id={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full px-4 py-3 rounded-md border text-sm transition-all duration-300 resize-none
          text-gray-900 dark:text-white
          border-gray-300 dark:border-gray-600
          bg-white dark:bg-[#2a2a2a]
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      />
    </div>
  );
}
