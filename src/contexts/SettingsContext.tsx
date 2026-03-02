import {
  createContext,
  useContext,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import type { AppSettings } from '@/types';
import { DEFAULT_SETTINGS } from '@/types/settings';
import { getItem, setItem } from '@/services/storageService';

interface SettingsContextValue {
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    return getItem('settings', DEFAULT_SETTINGS);
  });

  const updateSettings = (partial: Partial<AppSettings>) => {
    const updated = { ...settings, ...partial };
    setSettings(updated);
    setItem('settings', updated);
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    setItem('settings', DEFAULT_SETTINGS);
  };

  const value: SettingsContextValue = {
    settings,
    updateSettings,
    resetSettings,
  };

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}
