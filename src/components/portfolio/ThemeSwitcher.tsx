'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Palette, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, type Theme } from '@/providers/theme-provider';
import { cn } from '@/lib/utils';

const themes: { id: Theme; name: string; colors: string[] }[] = [
  { id: 'midnight', name: 'Midnight Dark', colors: ['#3b82f6', '#020617'] },
  { id: 'sunset', name: 'Sunset Glow', colors: ['#f97316', '#2d0a0a'] },
  { id: 'ocean', name: 'Ocean Breeze', colors: ['#06b6d4', '#050c14'] },
  { id: 'light', name: 'Minimal Light', colors: ['#3b82f6', '#f8fafc'] },
];

export function ThemeSwitcher() {
  const { theme: activeTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full glass border border-white/10 hover:border-primary/50 transition-all text-muted-foreground hover:text-primary"
        aria-label="Switch theme"
      >
        <Palette size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute right-0 top-full mt-4 w-56 bg-background/98 backdrop-blur-2xl p-2 rounded-2xl border border-white/10 shadow-2xl z-[110]"
          >
            <div className="px-3 py-2 border-b border-white/5 mb-2">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Select Theme</p>
            </div>
            <div className="space-y-1">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all hover:bg-primary/10 group",
                    activeTheme === t.id ? "bg-primary/20 text-primary" : "text-muted-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-1">
                      {t.colors.map((c, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 rounded-full border border-background shadow-sm"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{t.name}</span>
                  </div>
                  {activeTheme === t.id && <Check size={16} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
