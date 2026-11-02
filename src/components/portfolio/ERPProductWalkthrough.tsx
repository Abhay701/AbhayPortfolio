'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  X, 
  Maximize2, 
  QrCode, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight,
  Shield
} from 'lucide-react';
import { Screenshot } from '@/lib/projects-data';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ERPProductWalkthroughProps {
  screenshots: Screenshot[];
  onClose: () => void;
}

const AUTOPLAY_INTERVAL = 5000;

export function ERPProductWalkthrough({ screenshots, onClose }: ERPProductWalkthroughProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const progressTimer = useRef<NodeJS.Timeout | null>(null);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  }, [screenshots.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  }, [screenshots.length]);

  useEffect(() => {
    if (isPlaying) {
      progressTimer.current = setInterval(handleNext, AUTOPLAY_INTERVAL);
    } else {
      if (progressTimer.current) clearInterval(progressTimer.current);
    }
    return () => {
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, [isPlaying, handleNext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { setIsPlaying(false); handleNext(); }
      if (e.key === 'ArrowLeft') { setIsPlaying(false); handlePrev(); }
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') { setIsPlaying(!isPlaying); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onClose, isPlaying]);

  const currentScreenshot = screenshots[currentIndex];
  const isQRChapter = currentScreenshot.chapter.includes('QR-Based');

  return (
    <div className={cn(
      "fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col transition-all duration-500",
      isFullScreen ? "p-0" : "p-4 md:p-8"
    )}>
      {/* Header Controls */}
      <div className="relative z-20 flex items-center justify-between mb-6 px-4">
        <div className="flex flex-col">
          <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-1">
            {currentScreenshot.chapter}
          </span>
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3">
            <span className="text-muted-foreground tabular-nums">{(currentIndex + 1).toString().padStart(2, '0')}</span>
            {currentScreenshot.title}
          </h2>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 text-primary transition-all"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} className="fill-current" />}
            </button>
            <button 
              onClick={() => { setCurrentIndex(0); setIsPlaying(false); }}
              className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all"
            >
              <RotateCcw size={18} />
            </button>
            <div className="w-[1px] h-4 bg-white/10 mx-1" />
            <button 
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all"
            >
              <Maximize2 size={18} />
            </button>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-primary transition-all"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex flex-col lg:flex-row gap-8 min-h-0">
        {/* Left: Interactive Visualizer */}
        <div className="flex-1 relative glass rounded-[2.5rem] overflow-hidden border border-white/10 flex items-center justify-center bg-black/40 group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreenshot.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -10 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
            >
              <Image 
                src={currentScreenshot.path} 
                alt={currentScreenshot.title}
                fill
                priority
                className="object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button 
            onClick={(e) => { e.stopPropagation(); setIsPlaying(false); handlePrev(); }}
            className="absolute left-6 w-14 h-14 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:text-primary z-30"
          >
            <ChevronLeft size={28} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsPlaying(false); handleNext(); }}
            className="absolute right-6 w-14 h-14 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:text-primary z-30"
          >
            <ChevronRight size={28} />
          </button>

          {/* Special QR Context Overlay */}
          {isQRChapter && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-6 left-6 z-40 hidden md:flex flex-col gap-3"
            >
              <div className="glass px-4 py-2 rounded-full border-primary/30 flex items-center gap-2">
                <Shield className="text-primary" size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Restricted Access Mode</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right: Description & Workflow Panel */}
        <div className="w-full lg:w-[400px] flex flex-col gap-6 shrink-0">
          <div className="glass p-8 rounded-[2.5rem] border-white/10 flex-1 overflow-y-auto custom-scrollbar">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Workflow Insight
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {currentScreenshot.description}
            </p>

            {/* QR Attendance Step-by-Step Visualization */}
            {isQRChapter && (
              <div className="space-y-4 pt-6 border-t border-white/10">
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Attendance Workflow</h4>
                {[
                  { icon: QrCode, text: "Employee Identity Verification" },
                  { icon: Smartphone, text: "Gateman QR Scanning" },
                  { icon: CheckCircle2, text: "Automated Punch-In/Out" }
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl glass flex items-center justify-center group-hover:text-primary transition-colors">
                      <step.icon size={18} />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">{step.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* General Workflow Steps */}
            {!isQRChapter && (
              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Operations Involved</div>
                {["Role-based permissions", "Real-time data sync", "Process automation"].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 size={14} className="text-primary" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Summary Card */}
          <div className="glass p-6 rounded-[2.5rem] border-primary/20 bg-primary/5">
             <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-primary mb-4">
                <span>Walkthrough Progress</span>
                <span>{Math.round(((currentIndex + 1) / screenshots.length) * 100)}%</span>
             </div>
             <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIndex + 1) / screenshots.length) * 100}%` }}
                />
             </div>
             {currentIndex === screenshots.length - 1 && (
               <button 
                 onClick={() => { setCurrentIndex(0); setIsPlaying(true); }}
                 className="w-full mt-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
               >
                 Restart Walkthrough <RotateCcw size={16} />
               </button>
             )}
          </div>
        </div>
      </div>

      {/* Progress Footer (Mobile View) */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 md:hidden">
        {screenshots.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrentIndex(i); setIsPlaying(false); }}
            className={cn(
              "h-1 transition-all rounded-full",
              i === currentIndex ? "w-8 bg-primary" : "w-2 bg-white/10"
            )}
          />
        ))}
      </div>
    </div>
  );
}