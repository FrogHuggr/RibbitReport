import { useState, useCallback, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';
import type { Stamp } from '../types';

export function useStamps() {
  const [stamps, setStamps] = useState<Stamp[]>(() =>
    storage.get(STORAGE_KEYS.STAMPS, [])
  );

  // Persist stamps to localStorage whenever they change
  useEffect(() => {
    storage.set(STORAGE_KEYS.STAMPS, stamps);
  }, [stamps]);

  const addStamp = useCallback((stamp: Omit<Stamp, 'earnedAt'>) => {
    setStamps((prev) => {
      // Don't add duplicate stamps
      if (prev.some((s) => s.id === stamp.id)) {
        return prev;
      }
      return [
        ...prev,
        {
          ...stamp,
          earnedAt: new Date().toISOString(),
        },
      ];
    });
  }, []);

  const hasStamp = useCallback(
    (stampId: string) => stamps.some((s) => s.id === stampId),
    [stamps]
  );

  const getStampsByCountry = useCallback(() => {
    const byCountry: Record<string, Stamp[]> = {};
    stamps.forEach((stamp) => {
      if (!byCountry[stamp.country]) {
        byCountry[stamp.country] = [];
      }
      byCountry[stamp.country].push(stamp);
    });
    return byCountry;
  }, [stamps]);

  const totalStamps = stamps.length;

  const clearAllStamps = useCallback(() => {
    setStamps([]);
  }, []);

  return {
    stamps,
    addStamp,
    hasStamp,
    getStampsByCountry,
    totalStamps,
    clearAllStamps,
  };
}
