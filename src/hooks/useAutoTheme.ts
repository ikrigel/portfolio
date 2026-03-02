import { useState, useEffect } from 'react';
import { AUTO_THEME_CHECK_INTERVAL_MS, AUTO_THEME_MORNING_HOUR } from '@/utils/constants';

export function useAutoTheme(): 'light' | 'dark' {
  const [resolved, setResolved] = useState<'light' | 'dark'>(() => {
    const hour = new Date().getHours();
    return hour < AUTO_THEME_MORNING_HOUR ? 'light' : 'dark';
  });

  useEffect(() => {
    const check = () => {
      const hour = new Date().getHours();
      setResolved(hour < AUTO_THEME_MORNING_HOUR ? 'light' : 'dark');
    };

    check();
    const id = setInterval(check, AUTO_THEME_CHECK_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return resolved;
}
