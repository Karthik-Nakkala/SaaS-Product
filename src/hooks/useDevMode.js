import { useState, useCallback } from 'react';

export function useDevMode() {
  const [isDevMode, setIsDevMode] = useState(false);

  const toggleDevMode = useCallback(() => {
    setIsDevMode(prev => !prev);
  }, []);

  return { isDevMode, toggleDevMode };
}
