import type { LogEntry, LogLevel, LogStore } from '@/types';
import { MAX_LOG_ENTRIES } from '@/utils/constants';
import { getItem, setItem } from './storageService';

const LOGS_STORAGE_KEY = 'logs';

function loadStore(): LogStore {
  return getItem<LogStore>(LOGS_STORAGE_KEY, {
    entries: [],
    maxEntries: MAX_LOG_ENTRIES,
  });
}

function saveStore(store: LogStore): void {
  setItem(LOGS_STORAGE_KEY, store);
}

export function appendLog(
  level: Exclude<LogLevel, 'none'>,
  action: string,
  details?: string
): LogEntry {
  const entry: LogEntry = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    level,
    action,
    details,
    userAgent: navigator.userAgent,
    page: window.location.hash || '#hero',
  };

  const store = loadStore();
  store.entries.unshift(entry);
  if (store.entries.length > MAX_LOG_ENTRIES) {
    store.entries = store.entries.slice(0, MAX_LOG_ENTRIES);
  }
  saveStore(store);
  return entry;
}

export function getLogs(): LogEntry[] {
  return loadStore().entries;
}

export function clearLogs(): void {
  saveStore({ entries: [], maxEntries: MAX_LOG_ENTRIES });
}

export function exportLogsAsJSON(): void {
  const logs = getLogs();
  const blob = new Blob([JSON.stringify(logs, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `portfolio-logs-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function deleteLog(id: string): void {
  const store = loadStore();
  store.entries = store.entries.filter((entry) => entry.id !== id);
  saveStore(store);
}

export function exportLogAsJSON(id: string): void {
  const log = getLogs().find((entry) => entry.id === id);
  if (!log) return;

  const blob = new Blob([JSON.stringify(log, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `log-${log.timestamp.slice(0, 10)}-${log.id}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
