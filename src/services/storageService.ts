import { STORAGE_PREFIX } from '@/utils/constants';

export function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch {
    console.error('Failed to save to localStorage', key);
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  } catch {
    console.error('Failed to remove from localStorage', key);
  }
}

export function clearAll(): void {
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(STORAGE_PREFIX)) keysToRemove.push(key);
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
  } catch {
    console.error('Failed to clear all localStorage items');
  }
}
