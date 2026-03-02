import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import type { ThemeMode } from '@/types';
import { AUTO_THEME_CHECK_INTERVAL_MS, AUTO_THEME_MORNING_HOUR } from '@/utils/constants';
import { useSettings } from './SettingsContext';

interface ThemeContextValue {
  themeMode: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveAutoTheme(): 'light' | 'dark' {
  const hour = new Date().getHours();
  return hour < AUTO_THEME_MORNING_HOUR ? 'light' : 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { settings, updateSettings } = useSettings();
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    if (settings.theme === 'auto') {
      return resolveAutoTheme();
    }
    return settings.theme;
  });

  const setThemeMode = (mode: ThemeMode) => {
    updateSettings({ theme: mode });
  };

  useEffect(() => {
    if (settings.theme !== 'auto') {
      setResolvedTheme(settings.theme);
      return;
    }

    const resolve = () => {
      setResolvedTheme(resolveAutoTheme());
    };

    resolve();
    const interval = setInterval(resolve, AUTO_THEME_CHECK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [settings.theme]);

  const value: ThemeContextValue = {
    themeMode: settings.theme,
    resolvedTheme,
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
