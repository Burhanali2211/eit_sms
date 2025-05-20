
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
  isDarkMode: false,
};

// Export the context so it can be imported in components
export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "edusync-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      setIsDarkMode(systemTheme === "dark");

      // Set data-theme attribute for other libraries
      root.setAttribute('data-theme', systemTheme);
      
      // Update CSS variables for background colors
      updateBackgroundColors(systemTheme === "dark");
      return;
    }

    root.classList.add(theme);
    setIsDarkMode(theme === "dark");

    // Set data-theme attribute for other libraries
    root.setAttribute('data-theme', theme);
    
    // Update CSS variables for background colors
    updateBackgroundColors(theme === "dark");
  }, [theme]);

  // Function to update CSS variables for background colors
  const updateBackgroundColors = (isDark: boolean) => {
    const root = window.document.documentElement;
    if (isDark) {
      root.style.setProperty('--dashboard-bg', 'rgb(17, 24, 39)');
      root.style.setProperty('--content-bg', 'rgb(24, 33, 47)');
      root.style.setProperty('--card-bg', 'rgb(31, 41, 55)');
      root.style.setProperty('--text-primary', 'rgb(243, 244, 246)');
      root.style.setProperty('--text-secondary', 'rgb(156, 163, 175)');
      root.style.setProperty('--border-color', 'rgb(55, 65, 81)');
      root.style.setProperty('--hover-bg', 'rgb(55, 65, 81)');
    } else {
      root.style.setProperty('--dashboard-bg', 'rgb(249, 250, 251)');
      root.style.setProperty('--content-bg', 'rgb(255, 255, 255)');
      root.style.setProperty('--card-bg', 'rgb(255, 255, 255)');
      root.style.setProperty('--text-primary', 'rgb(17, 24, 39)');
      root.style.setProperty('--text-secondary', 'rgb(107, 114, 128)');
      root.style.setProperty('--border-color', 'rgb(229, 231, 235)');
      root.style.setProperty('--hover-bg', 'rgb(243, 244, 246)');
    }
  };

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      const root = window.document.documentElement;
      const systemTheme = mediaQuery.matches ? "dark" : "light";

      root.classList.remove("light", "dark");
      root.classList.add(systemTheme);
      root.setAttribute('data-theme', systemTheme);
      setIsDarkMode(systemTheme === "dark");
      
      // Update background colors when system theme changes
      updateBackgroundColors(systemTheme === "dark");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const value = {
    theme,
    isDarkMode,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
