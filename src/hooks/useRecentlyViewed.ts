import { useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'kospi200_recently_viewed';
const MAX_RECENT = 10;
const UPDATE_EVENT = 'kospi200_recently_viewed_update';

export const useRecentlyViewed = <T extends { code: string }>(stocks?: T[]) => {
  const [recentCodes, setRecentCodes] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const updateStateFromStorage = useCallback(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setRecentCodes(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    window.addEventListener(UPDATE_EVENT, updateStateFromStorage);
    window.addEventListener('storage', updateStateFromStorage);
    return () => {
      window.removeEventListener(UPDATE_EVENT, updateStateFromStorage);
      window.removeEventListener('storage', updateStateFromStorage);
    };
  }, [updateStateFromStorage]);

  const addRecentView = useCallback((code: string) => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const current: string[] = saved ? JSON.parse(saved) : [];

    // Remove if already exists
    const filtered = current.filter((c) => c !== code);
    // Add to front and limit to MAX_RECENT
    const newCodes = [code, ...filtered].slice(0, MAX_RECENT);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCodes));
    setRecentCodes(newCodes);

    // Dispatch event to notify other hook instances
    window.dispatchEvent(new Event(UPDATE_EVENT));
  }, []);

  const recentlyViewedStocks = useMemo(() => {
    if (!stocks) return [];
    return recentCodes
      .map((code) => stocks.find((s) => s.code === code))
      .filter((s): s is T => s !== undefined)
      .slice(0, 7);
  }, [stocks, recentCodes]);

  return {
    recentCodes,
    recentlyViewedStocks,
    addRecentView,
  };
};
