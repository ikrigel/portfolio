import type { LogLevel } from './logs';

export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ContactFormDraft {
  name: string;
  email: string;
  subject: string;
  message: string;
  savedAt: string;
}

export interface AppSettings {
  theme: ThemeMode;
  logLevel: LogLevel;
  animationsEnabled: boolean;
  emailNotifications: boolean;
  lastVisitedSection: string;
  contactFormData: ContactFormDraft | null;
}

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'auto',
  logLevel: 'info',
  animationsEnabled: true,
  emailNotifications: true,
  lastVisitedSection: 'hero',
  contactFormData: null,
};
