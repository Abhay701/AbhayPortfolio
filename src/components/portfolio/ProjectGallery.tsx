
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ImageIcon, Maximize2 } from 'lucide-react';
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
      <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
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
              "px-4 py-2 rounded-xl text-sm font-medium transition-all border",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                <Maximize2 className="text-primary mb-2" size={24} />
                <p className="font-bold text-sm">{shot.title}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{shot.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-20 glass rounded-[2.5rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
            <ImageIcon className="text-primary/50" size={40} />
          </div>
          <h4 className="text-xl font-bold mb-2">Application screenshots coming soon</h4>
          <p className="text-muted-foreground text-sm max-w-xs px-4">
            Currently preparing sanitized production screens for {activeCategory === "All" ? "all modules" : activeCategory}.
          </p>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIdx !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImageIdx(null)}
              className="absolute inset-0 bg-background/95 backdrop-blur-xl cursor-pointer"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl z-10"
            >
              <Image 
                src={filteredScreenshots[selectedImageIdx].path} 
                alt={filteredScreenshots[selectedImageIdx].title}
                fill
                className="object-contain"
                priority
              />
              
              {/* Controls */}
              <div className="absolute top-6 right-6 flex items-center gap-2 z-50">
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIdx(null);
                  }}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-primary transition-all hover:scale-110 active:scale-95 cursor-pointer"
                  aria-label="Close lightbox"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="absolute inset-y-0 left-4 flex items-center z-50">
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-primary transition-all hover:scale-110 active:scale-95 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
              </div>

              <div className="absolute inset-y-0 right-4 flex items-center z-50">
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-primary transition-all hover:scale-110 active:scale-95 cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/80 to-transparent z-20 pointer-events-none">
                <p className="text-primary font-bold text-xs uppercase tracking-widest mb-1">
                  {filteredScreenshots[selectedImageIdx].category}
                </p>
                <h4 className="text-xl font-bold text-white">{filteredScreenshots[selectedImageIdx].title}</h4>
                {filteredScreenshots[selectedImageIdx].description && (
                  <p className="text-muted-foreground text-sm mt-2 max-w-2xl">{filteredScreenshots[selectedImageIdx].description}</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
