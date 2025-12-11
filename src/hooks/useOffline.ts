import { useState, useEffect, useCallback } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';
import type { DownloadStatus } from '../types';

export function useOffline() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [downloads, setDownloads] = useState<DownloadStatus[]>(() =>
    storage.get(STORAGE_KEYS.DOWNLOADS, [])
  );

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Persist downloads to localStorage
  useEffect(() => {
    storage.set(STORAGE_KEYS.DOWNLOADS, downloads);
  }, [downloads]);

  const isIssueDownloaded = useCallback(
    (issueId: string) =>
      downloads.find((d) => d.issueId === issueId)?.downloaded ?? false,
    [downloads]
  );

  const getDownloadStatus = useCallback(
    (issueId: string) => downloads.find((d) => d.issueId === issueId),
    [downloads]
  );

  const markIssueDownloaded = useCallback(
    (issueId: string, sizeBytes?: number) => {
      setDownloads((prev) => {
        const existing = prev.find((d) => d.issueId === issueId);
        const newStatus: DownloadStatus = {
          issueId,
          downloaded: true,
          downloadedAt: new Date().toISOString(),
          sizeBytes,
        };

        if (existing) {
          return prev.map((d) => (d.issueId === issueId ? newStatus : d));
        }
        return [...prev, newStatus];
      });
    },
    []
  );

  const removeDownload = useCallback((issueId: string) => {
    setDownloads((prev) => prev.filter((d) => d.issueId !== issueId));
    // TODO: Also clear from service worker cache
  }, []);

  const getTotalDownloadSize = useCallback(() => {
    return downloads.reduce((total, d) => total + (d.sizeBytes ?? 0), 0);
  }, [downloads]);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  return {
    isOnline,
    downloads,
    isIssueDownloaded,
    getDownloadStatus,
    markIssueDownloaded,
    removeDownload,
    getTotalDownloadSize,
    formatBytes,
  };
}
