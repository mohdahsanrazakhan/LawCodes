// import { useTheme } from '../context/ThemeContext';

// const ThemeToggle = () => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <button
//       onClick={toggleTheme}
//       className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
//     >
//       {theme === 'dark' ? '☀️' : '🌙'}
//     </button>
//   );
// };

// export default ThemeToggle;

import { LaptopMinimal, MoonStar, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "system";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="inline-grid grid-cols-3 bg-gray-300 dark:bg-gray-700 rounded-full p-1 text-black dark:text-white">
      {["system", "light", "dark"].map((mode) => (
        <button
          key={mode}
          onClick={() => setTheme(mode)}
          className={`p-1 m-auto rounded-full transition ${
            theme === mode ? "bg-gray-100 dark:bg-gray-800" : ""
          }`}
          title={mode}
        >
          {mode === "light" ? <Sun size={17} strokeWidth={1.5} /> : mode === "dark" ? <MoonStar size={17} strokeWidth={1.5} /> : <LaptopMinimal size={17} strokeWidth={1.5} />}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;