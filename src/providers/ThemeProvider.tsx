import React, { createContext, useContext, useEffect } from 'react';
import { useColorScheme } from 'nativewind';
import { useAppStore, ThemeMode } from '@/stores/app.store';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Provider para gerenciar o tema da aplicação
 * Integra com NativeWind e persiste no MMKV via Zustand
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, setTheme } = useAppStore();
  const { setColorScheme, colorScheme } = useColorScheme();

  const isDark = theme === 'dark';

  useEffect(() => {
    setColorScheme(theme);
  }, [theme, setColorScheme]);

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
