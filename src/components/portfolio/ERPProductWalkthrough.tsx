'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Maximize2, 
  QrCode, 
  Smartphone, 
  CheckCircle2, 
  X
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
  // Requirement: Walkthrough must start playing automatically
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const progressTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      if (e.key === ' ') { e.preventDefault(); setIsPlaying(!isPlaying); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onClose, isPlaying]);

  if (!isMounted) return null;

  const currentScreenshot = screenshots[currentIndex];
  const isQRChapter = currentScreenshot?.chapter?.toLowerCase().includes('qr-based');

  if (!currentScreenshot) return null;

  return createPortal(
    <div className={cn(
      "fixed inset-0 z-[9999] bg-background/95 backdrop-blur-xl flex flex-col transition-all duration-500 overflow-y-auto custom-scrollbar",
      isFullScreen ? "p-0" : "p-4 md:p-8"
    )}>
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-[110] w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/80 hover:text-primary transition-all cursor-pointer shadow-lg"
        aria-label="Close image preview"
      >
        <X size={24} />
      </button>

      {/* Header Controls */}
      <div className="relative z-20 flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 px-2 md:px-4 pr-14 md:pr-14 shrink-0">
        <div className="hidden md:flex flex-col mb-4 md:mb-0">
          <span className="text-primary font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-1">
            {currentScreenshot.chapter}
          </span>
          <h2 className="text-lg md:text-2xl font-bold flex items-center gap-2 md:gap-3">
            <span className="text-muted-foreground tabular-nums text-sm md:text-2xl">{(currentIndex + 1).toString().padStart(2, '0')}</span>
            <span className="truncate max-w-[200px] xs:max-w-none">{currentScreenshot.title}</span>
          </h2>
        </div>

        <div className="flex items-center gap-2 md:gap-4 ml-0 md:ml-auto">
          <div className="flex items-center gap-1 md:gap-2 bg-white/5 p-1 rounded-lg md:rounded-xl border border-white/10">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 md:w-10 md:h-10 rounded-md md:rounded-lg flex items-center justify-center hover:bg-white/10 text-primary transition-all"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="fill-current" />}
            </button>
            <button 
              onClick={() => { setCurrentIndex(0); setIsPlaying(false); }}
              className="w-8 h-8 md:w-10 md:h-10 rounded-md md:rounded-lg flex items-center justify-center hover:bg-white/10 text-muted-foreground transition-all"
            >
              <RotateCcw size={16} />
            </button>
            <div className="w-[1px] h-4 bg-white/10 mx-0.5 md:mx-1" />
            <button 
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="w-8 h-8 md:w-10 md:h-10 rounded-md md:rounded-lg flex items-center justify-center hover:bg-white/10 text-muted-foreground transition-all"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex flex-col lg:flex-row gap-4 md:gap-8 min-h-0">
        {/* Left: Interactive Visualizer */}
        <div className="flex-1 relative glass rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 flex items-center justify-center bg-black/40 group min-h-[300px] md:min-h-0 aspect-video md:aspect-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreenshot.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center p-2 md:p-8"
            >
              <Image 
                src={currentScreenshot.path} 
                alt={currentScreenshot.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 70vw"
                className="object-contain rounded-xl md:rounded-2xl shadow-2xl"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button 
            onClick={(e) => { e.stopPropagation(); setIsPlaying(false); handlePrev(); }}
            className="absolute left-2 md:left-6 w-10 h-10 md:w-14 md:h-14 rounded-full glass flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all hover:text-primary z-30"
          >
            <ChevronLeft size={20} className="md:w-7 md:h-7" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsPlaying(false); handleNext(); }}
            className="absolute right-2 md:right-6 w-10 h-10 md:w-14 md:h-14 rounded-full glass flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all hover:text-primary z-30"
          >
            <ChevronRight size={20} className="md:w-7 md:h-7" />
          </button>
        </div>

        {/* Right: Description & Workflow Panel */}
        <div className="w-full lg:w-[400px] flex flex-col gap-4 md:gap-6 shrink-0 lg:h-full pb-8 lg:pb-0">
          <div className="glass p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border-white/10 flex-1 flex flex-col">
            
            {/* Mobile-only Header Info: Requirement: Category -> Title below image */}
            <div className="flex md:hidden flex-col mb-6">
              <span className="text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-1">
                {currentScreenshot.chapter}
              </span>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <span className="text-muted-foreground tabular-nums text-sm">{(currentIndex + 1).toString().padStart(2, '0')}</span>
                {currentScreenshot.title}
              </h3>
            </div>

            <h3 className="text-base md:text-xl font-bold mb-3 md:mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Workflow Insight
            </h3>
            <p className="text-xs md:text-base text-muted-foreground leading-relaxed mb-6 md:mb-8">
              {currentScreenshot.description}
            </p>

            {/* Special Workflow Visualization */}
            {isQRChapter && (
              <div className="space-y-3 md:space-y-4 pt-4 md:pt-6 border-t border-white/10">
                <h4 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-primary mb-2 md:mb-6">Attendance Workflow</h4>
                {[
                  { icon: QrCode, text: "Employee Identity Verification" },
                  { icon: Smartphone, text: "Gateman QR Scanning" },
                  { icon: CheckCircle2, text: "Automated Punch-In/Out" }
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 md:gap-4 group">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl glass flex items-center justify-center group-hover:text-primary transition-colors shrink-0">
                      <step.icon size={16} className="md:w-5 md:h-5" />
                    </div>
                    <span className="text-[11px] md:text-sm font-medium text-muted-foreground group-hover:text-foreground">{step.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Summary Card */}
          <div className="glass p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] border-primary/20 bg-primary/5">
             <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-primary mb-2 md:mb-4">
                <span>Progress</span>
                <span>{Math.round(((currentIndex + 1) / screenshots.length) * 100)}%</span>
             </div>
             <div className="w-full h-1 md:h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIndex + 1) / screenshots.length) * 100}%` }}
                />
             </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
