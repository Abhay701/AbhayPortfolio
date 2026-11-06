'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, type Theme } from '@/providers/theme-provider';
import { cn } from '@/lib/utils';

interface NavigationIndicatorProps {
  targetSelector: string;
  isWalkthrough?: boolean;
}

type PointerPlacement = 'left' | 'right' | 'top' | 'bottom';

interface Coords {
  x: number;
  y: number;
  placement: PointerPlacement;
}

const themeEmojiColors: Record<Theme, string> = {
  midnight: '#3b82f6',
  sunset: '#f97316',
  ocean: '#06b6d4',
  light: '#7c3aed',
  cyberpunk: '#39FF14',
};

export function NavigationIndicator({ targetSelector, isWalkthrough = false }: NavigationIndicatorProps) {
  const [mounted, setMounted] = useState(false);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [coords, setCoords] = useState<Coords | null>(null);
  const [isTargetInView, setIsTargetInView] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Locate the target DOM element
  useEffect(() => {
    if (!mounted) return;

    let attempts = 0;
    const findElement = () => {
      const el = document.querySelector(targetSelector) as HTMLElement | null;
      if (el) {
        setTargetElement(el);
      } else if (attempts < 20) {
        attempts++;
        animFrameRef.current = requestAnimationFrame(findElement);
      }
    };

    findElement();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [mounted, targetSelector]);

  // Calculate coordinates and optimal pointing direction
  const updatePosition = useCallback(() => {
    if (!targetElement) return;

    const rect = targetElement.getBoundingClientRect();

    // Fix: If element is collapsed or at 0,0 (often during back navigation transitions)
    if ((rect.width === 0 && rect.height === 0) || (rect.top <= 0 && rect.left <= 0)) {
      setCoords(null);
      return;
    }

    const vpWidth = window.innerWidth;
    const vpHeight = window.innerHeight;

    // Determine if target element is sufficiently in the viewport
    const inView = 
      rect.bottom > 80 && 
      rect.top < vpHeight - 80 && 
      rect.right > 0 && 
      rect.left < vpWidth;

    setIsTargetInView(inView);

    // If it's a walkthrough guide and target is below viewport, the scroll pill handles it
    if (isWalkthrough && !inView && rect.top >= vpHeight - 80) {
      setCoords(null);
      return;
    }

    const pointerW = vpWidth < 768 ? 36 : 44;
    const pointerH = vpWidth < 768 ? 36 : 44;
    const gap = vpWidth < 768 ? 8 : 12;

    const spaceLeft = rect.left;
    const spaceRight = vpWidth - rect.right;
    const spaceTop = rect.top;
    const spaceBottom = vpHeight - rect.bottom;

    let placement: PointerPlacement = 'left';
    const isTargetButton = targetSelector.includes('hero-btn') || targetSelector.includes('project-btn');

    // Intelligent responsive placement decision
    if (vpWidth >= 768) {
      if (spaceLeft >= pointerW + gap + 16) {
        placement = 'left';
      } else if (spaceRight >= pointerW + gap + 16) {
        placement = 'right';
      } else if (spaceTop >= pointerH + gap + 16) {
        placement = 'top';
      } else {
        placement = 'bottom';
      }
    } else {
      // Mobile Logic
      if (isTargetButton) {
        // Force top placement for main buttons as requested
        placement = 'top';
      } else {
        // Mobile Logic for others: Aggressively prefer side placement to avoid vertical overlap with button text
        if (spaceLeft >= 30) {
          placement = 'left';
        } else if (spaceRight >= 30) {
          placement = 'right';
        } else if (spaceTop >= 50) {
          placement = 'top';
        } else {
          placement = 'bottom';
        }
      }
    }

    let x = 0;
    let y = 0;

    if (placement === 'left') {
      x = rect.left - pointerW - gap;
      y = rect.top + (rect.height - pointerH) / 2;
    } else if (placement === 'right') {
      x = rect.right + gap;
      y = rect.top + (rect.height - pointerH) / 2;
    } else if (placement === 'top') {
      // Corner alignment for buttons on mobile as requested
      if (vpWidth < 768 && isTargetButton) {
        x = rect.left;
      } else {
        x = rect.left + (rect.width - pointerW) / 2;
      }
      y = rect.top - pointerH - gap;
    } else {
      x = rect.left + (rect.width - pointerW) / 2;
      y = rect.bottom + gap;
    }

    // Guard against popping up near navbar (AK Logo area) when target is likely off-screen or not ready
    if (y < 80 && !isWalkthrough) {
      setCoords(null);
      return;
    }

    // Viewport clamping
    x = Math.max(8, Math.min(x, vpWidth - pointerW - 8));
    y = Math.max(8, Math.min(y, vpHeight - pointerH - 8));

    setCoords(prev => {
      if (prev && Math.abs(prev.x - x) < 1 && Math.abs(prev.y - y) < 1 && prev.placement === placement) {
        return prev;
      }
      return { x, y, placement };
    });
  }, [targetElement, isWalkthrough, targetSelector]);

  // Recalculate on scroll, resize, and orientation change with RAF throttling
  useEffect(() => {
    if (!targetElement) return;

    let rafId: number | null = null;
    const throttledUpdate = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updatePosition();
        rafId = null;
      });
    };

    updatePosition();

    let startTime = Date.now();
    const trackInterval = setInterval(() => {
      updatePosition();
      if (Date.now() - startTime > 1500) {
        clearInterval(trackInterval);
      }
    }, 100);

    window.addEventListener('resize', throttledUpdate, { passive: true });
    window.addEventListener('scroll', throttledUpdate, { passive: true });
    window.addEventListener('orientationchange', throttledUpdate, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      clearInterval(trackInterval);
      window.removeEventListener('resize', throttledUpdate);
      window.removeEventListener('scroll', throttledUpdate);
      window.removeEventListener('orientationchange', throttledUpdate);
    };
  }, [targetElement, updatePosition]);

  const handleScrollToTarget = () => {
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handlePointerClick = () => {
    if (targetElement) {
      targetElement.click();
    }
  };

  // Ensure document and document.body exist before calling createPortal
  if (!mounted || typeof document === 'undefined' || !document.body) return null;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isTargetButton = targetSelector.includes('hero-btn') || targetSelector.includes('project-btn');
  const emoji = (isMobile && isTargetButton) ? '👇' : '👉';

  return createPortal(
    <>
      {/* 1. Walkthrough Scroll Guidance - Optimized for Mobile */}
      <AnimatePresence>
        {isWalkthrough && !isTargetInView && targetElement && (
          <motion.button
            data-guide="walkthrough-scroll-indicator"
            onClick={handleScrollToTarget}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "fixed z-[110] glass rounded-full border border-primary/50 bg-card/95 shadow-2xl flex items-center gap-2 md:gap-3 text-foreground cursor-pointer hover:border-primary transition-all group",
              "bottom-6 right-4 left-auto translate-x-0", // Mobile: Compact, bottom-right
              "md:left-1/2 md:right-auto md:bottom-8 md:-translate-x-1/2", // Desktop: Centered
              "px-3 py-2 md:px-6 md:py-3.5", // Responsive padding
              "text-[10px] sm:text-xs md:text-base font-bold" // Responsive text
            )}
            aria-label="Scroll to Start Product Walkthrough"
          >
            <motion.span 
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
              className="text-lg md:text-2xl"
              style={{ color: themeEmojiColors[theme] }}
            >
              👇
            </motion.span>
            <span>Scroll to Walkthrough</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 2. Theme-Colored Pointer - Decoupled GPU Transform to eliminate scroll jitter */}
      <AnimatePresence>
        {coords && (!isWalkthrough || isTargetInView) && (
          <div
            onClick={handlePointerClick}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,
              width: '44px',
              height: '44px',
              willChange: 'transform',
            }}
            className="z-[110] cursor-pointer select-none flex items-center justify-center pointer-events-auto"
            aria-hidden="true"
            title="Click target"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                ...(coords.placement === 'left' && { x: [0, 6, 0] }),
                ...(coords.placement === 'right' && { x: [0, -6, 0] }),
                ...(coords.placement === 'top' && { y: [0, 6, 0] }),
                ...(coords.placement === 'bottom' && { y: [0, -6, 0] }),
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                ...(coords.placement === 'left' || coords.placement === 'right' ? {
                  x: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' }
                } : {
                  y: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' }
                }),
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 }
              }}
              className="w-full h-full flex items-center justify-center"
            >
              <span 
                className={cn(
                  "text-3xl md:text-4xl transition-transform duration-300 block select-none",
                  (emoji === '👉') && coords.placement === 'left' && 'rotate-0',
                  (emoji === '👉') && coords.placement === 'right' && 'rotate-180',
                  (emoji === '👉') && coords.placement === 'top' && 'rotate-90',
                  (emoji === '👉') && coords.placement === 'bottom' && '-rotate-90',
                  (emoji === '👇') && 'rotate-0'
                )}
                style={{ 
                  filter: `drop-shadow(0 0 8px ${themeEmojiColors[theme]})`
                }}
              >
                {emoji}
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
