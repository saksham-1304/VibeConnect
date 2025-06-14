import LoadingSpinner from "./ui/LoadingSpinner";
import { useThemeStore } from "../store/useThemeStore";

const PageLoader = () => {
  const { isDarkMode } = useThemeStore();
  
  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 ${isDarkMode ? 'dark' : ''}`}>
      <div className="text-center">
        <LoadingSpinner size="xl" className="text-primary-500 mx-auto mb-4" />
        <p className="text-neutral-600 dark:text-neutral-300 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;