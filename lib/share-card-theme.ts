export interface ShareCardTheme {
  background: string;
  foreground: string;
  muted: string;
  primary: string;
  border: string;
}

export const shareCardThemes = {
  light: {
    background: "#f8fafc",
    foreground: "#0f172a",
    muted: "#64748b",
    primary: "#0ea5e9",
    border: "#e2e8f0",
  },
  dark: {
    background: "#0f172a",
    foreground: "#f8fafc",
    muted: "#94a3b8",
    primary: "#38bdf8",
    border: "#334155",
  },
} satisfies Record<"light" | "dark", ShareCardTheme>;

export function getShareCardTheme(isDark: boolean): ShareCardTheme {
  return isDark ? shareCardThemes.dark : shareCardThemes.light;
}