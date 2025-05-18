
import { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Hook to manage theme-related CSS variables and class names
 * for consistent theme application across the application.
 */
export const useThemeMode = () => {
  const { theme, isDarkMode } = useTheme();
  
  // Apply or remove dark mode class to html element
  useEffect(() => {
    const htmlElement = document.documentElement;
    
    if (isDarkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
    
    // Set data-theme attribute for other libraries that might use it
    htmlElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    return () => {
      // Clean up
      htmlElement.removeAttribute('data-theme');
    };
  }, [isDarkMode]);
  
  return {
    theme,
    isDarkMode,
  };
};
