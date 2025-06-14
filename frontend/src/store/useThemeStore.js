import { create } from "zustand";

export const useThemeStore = create((set) => ({
  isDarkMode: localStorage.getItem("streamify-dark-mode") === "true" || false,
  toggleDarkMode: () => set((state) => {
    const newMode = !state.isDarkMode;
    localStorage.setItem("streamify-dark-mode", newMode.toString());
    
    // Apply theme to document
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    return { isDarkMode: newMode };
  }),
  initializeTheme: () => set((state) => {
    // Initialize theme on app load
    if (state.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return state;
  }),
}));