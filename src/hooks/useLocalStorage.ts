import { useState } from 'react';
import { getItem, setItem } from '@/services/storageService';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (val: T) => void] {
  const [value, setValueState] = useState<T>(() => getItem(key, initialValue));

  const setValue = (val: T) => {
    setValueState(val);
    setItem(key, val);
  };

  return [value, setValue];
}
