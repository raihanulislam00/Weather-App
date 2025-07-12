import { useTheme } from "@/context/theme-provider";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 py-3 px-4">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"} className="group">
          <div className="flex items-center gap-3 transition-transform duration-300 group-hover:scale-105">
            <img
              src={isDark ? "/logo-n.png" : "/logo-d.png"}
              alt="Weather Logo"
              className="h-10 drop-shadow-lg"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Weather App
            </span>
          </div>
        </Link>
        <div>
          <button
            className="relative p-3 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <div className={`transition-all duration-500 ${isDark ? "rotate-180" : "rotate-0"}`}>
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500 drop-shadow-sm" />
              ) : (
                <Moon className="w-5 h-5 text-blue-600 drop-shadow-sm" />
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
