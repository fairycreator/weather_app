import React, { FC, useState, useCallback, useEffect } from "react";
import { Weather } from "./Weather";
import "./app.css";

interface Props {}

export const App: FC<Props> = () => {
  const [input, setInput] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark-mode" : true;
  });

  useEffect(() => {
    const themeClass = isDarkMode ? "dark-mode" : "light-mode";
    document.body.classList.remove("dark-mode", "light-mode");
    document.body.classList.add(themeClass);
    localStorage.setItem("theme", themeClass);
  }, [isDarkMode]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
    },
    []
  );

  return (
    <div>
      {/* Theme switcher */}
      <div className="switch-wrapper">
        <span>Light</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={() => setIsDarkMode((prev) => !prev)}
          />
          <span className="switch-slider"></span>
        </label>
        <span>Dark</span>
      </div>

      <input
        role="search"
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter a city"
      />
      <button onClick={() => {}}>Show Weather</button>
      <Weather city={input} />
    </div>
  );
};
