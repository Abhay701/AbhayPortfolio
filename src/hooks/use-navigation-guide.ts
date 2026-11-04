'use client';
import { useState, useEffect, useCallback } from 'react';

export type GuideState = 'hero-guide' | 'project-guide' | 'dismissed' | 'completed';

export function useNavigationGuide() {
  const [state, setState] = useState<GuideState>('dismissed');
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  // Initialize guide on every fresh load/refresh
  useEffect(() => {
    setState('hero-guide');
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
