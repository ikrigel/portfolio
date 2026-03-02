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
  brightness: number; // 0 to 1, where 0 = darkest, 1 = brightest
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveAutoTheme(): 'light' | 'dark' {
  const hour = new Date().getHours();
  return hour < AUTO_THEME_MORNING_HOUR ? 'light' : 'dark';
}

function getThemeBrightness(): number {
  const hour = new Date().getHours();
  // Create a smooth brightness curve throughout the day:
  // 00:00 = 0 (darkest), 06:00 = 0.5, 12:00 = 1 (brightest), 18:00 = 0.5, 23:00 ≈ 0
  // Formula: 1 - |hour - 12| / 12
  return Math.max(0, 1 - Math.abs(hour - AUTO_THEME_MORNING_HOUR) / AUTO_THEME_MORNING_HOUR);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { settings, updateSettings } = useSettings();
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    if (settings.theme === 'auto') {
      return resolveAutoTheme();
    }
    return settings.theme;
  });
  const [brightness, setBrightness] = useState<number>(() => {
    return settings.theme === 'auto' ? getThemeBrightness() : 1;
  });

  const setThemeMode = (mode: ThemeMode) => {
    updateSettings({ theme: mode });
  };

  useEffect(() => {
    if (settings.theme !== 'auto') {
      setResolvedTheme(settings.theme);
      setBrightness(1);
      return;
    }

    const resolve = () => {
      setResolvedTheme(resolveAutoTheme());
      setBrightness(getThemeBrightness());
    };

    resolve();
    const interval = setInterval(resolve, AUTO_THEME_CHECK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [settings.theme]);

  const value: ThemeContextValue = {
    themeMode: settings.theme,
    resolvedTheme,
    brightness,
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
