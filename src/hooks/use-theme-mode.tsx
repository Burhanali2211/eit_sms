
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Hook to access theme-related values from ThemeContext.
 * This is a simple pass-through hook to maintain API compatibility
 * with components that were using useThemeMode.
 *
 * Note: The actual theme management is now centralized in ThemeContext.tsx
 */
export const useThemeMode = () => {
  // Simply return the theme context values
  return useTheme();
};
