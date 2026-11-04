'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  Loader2, 
  FileText, 
  AlertCircle, 
  RefreshCw, 
  ImageIcon, 
  Plus, 
  Minus, 
  RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/toaster';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  
  // Zoom & Pan State
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [touchStartDist, setTouchStartDist] = useState<number | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const resumeJpgUrl = '/Abhay_Kumar_Resume.jpg';
  const resumePdfUrl = '/Abhay_Kumar_Resume.pdf';

  // Constants
  const MIN_SCALE = 0.4;
  const MAX_SCALE = 3;
  const SCALE_STEP = 0.25;

  // Responsive check
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Reset states when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (viewportRef.current) {
        viewportRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = 'unset';
      setLoading(true);
      setError(false);
      setDownloadOpen(false);
      setIsDownloading(false);
      resetZoom();
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleZoomIn = () => setScale(prev => Math.min(MAX_SCALE, prev + SCALE_STEP));
  const handleZoomOut = () => setScale(prev => Math.max(MIN_SCALE, prev - SCALE_STEP));

  // Handle Ctrl + Wheel Zoom
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -SCALE_STEP : SCALE_STEP;
        setScale(prev => Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev + delta)));
      }
    };

    viewport.addEventListener('wheel', handleWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', handleWheel);
  }, []);

  // Pan Logic (Mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch Logic (Pinch & Pan)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      setTouchStartDist(dist);
    } else if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      setDragStart({ 
        x: e.touches[0].clientX - position.x, 
        y: e.touches[0].clientY - position.y 
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartDist !== null) {
      e.preventDefault();
      const dist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      const delta = (dist - touchStartDist) / 100;
      setScale(prev => Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev + delta)));
      setTouchStartDist(dist);
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchStartDist(null);
  };

  const handleDownload = async (type: 'pdf' | 'jpg') => {
    if (isDownloading) return;
    setIsDownloading(true);
    const url = type === 'pdf' ? resumePdfUrl : resumeJpgUrl;
    const filename = type === 'pdf' ? 'Abhay_Kumar_Resume.pdf' : 'Abhay_Kumar_Resume.jpg';
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch ${filename}`);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      
      toast({ title: "Download Started", description: `${filename} is being saved.` });
      setDownloadOpen(false);
    } catch (err) {
      toast({ variant: "destructive", title: "Download Failed", description: "Please try again." });
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDownloadOpen(false);
      }
    };
    if (downloadOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [downloadOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 xs:p-2 md:p-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/90 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-5xl h-full max-h-screen xs:max-h-[96vh] flex flex-col glass rounded-none xs:rounded-3xl overflow-hidden border-0 xs:border border-white/10 shadow-2xl bg-card/60"
          >
            {/* Compact Header with Zoom Controls */}
            <div className="relative z-20 flex items-center justify-between px-3 md:px-4 py-2 md:py-3 border-b border-white/5 bg-white/5 gap-2">
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <FileText className="text-primary" size={16} />
                </div>
                <div className="truncate">
                  <h3 className="text-[10px] md:text-xs font-bold leading-none mb-0.5">Resume</h3>
                  <p className="text-[8px] md:text-[9px] text-muted-foreground uppercase tracking-widest leading-none truncate hidden xs:block">Abhay Kumar</p>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-4 shrink-0">
                {!loading && !error && (
                  <div className="flex items-center gap-0.5 sm:gap-1 bg-white/5 p-0.5 md:p-1 rounded-lg md:rounded-xl border border-white/10 shadow-sm">
                    <button 
                      onClick={handleZoomOut}
                      disabled={scale <= MIN_SCALE}
                      className="w-7 h-7 rounded-md md:rounded-lg flex items-center justify-center hover:bg-white/10 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <div className="px-1 min-w-[30px] md:min-w-[50px] text-center">
                      <span className="text-[8px] md:text-[9px] font-bold text-primary">
                        {Math.round(scale * 100)}%
                      </span>
                    </div>
                    <button 
                      onClick={handleZoomIn}
                      disabled={scale >= MAX_SCALE}
                      className="w-7 h-7 rounded-md md:rounded-lg flex items-center justify-center hover:bg-white/10 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                    <div className="w-[1px] h-3 bg-white/10 mx-0.5" />
                    <button 
                      onClick={resetZoom}
                      className="w-7 h-7 rounded-md md:rounded-lg flex items-center justify-center hover:bg-white/10 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <RotateCcw size={14} />
                    </button>
                  </div>
                )}

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-white/10 transition-all active:scale-95"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Document Viewer Viewport */}
            <div 
              ref={viewportRef}
              className={cn(
                "relative flex-1 bg-black/20 flex items-start justify-center cursor-default select-none overflow-hidden"
              )}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {loading && !error && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-primary/20 border-t-primary"
                  />
                  <p className="text-xs font-medium text-muted-foreground animate-pulse">Loading Document...</p>
                </div>
              )}

              {error && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 text-center p-4">
                  <AlertCircle className="text-destructive" size={40} />
                  <div>
                    <h4 className="text-base font-bold mb-2">Failed to Load</h4>
                    <button
                      onClick={() => { setLoading(true); setError(false); }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 transition-all text-xs font-bold"
                    >
                      <RefreshCw size={14} /> Retry
                    </button>
                  </div>
                </div>
              )}

              {/* Zoomable Image Container */}
              <div 
                className="w-full flex items-start justify-center transition-transform duration-200 ease-out"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transformOrigin: 'top center',
                  cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                }}
              >
                <img
                  ref={imageRef}
                  src={resumeJpgUrl}
                  alt="Resume Preview"
                  className={cn(
                    "object-contain shadow-2xl pointer-events-none transition-opacity duration-300",
                    "w-full max-w-[calc(100%-20px)] md:max-w-[calc(100%-48px)] h-auto my-4 md:my-8",
                    loading || error ? "opacity-0" : "opacity-100"
                  )}
                  onLoad={() => setLoading(false)}
                  onError={() => { setLoading(false); setError(true); }}
                />
              </div>
            </div>

            {/* Floating Action Menu (Bottom-Right) */}
            {!loading && !error && (
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-40 flex flex-col items-end gap-2" ref={dropdownRef}>
                <AnimatePresence>
                  {downloadOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="glass border border-white/10 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl min-w-[140px] md:min-w-[160px] mb-2"
                    >
                      <button
                        onClick={() => handleDownload('pdf')}
                        className="w-full flex items-center justify-between px-3 md:px-4 py-3 text-[10px] md:text-xs font-bold hover:bg-white/10 transition-colors border-b border-white/5 text-left"
                      >
                        <div className="flex items-center gap-2 md:gap-3">
                          <FileText size={14} className="text-primary" />
                          PDF Format
                        </div>
                      </button>
                      <button
                        onClick={() => handleDownload('jpg')}
                        className="w-full flex items-center justify-between px-3 md:px-4 py-3 text-[10px] md:text-xs font-bold hover:bg-white/10 transition-colors text-left"
                      >
                        <div className="flex items-center gap-2 md:gap-3">
                          <ImageIcon size={14} className="text-secondary" />
                          JPG Format
                        </div>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={() => setDownloadOpen(!downloadOpen)}
                  disabled={isDownloading}
                  className={cn(
                    "w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl glass flex items-center justify-center text-foreground border border-white/10 hover:border-primary/50 transition-all shadow-xl active:scale-95",
                    isDownloading && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isDownloading ? (
                    <Loader2 size={18} className="animate-spin text-primary" />
                  ) : (
                    <Download size={18} className={cn("transition-transform", downloadOpen && "scale-90")} />
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
