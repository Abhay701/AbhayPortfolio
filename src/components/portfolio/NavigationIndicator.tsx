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

    const pointerW = 44;
    const pointerH = 44;
    const gap = 12;

    const spaceLeft = rect.left;
    const spaceRight = vpWidth - rect.right;
    const spaceTop = rect.top;
    const spaceBottom = vpHeight - rect.bottom;

    let placement: PointerPlacement = 'left';

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
      if (spaceLeft < pointerW + gap + 12 && spaceRight < pointerW + gap + 12) {
        if (spaceTop >= pointerH + gap + 12) {
          placement = 'top';
        } else {
          placement = 'bottom';
        }
      } else if (spaceLeft >= pointerW + gap + 12) {
        placement = 'left';
      } else {
        placement = 'right';
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
      x = rect.left + (rect.width - pointerW) / 2;
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

    setCoords({ x, y, placement });
  }, [targetElement, isWalkthrough]);

  // Recalculate on scroll, resize, and orientation change
  useEffect(() => {
    if (!targetElement) return;

    updatePosition();

    let startTime = Date.now();
    const trackInterval = setInterval(() => {
      updatePosition();
      if (Date.now() - startTime > 1500) {
        clearInterval(trackInterval);
      }
    }, 60);

    window.addEventListener('resize', updatePosition, { passive: true });
    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('orientationchange', updatePosition, { passive: true });

    return () => {
      clearInterval(trackInterval);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('orientationchange', updatePosition);
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

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <>
      {/* 1. Walkthrough Scroll Guidance */}
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
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] glass px-6 py-3.5 rounded-full border border-primary/50 bg-card/95 shadow-2xl flex items-center gap-3 text-sm md:text-base font-bold text-foreground cursor-pointer hover:border-primary transition-all group"
            aria-label="Scroll to Start Product Walkthrough"
          >
            <motion.span 
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
              className="text-2xl"
              style={{ color: themeEmojiColors[theme] }}
            >
              👇
            </motion.span>
            <span>Scroll to Product Walkthrough</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 2. Theme-Colored Pointer */}
      <AnimatePresence>
        {coords && (!isWalkthrough || isTargetInView) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              ...(coords.placement === 'left' && { x: [0, 8, 0] }),
              ...(coords.placement === 'right' && { x: [0, -8, 0] }),
              ...(coords.placement === 'top' && { y: [0, 8, 0] }),
              ...(coords.placement === 'bottom' && { y: [0, -8, 0] }),
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              ...(coords.placement === 'left' || coords.placement === 'right' ? {
                x: { repeat: Infinity, duration: 1.1, ease: 'easeInOut' }
              } : {
                y: { repeat: Infinity, duration: 1.1, ease: 'easeInOut' }
              }),
              opacity: { duration: 0.25 },
              scale: { duration: 0.25 }
            }}
            onClick={handlePointerClick}
            style={{
              position: 'fixed',
              left: `${coords.x}px`,
              top: `${coords.y}px`,
              width: '44px',
              height: '44px',
            }}
            className="z-[110] cursor-pointer select-none flex items-center justify-center transition-transform"
            aria-hidden="true"
            title="Click target"
          >
            <span 
              className={cn(
                "text-4xl transition-transform duration-300 block select-none",
                coords.placement === 'left' && 'rotate-0',
                coords.placement === 'right' && 'rotate-180',
                coords.placement === 'top' && 'rotate-90',
                coords.placement === 'bottom' && '-rotate-90'
              )}
              style={{ 
                filter: `drop-shadow(0 0 8px ${themeEmojiColors[theme]})`
              }}
            >
              👉
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
