
import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const { theme, setTheme, isDarkMode } = useTheme();
  const [isRotating, setIsRotating] = React.useState(false);

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    // Only animate if we're not on a reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      setIsRotating(true);
      // Use requestAnimationFrame for smoother animation
      requestAnimationFrame(() => {
        setTimeout(() => setIsRotating(false), 300); // Reduced from 500ms to 300ms
      });
    }

    setTheme(newTheme);

    // Show toast notification
    toast({
      title: "Theme Updated",
      description: `Theme set to ${newTheme[0].toUpperCase() + newTheme.slice(1)}`,
      duration: 1500, // Reduced from 2000ms to 1500ms
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "rounded-full focus:outline-none transition-all duration-300 hover:bg-secondary",
            isRotating && "theme-toggle-icon rotate"
          )}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn(
          "mt-2 w-40 z-50 backdrop-blur-lg rounded-xl animate-fade-in",
          "bg-background/90 dark:bg-background/90",
          "border border-border"
        )}
      >
        <DropdownMenuItem
          onClick={() => handleThemeChange("light")}
          className={cn(
            "flex items-center gap-2 cursor-pointer rounded-lg m-1 transition-all",
            theme === "light" ? "bg-secondary font-medium" : "hover:bg-muted"
          )}
        >
          <Sun className="h-4 w-4 text-amber-500" />
          <span>Light</span>
          {theme === "light" && <span className="ml-auto text-xs">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("dark")}
          className={cn(
            "flex items-center gap-2 cursor-pointer rounded-lg m-1 transition-all",
            theme === "dark" ? "bg-secondary font-medium" : "hover:bg-muted"
          )}
        >
          <Moon className="h-4 w-4 text-indigo-400" />
          <span>Dark</span>
          {theme === "dark" && <span className="ml-auto text-xs">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("system")}
          className={cn(
            "flex items-center gap-2 cursor-pointer rounded-lg m-1 transition-all",
            theme === "system" ? "bg-secondary font-medium" : "hover:bg-muted"
          )}
        >
          <Monitor className="h-4 w-4 text-muted-foreground" />
          <span>System</span>
          {theme === "system" && <span className="ml-auto text-xs">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
