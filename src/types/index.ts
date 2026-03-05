export type { LogLevel, LogEntry, LogStore } from './logs';
export type { ThemeMode, ContactFormDraft, AppSettings } from './settings';
export { DEFAULT_SETTINGS } from './settings';

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: 'web' | 'automation' | 'ai' | 'tool';
}

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  description: string[];
  technologies: string[];
}
