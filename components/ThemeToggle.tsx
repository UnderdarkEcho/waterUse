"use client";

import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { isDark, mounted, toggle } = useTheme();

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-xl border border-border bg-white/80 dark:bg-slate-800/80"
        aria-label="Toggle theme"
      >
        <Sun className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-xl border border-border bg-white/80 dark:bg-slate-800/80 hover:bg-primary/10 transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600" />
      )}
    </button>
  );
}