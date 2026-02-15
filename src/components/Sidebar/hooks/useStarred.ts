import { useCallback, useEffect, useMemo, useState } from 'react';

export const useStarred = <T extends { code: string }>(stocks?: T[]) => {
  const [starredCodes, setStarredCodes] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('starred');
    if (saved) {
      try {
        setStarredCodes(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse starred codes', e);
      }
    }
  }, []);

  const toggleStar = useCallback((code: string) => {
    setStarredCodes((prev) => {
      const next = prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code];
      localStorage.setItem('starred', JSON.stringify(next));
      return next;
    });
  }, []);

  const isStarred = useCallback(
    (code: string) => {
      return starredCodes.includes(code);
    },
    [starredCodes],
  );

  const starredStocks = useMemo(() => {
    if (!stocks) return [];
    return starredCodes
      .map((code) => stocks.find((s) => s.code === code))
      .filter((s): s is T => s !== undefined);
  }, [stocks, starredCodes]);

  return { starredCodes, toggleStar, isStarred, starredStocks };
};
