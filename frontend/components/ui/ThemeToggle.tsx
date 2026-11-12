"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * ThemeToggle:
 * Allows visitors to seamlessly toggle between luxury ocean Dark mode and crisp Light mode.
 * Persists user preference in localStorage.
 */
export function ThemeToggle({
  className = "",
  themeMode = "white",
}: {
  className?: string;
  themeMode?: "white" | "black";
}) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("poa_theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.classList.toggle("light", saved === "light");
      document.documentElement.classList.toggle("dark", saved === "dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("poa_theme", next);
    } catch {}
    document.documentElement.classList.toggle("light", next === "light");
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={`inline-flex size-9 items-center justify-center rounded-full border opacity-0 ${className}`}
      >
        <Moon className="size-4" />
      </button>
    );
  }

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Switch to dark theme" : "Switch to light theme"}
      className={`group relative inline-flex size-9 sm:size-10 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ${
        themeMode === "black"
          ? "border-black/20 bg-black/5 text-black hover:bg-black/10"
          : "border-white/25 bg-white/10 text-white hover:bg-white/20 hover:border-white/40 shadow-sm"
      } ${className}`}
    >
      {isLight ? (
        <Sun className="size-4 text-amber-500 transition-transform duration-500 rotate-0 group-hover:rotate-90" />
      ) : (
        <Moon className="size-4 text-[#E8C58F] transition-transform duration-500 rotate-0 group-hover:-rotate-45" />
      )}
    </button>
  );
}

