export type LogLevel = 'verbose' | 'info' | 'error' | 'none';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: Exclude<LogLevel, 'none'>;
  action: string;
  details?: string;
  userAgent: string;
  page: string;
}

export interface LogStore {
  entries: LogEntry[];
  maxEntries: number;
}
