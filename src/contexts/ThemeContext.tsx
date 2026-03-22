import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import type { ThemeMode } from '@/types';
import { AUTO_THEME_CHECK_INTERVAL_MS } from '@/utils/constants';
import { useSettings } from './SettingsContext';

interface ThemeContextValue {
  themeMode: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  brightness: number; // 0 to 1, where 0 = darkest, 1 = brightest
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveAutoTheme(brightness: number): 'light' | 'dark' {
  // Switch to light theme when brightness > 0.5, otherwise stay dark
  return brightness > 0.5 ? 'light' : 'dark';
}

/**
 * Calculate darkness (0 = bright/noon, 1 = dark/midnight) using a smooth cosine curve
 * with power-based "lingering" effect controlled by strength.
 *
 * strength=0: Pure cosine, no lingering (quick day/night transitions)
 * strength=1: Heavy lingering (darkness persists through dawn/dusk)
 */
function getLingeringDarkness(date: Date, strength: number): number {
  const hour = date.getHours() + date.getMinutes() / 60;
  // Smooth cosine: 0 at noon, 1 at midnight
  const t = hour / 24;
  const rawDarkness = 0.5 * (1 + Math.cos(2 * Math.PI * t));
  // Power curve: exponent < 1 makes mid-values darker, "lingering" in darkness
  // exponent ranges from 1.0 (strength=0, no effect) to 0.2 (strength=1, heavy lingering)
  const exponent = 1 - strength * 0.8;
  return Math.pow(rawDarkness, exponent);
}

function getThemeBrightness(strength: number): number {
  return 1 - getLingeringDarkness(new Date(), strength);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { settings, updateSettings } = useSettings();
  const strength = settings.autoThemeStrength ?? 0.5;

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    if (settings.theme === 'auto') {
      const brightness = getThemeBrightness(strength);
      return resolveAutoTheme(brightness);
    }
    return settings.theme;
  });
  const [brightness, setBrightness] = useState<number>(() => {
    return settings.theme === 'auto' ? getThemeBrightness(strength) : 1;
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
      const newBrightness = getThemeBrightness(strength);
      setBrightness(newBrightness);
      setResolvedTheme(resolveAutoTheme(newBrightness));
    };

    resolve();
    const interval = setInterval(resolve, AUTO_THEME_CHECK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [settings.theme, strength]);

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
