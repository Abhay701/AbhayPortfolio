'use client';
import { useState, useEffect, useCallback } from 'react';

export type GuideState = 'hero-guide' | 'project-guide' | 'walkthrough-guide' | 'dismissed' | 'completed';

export function useNavigationGuide() {
  const [state, setState] = useState<GuideState>('dismissed');
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  // Initialize guide on every fresh load/refresh, respecting current route and session
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const path = window.location.pathname;
    const isHomePage = path === '/' || path === '';
    const searchParams = new URLSearchParams(window.location.search);
    const hasGuideQuery = searchParams.get('guide') === 'walkthrough';

    if (isHomePage) {
      // On every visit or refresh to home, restart guide flow at Step 1
      setState('hero-guide');
      sessionStorage.setItem('portfolio-guide-state', 'hero-guide');
    } else if (path.startsWith('/projects/')) {
      const stored = sessionStorage.getItem('portfolio-guide-state');
      if (stored === 'walkthrough-guide' || hasGuideQuery) {
        setState('walkthrough-guide');
        sessionStorage.setItem('portfolio-guide-state', 'walkthrough-guide');
      } else {
        setState('dismissed');
      }
    }
  }, []);

  const dismissGuide = useCallback(() => {
    setState('dismissed');
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('portfolio-guide-state', 'dismissed');
    }
  }, []);

  const completeStepOne = useCallback(() => {
    if (state === 'hero-guide') {
      setIsAutoScrolling(true);
      setState('project-guide');
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('portfolio-guide-state', 'project-guide');
      }
      // Reset auto-scroll flag after scroll should be finished
      setTimeout(() => setIsAutoScrolling(false), 2000);
    }
  }, [state]);

  const advanceToWalkthrough = useCallback(() => {
    setState('walkthrough-guide');
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('portfolio-guide-state', 'walkthrough-guide');
    }
  }, []);

  const completeGuide = useCallback(() => {
    setState('completed');
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('portfolio-guide-state', 'completed');
    }
  }, []);

  // Global dismissal logic
  useEffect(() => {
    if (state === 'dismissed' || state === 'completed') return;

    const handleInteraction = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // If clicking something that isn't our guided targets, dismiss
      const isHeroBtn = target.closest('[data-guide="hero-btn"]');
      const isProjectBtn = target.closest('[data-guide="project-btn"]');
      const isWalkthroughBtn = target.closest('[data-guide="walkthrough-btn"]');
      const isScrollIndicator = target.closest('[data-guide="walkthrough-scroll-indicator"]');

      if (state === 'hero-guide' && !isHeroBtn) {
        dismissGuide();
      } else if (state === 'project-guide' && !isProjectBtn) {
        dismissGuide();
      } else if (state === 'walkthrough-guide' && !isWalkthroughBtn && !isScrollIndicator) {
        dismissGuide();
      }
    };

    const handleScroll = () => {
      // In walkthrough-guide on project page, scrolling down towards the walkthrough button is expected
      if (state === 'walkthrough-guide') {
        return;
      }
      // Dismiss only if user is scrolling manually in hero or project step
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
    advanceToWalkthrough,
    completeGuide,
    dismissGuide,
    setIsAutoScrolling
  };
}
