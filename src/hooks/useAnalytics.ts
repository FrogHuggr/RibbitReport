import { useCallback } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';
import type { AnalyticsEvent } from '../types';

const MAX_EVENTS = 1000; // Limit stored events to prevent localStorage bloat

export function useAnalytics() {
  const trackEvent = useCallback(
    (
      event: AnalyticsEvent['event'],
      data: AnalyticsEvent['data'] = {}
    ) => {
      const events = storage.get<AnalyticsEvent[]>(STORAGE_KEYS.ANALYTICS, []);

      const newEvent: AnalyticsEvent = {
        timestamp: new Date().toISOString(),
        event,
        data,
      };

      // Keep only the most recent events
      const updatedEvents = [...events, newEvent].slice(-MAX_EVENTS);
      storage.set(STORAGE_KEYS.ANALYTICS, updatedEvents);
    },
    []
  );

  const getEvents = useCallback(() => {
    return storage.get<AnalyticsEvent[]>(STORAGE_KEYS.ANALYTICS, []);
  }, []);

  const exportAnalytics = useCallback(() => {
    const events = getEvents();
    const blob = new Blob([JSON.stringify(events, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ribbit-report-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [getEvents]);

  const clearAnalytics = useCallback(() => {
    storage.remove(STORAGE_KEYS.ANALYTICS);
  }, []);

  // Aggregate statistics
  const getStats = useCallback(() => {
    const events = getEvents();

    const articleViews = events.filter((e) => e.event === 'article_view').length;
    const articlesCompleted = events.filter(
      (e) => e.event === 'article_complete'
    ).length;
    const stampsEarned = events.filter((e) => e.event === 'stamp_earned').length;
    const quizzesCompleted = events.filter(
      (e) => e.event === 'quiz_completed'
    );
    const avgQuizScore =
      quizzesCompleted.length > 0
        ? quizzesCompleted.reduce(
            (sum, e) => sum + (e.data.quizScore ?? 0),
            0
          ) / quizzesCompleted.length
        : 0;

    return {
      articleViews,
      articlesCompleted,
      stampsEarned,
      quizzesCompleted: quizzesCompleted.length,
      avgQuizScore: Math.round(avgQuizScore),
      totalEvents: events.length,
    };
  }, [getEvents]);

  return {
    trackEvent,
    getEvents,
    exportAnalytics,
    clearAnalytics,
    getStats,
  };
}
