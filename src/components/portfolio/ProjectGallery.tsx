'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ImageIcon, Maximize2, X } from 'lucide-react';
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredScreenshots = activeCategory === "All" 
    ? screenshots 
    : screenshots.filter(s => s.category === activeCategory);

  const handleNext = () => {
    if (selectedImageIdx === null) return;
    setSelectedImageIdx((selectedImageIdx + 1) % filteredScreenshots.length);
  };

  const handlePrev = () => {
    if (selectedImageIdx === null) return;
    setSelectedImageIdx((selectedImageIdx - 1 + filteredScreenshots.length) % filteredScreenshots.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIdx === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedImageIdx(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIdx, filteredScreenshots.length]);

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
                : "glass border-white/5 text-muted-foreground hover:border-primary/50"
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
              className="group relative aspect-video rounded-2xl overflow-hidden glass border border-white/5 cursor-pointer"
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
                <p className="font-bold text-xs md:text-sm">{shot.title}</p>
                <p className="text-[9px] md:text-[10px] text-muted-foreground mt-1">{shot.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-16 md:py-20 glass rounded-[2rem] md:rounded-[2.5rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center">
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
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 xs:p-6 md:p-10">
              {/* Background Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImageIdx(null)}
                className="absolute inset-0 z-0 bg-background/95 backdrop-blur-xl cursor-pointer"
              />

              {/* Main Lightbox Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative z-10 pointer-events-auto w-full max-w-6xl h-full flex flex-col rounded-2xl md:rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl bg-black/40"
                role="dialog"
                aria-modal="true"
                aria-label="Screenshot preview"
              >
                {/* Close Button - Stays inside the card top-right */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIdx(null);
                  }}
                  className="absolute top-4 right-4 z-[110] w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/80 hover:text-primary transition-all cursor-pointer pointer-events-auto shadow-lg"
                  aria-label="Close image preview"
                >
                  <X size={24} />
                </button>

                {/* Top Image Area */}
                <div className="relative flex-1 min-h-0 w-full flex items-center justify-center p-2 md:p-4">
                  <Image
                    src={filteredScreenshots[selectedImageIdx].path}
                    alt={filteredScreenshots[selectedImageIdx].title}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />

                  {/* Navigation Buttons - Centered in image area */}
                  <div className="absolute inset-y-0 left-2 md:left-4 flex items-center z-20 pointer-events-none">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center text-white hover:text-primary transition-all hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto shadow-lg"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                  </div>

                  <div className="absolute inset-y-0 right-2 md:right-4 flex items-center z-20 pointer-events-none">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center text-white hover:text-primary transition-all hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto shadow-lg"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>

                {/* Bottom Caption Area - Dedicated section */}
                <div className="w-full p-4 md:p-8 bg-black/80 border-t border-white/10 shrink-0 overflow-y-auto custom-scrollbar">
                  <p className="text-primary font-bold text-[10px] md:text-xs uppercase tracking-widest mb-1">
                    {filteredScreenshots[selectedImageIdx].category}
                  </p>
                  <h4 className="text-sm md:text-xl font-bold text-white mb-2">
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
