import React, { useEffect, useState } from "react";
import { FaSun, FaMoon, FaBars } from "react-icons/fa";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const element = document.querySelector("html");
    element.classList.remove("light", "dark");
    if (darkMode) {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="sticky top-0 z-50 h-[65px] md:h-[72px] px-4 md:px-8 bg-[#ffffffd0] dark:bg-[#21242bc5] shadow-custom backdrop-blur-md flex items-center justify-between">
      {/* Left Section: Hamburger + Logo */}
      <div className="flex items-center gap-8">
        <div></div>

        <img
          src="/z.png"
          alt="Logo"
          className="h-14 w-auto"
        />
      </div>

      {/* Right Section: Dark Mode Toggle */}
      <div>
        <button className="p-2 rounded-full">
          {darkMode ? (
            <FaSun size={22} className="text-white" onClick={toggleDarkMode} />
          ) : (
            <FaMoon
              size={22}
              className="text-gray-900"
              onClick={toggleDarkMode}
            />
          )}
        </button>
      </div>
    </nav>
  );
}
