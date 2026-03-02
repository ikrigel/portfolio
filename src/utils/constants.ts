export const STORAGE_PREFIX = 'portfolio_';

export const STORAGE_KEYS = {
  SETTINGS: `${STORAGE_PREFIX}settings`,
  LOGS: `${STORAGE_PREFIX}logs`,
  THEME: `${STORAGE_PREFIX}theme`,
  CONTACT_DRAFT: `${STORAGE_PREFIX}contact_draft`,
} as const;

export const MAX_LOG_ENTRIES = 1000;
export const AUTO_SAVE_INTERVAL_MS = 5000;
export const AUTO_THEME_CHECK_INTERVAL_MS = 5 * 60 * 1000;
export const AUTO_THEME_MORNING_HOUR = 12;

export const PERSONAL_INFO = {
  name: 'ikrigel',
  email: 'ikrigel@gmail.com',
  github: 'https://github.com/ikrigel',
  linkedin: 'https://www.linkedin.com/in/ikrigel',
  location: 'Petah Tiqva, EMEA',
} as const;

export const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
] as const;
