import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import Button from './ui/Button';

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleDarkMode}
      className="p-2 rounded-full"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
      )}
    </Button>
  );
};

export default ThemeToggle;