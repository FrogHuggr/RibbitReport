import { useState, useCallback, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';
import type { ReadingProgress } from '../types';

export function useProgress() {
  const [progress, setProgress] = useState<ReadingProgress[]>(() =>
    storage.get(STORAGE_KEYS.PROGRESS, [])
  );

  // Persist progress to localStorage whenever it changes
  useEffect(() => {
    storage.set(STORAGE_KEYS.PROGRESS, progress);
  }, [progress]);

  const markArticleComplete = useCallback(
    (articleId: string, issueId: string) => {
      setProgress((prev) => {
        const existing = prev.find((p) => p.articleId === articleId);
        if (existing?.completed) {
          return prev;
        }

        const newProgress: ReadingProgress = {
          articleId,
          issueId,
          completed: true,
          completedAt: new Date().toISOString(),
        };

        if (existing) {
          return prev.map((p) =>
            p.articleId === articleId ? newProgress : p
          );
        }
        return [...prev, newProgress];
      });
    },
    []
  );

  const updatePageProgress = useCallback(
    (articleId: string, issueId: string, currentPage: number, totalPages: number) => {
      setProgress((prev) => {
        const existing = prev.find((p) => p.articleId === articleId);

        const newProgress: ReadingProgress = {
          articleId,
          issueId,
          completed: existing?.completed ?? false,
          completedAt: existing?.completedAt,
          currentPage,
          totalPages,
        };

        if (existing) {
          return prev.map((p) =>
            p.articleId === articleId ? newProgress : p
          );
        }
        return [...prev, newProgress];
      });
    },
    []
  );

  const isArticleComplete = useCallback(
    (articleId: string) => progress.find((p) => p.articleId === articleId)?.completed ?? false,
    [progress]
  );

  const getArticleProgress = useCallback(
    (articleId: string) => progress.find((p) => p.articleId === articleId),
    [progress]
  );

  const getIssueProgress = useCallback(
    (issueId: string, totalArticles: number) => {
      const issueProgress = progress.filter(
        (p) => p.issueId === issueId && p.completed
      );
      return {
        completed: issueProgress.length,
        total: totalArticles,
        percentage: totalArticles > 0
          ? Math.round((issueProgress.length / totalArticles) * 100)
          : 0,
      };
    },
    [progress]
  );

  const clearProgress = useCallback(() => {
    setProgress([]);
  }, []);

  return {
    progress,
    markArticleComplete,
    updatePageProgress,
    isArticleComplete,
    getArticleProgress,
    getIssueProgress,
    clearProgress,
  };
}
