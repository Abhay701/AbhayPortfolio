'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  ImageIcon, 
  Maximize2, 
  X, 
  Plus, 
  Minus, 
  RotateCcw 
} from 'lucide-react';
import { Screenshot } from '@/lib/projects-data';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ProjectGalleryProps {
  screenshots: Screenshot[];
  categories: string[];
}

export function ProjectGallery({ screenshots, categories }: ProjectGalleryProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isMounted, setIsMounted] = useState(false);
  
  // Mobile Zoom State
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastPinchDist, setLastPinchDist] = useState<number | null>(null);

  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredScreenshots = activeCategory === "All" 
    ? screenshots 
    : screenshots.filter(s => s.category === activeCategory);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setLastPinchDist(null);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedImageIdx === null) return;
    resetZoom();
    setSelectedImageIdx((selectedImageIdx + 1) % filteredScreenshots.length);
  }, [selectedImageIdx, filteredScreenshots.length, resetZoom]);

  const handlePrev = useCallback(() => {
    if (selectedImageIdx === null) return;
    resetZoom();
    setSelectedImageIdx((selectedImageIdx - 1 + filteredScreenshots.length) % filteredScreenshots.length);
  }, [selectedImageIdx, filteredScreenshots.length, resetZoom]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIdx === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') {
        resetZoom();
        setSelectedImageIdx(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIdx, handleNext, handlePrev, resetZoom]);

  // Mobile Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.innerWidth >= 768) return; // Only mobile

    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      setLastPinchDist(dist);
    } else if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].pageX - position.x,
        y: e.touches[0].pageY - position.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (window.innerWidth >= 768) return;

    if (e.touches.length === 2 && lastPinchDist !== null) {
      e.preventDefault();
      const dist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      const delta = dist / lastPinchDist;
      setScale(prev => Math.min(4, Math.max(1, prev * delta)));
      setLastPinchDist(dist);
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      e.preventDefault();
      setPosition({
        x: e.touches[0].pageX - dragStart.x,
        y: e.touches[0].pageY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setLastPinchDist(null);
  };

  const zoomIn = () => setScale(prev => Math.min(4, prev + 0.5));
  const zoomOut = () => setScale(prev => Math.max(1, prev - 0.5));

  return (
    <section className="py-12">
      <h3 className="text-xl md:text-2xl font-bold mb-8 flex items-center gap-3">
        <span className="w-1.5 h-8 bg-primary rounded-full" />
        Application Screenshot Gallery
      </h3>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["All", ...categories].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-medium transition-all border",
              activeCategory === cat 
                ? "bg-primary text-primary-foreground border-primary" 
                : "glass border-border text-foreground hover:border-primary/50"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredScreenshots.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredScreenshots.map((shot, idx) => (
            <motion.div
              key={shot.id}
              layoutId={shot.id}
              onClick={() => setSelectedImageIdx(idx)}
              className="group relative aspect-video rounded-2xl overflow-hidden glass border border-border shadow-xs cursor-pointer"
            >
              <Image 
                src={shot.path} 
                alt={shot.title} 
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                <Maximize2 className="text-primary mb-2" size={20} />
                <p className="font-bold text-xs md:text-sm text-white">{shot.title}</p>
                <p className="text-[9px] md:text-[10px] text-gray-300 mt-1">{shot.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-16 md:py-20 glass rounded-[2rem] md:rounded-[2.5rem] border border-dashed border-border flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
            <ImageIcon className="text-primary/50" size={32} />
          </div>
          <h4 className="text-lg md:text-xl font-bold mb-2">Screenshots coming soon</h4>
          <p className="text-muted-foreground text-xs md:text-sm max-w-xs px-4">
            Currently preparing production screens for {activeCategory === "All" ? "all modules" : activeCategory}.
          </p>
        </div>
      )}

      {/* Lightbox - Rendered through Portal */}
      {isMounted && createPortal(
        <AnimatePresence>
          {selectedImageIdx !== null && filteredScreenshots[selectedImageIdx] && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 xs:p-4 md:p-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => { resetZoom(); setSelectedImageIdx(null); }}
                className="absolute inset-0 z-0 bg-background/95 backdrop-blur-xl cursor-pointer"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative z-10 pointer-events-auto w-full max-w-6xl h-full flex flex-col rounded-2xl md:rounded-3xl overflow-hidden glass border border-border shadow-2xl bg-card"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    resetZoom();
                    setSelectedImageIdx(null);
                  }}
                  className="absolute top-4 right-4 z-[110] w-10 h-10 rounded-full bg-card/90 border border-border flex items-center justify-center text-foreground hover:bg-card hover:text-primary transition-all cursor-pointer shadow-lg"
                  aria-label="Close image preview"
                >
                  <X size={24} />
                </button>

                {/* Mobile Zoom Controls - Only visible on small screens */}
                <div className="absolute top-4 left-4 z-[110] flex items-center gap-2 md:hidden">
                  <div className="flex items-center gap-1 glass p-1 rounded-xl border border-border bg-card/90 shadow-lg">
                    <button 
                      onClick={zoomOut}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground hover:text-primary active:bg-muted transition-all"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="text-[10px] font-bold min-w-[30px] text-center text-primary">
                      {Math.round(scale * 100)}%
                    </span>
                    <button 
                      onClick={zoomIn}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground hover:text-primary active:bg-muted transition-all"
                    >
                      <Plus size={18} />
                    </button>
                    <div className="w-[1px] h-4 bg-border mx-1" />
                    <button 
                      onClick={resetZoom}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground hover:text-primary active:bg-muted transition-all"
                    >
                      <RotateCcw size={16} />
                    </button>
                  </div>
                </div>

                {/* Image Area - Native dashboard canvas */}
                <div 
                  ref={viewportRef}
                  className="relative flex-1 min-h-0 w-full flex items-center justify-center p-2 md:p-4 overflow-hidden bg-[#0d1117]"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div 
                    className="relative w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
                    style={{ 
                      transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                      cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                    }}
                  >
                    <Image
                      src={filteredScreenshots[selectedImageIdx].path}
                      alt={filteredScreenshots[selectedImageIdx].title}
                      fill
                      sizes="100vw"
                      className="object-contain pointer-events-none"
                      priority
                    />
                  </div>

                  {/* Navigation Buttons */}
                  <div className="absolute inset-y-0 left-2 md:left-4 flex items-center z-20 pointer-events-none">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full glass border border-border flex items-center justify-center text-foreground hover:text-primary transition-all hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto shadow-lg"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                  </div>

                  <div className="absolute inset-y-0 right-2 md:right-4 flex items-center z-20 pointer-events-none">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleNext(); }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full glass border border-border flex items-center justify-center text-foreground hover:text-primary transition-all hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto shadow-lg"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>

                {/* Bottom Caption Area */}
                <div className="w-full p-4 md:p-8 bg-card/95 border-t border-border shrink-0 overflow-y-auto custom-scrollbar">
                  <p className="text-primary font-bold text-[10px] md:text-xs uppercase tracking-widest mb-1">
                    {filteredScreenshots[selectedImageIdx].category}
                  </p>
                  <h4 className="text-sm md:text-xl font-bold text-foreground mb-2">
                    {filteredScreenshots[selectedImageIdx].title}
                  </h4>
                  {filteredScreenshots[selectedImageIdx].description && (
                    <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed max-w-4xl">
                      {filteredScreenshots[selectedImageIdx].description}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
