import {
  createContext,
  useContext,
} from 'react';
import type { ReactNode } from 'react';
import type { LogEntry, LogLevel } from '@/types';
import { appendLog, getLogs, clearLogs, exportLogsAsJSON, deleteLog, exportLogAsJSON } from '@/services/logService';
import { getItem } from '@/services/storageService';
import { DEFAULT_SETTINGS } from '@/types/settings';

interface LoggerContextValue {
  log: (level: Exclude<LogLevel, 'none'>, action: string, details?: string) => void;
  getLogs: () => LogEntry[];
  clearLogs: () => void;
  exportLogs: () => void;
  deleteLog: (id: string) => void;
  exportLog: (id: string) => void;
  logLevel: LogLevel;
}

const LoggerContext = createContext<LoggerContextValue | null>(null);

const LEVEL_ORDER: LogLevel[] = ['verbose', 'info', 'error', 'none'];

function shouldLog(
  entryLevel: Exclude<LogLevel, 'none'>,
  settingLevel: LogLevel
): boolean {
  return LEVEL_ORDER.indexOf(entryLevel) >= LEVEL_ORDER.indexOf(settingLevel);
}

export function LoggerProvider({ children }: { children: ReactNode }) {
  const currentLogLevel = getItem('settings', DEFAULT_SETTINGS).logLevel;

  const log = (
    level: Exclude<LogLevel, 'none'>,
    action: string,
    details?: string
  ) => {
    if (shouldLog(level, currentLogLevel)) {
      appendLog(level, action, details);
    }
  };

  const value: LoggerContextValue = {
    log,
    getLogs,
    clearLogs,
    exportLogs: exportLogsAsJSON,
    deleteLog,
    exportLog: exportLogAsJSON,
    logLevel: currentLogLevel,
  };

  return (
    <LoggerContext.Provider value={value}>{children}</LoggerContext.Provider>
  );
}

export function useLogger(): LoggerContextValue {
  const context = useContext(LoggerContext);
  if (!context) {
    throw new Error('useLogger must be used within LoggerProvider');
  }
  return context;
}
