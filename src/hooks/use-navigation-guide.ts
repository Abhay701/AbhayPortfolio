'use client';
import { useState, useEffect, useCallback } from 'react';

export type GuideState = 'hero-guide' | 'project-guide' | 'dismissed' | 'completed';

export function useNavigationGuide() {
  const [state, setState] = useState<GuideState>('dismissed');
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  // Initialize and handle visit limit
  useEffect(() => {
    const VISIT_LIMIT = 2;
    const STORAGE_KEY = 'portfolio-guide-visits';
    const SESSION_KEY = 'portfolio-guide-session-active';

    try {
      const visits = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
      const isSessionActive = sessionStorage.getItem(SESSION_KEY);

      if (visits < VISIT_LIMIT) {
        if (!isSessionActive) {
          const newVisits = visits + 1;
          localStorage.setItem(STORAGE_KEY, newVisits.toString());
          sessionStorage.setItem(SESSION_KEY, 'true');
        }
        setState('hero-guide');
      }
    } catch (e) {
      console.error('Failed to handle guide storage', e);
    }
  }, []);

  const dismissGuide = useCallback(() => {
    setState('dismissed');
  }, []);

  const completeStepOne = useCallback(() => {
    if (state === 'hero-guide') {
      setIsAutoScrolling(true);
      setState('project-guide');
      // Reset auto-scroll flag after scroll should be finished
      setTimeout(() => setIsAutoScrolling(false), 2000);
    }
  }, [state]);

  const completeGuide = useCallback(() => {
    setState('completed');
  }, []);

  // Global dismissal logic
  useEffect(() => {
    if (state === 'dismissed' || state === 'completed') return;

    const handleInteraction = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // If clicking something that isn't our guided targets, dismiss
      const isHeroBtn = target.closest('[data-guide="hero-btn"]');
      const isProjectBtn = target.closest('[data-guide="project-btn"]');

      if (state === 'hero-guide' && !isHeroBtn) {
        dismissGuide();
      } else if (state === 'project-guide' && !isProjectBtn) {
        dismissGuide();
      }
    };

    const handleScroll = () => {
      // Dismiss only if user is scrolling manually
      if (!isAutoScrolling) {
        dismissGuide();
      }
    };

    window.addEventListener('mousedown', handleInteraction);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [state, isAutoScrolling, dismissGuide]);

  return {
    state,
    completeStepOne,
    completeGuide,
    dismissGuide
  };
}
