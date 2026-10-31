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
  RotateCcw,
  Search
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
  const MIN_SCALE = 0.5;
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
    // On desktop, allow standard scrolling if not zoomed in
    if (isDesktop && scale <= 1) return;
    if (!isDesktop && scale <= 1) return;
    
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

  // Generic Handlers
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6 overflow-hidden">
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
            className="relative w-full max-w-5xl h-full max-h-[96vh] flex flex-col glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-card/60"
          >
            {/* Compact Header */}
            <div className="relative z-20 flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <FileText className="text-primary" size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-bold leading-none mb-0.5">Resume Preview</h3>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest leading-none">Abhay Kumar | Full Stack Developer</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-white/10 transition-all active:scale-95"
              >
                <X size={18} />
              </button>
            </div>

            {/* Document Viewer Viewport */}
            <div 
              ref={viewportRef}
              className={cn(
                "relative flex-1 bg-black/20 flex items-center justify-center cursor-default select-none",
                isDesktop && scale <= 1 ? "overflow-y-auto" : "overflow-hidden"
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
                <div className="flex flex-col items-center justify-center gap-4 py-20">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary"
                  />
                  <p className="text-sm font-medium text-muted-foreground animate-pulse">Preparing Your Resume...</p>
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center justify-center gap-4 text-center py-20">
                  <AlertCircle className="text-destructive" size={48} />
                  <div>
                    <h4 className="text-lg font-bold mb-1">Failed to Load</h4>
                    <button
                      onClick={() => { setLoading(true); setError(false); }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 transition-all text-sm font-bold"
                    >
                      <RefreshCw size={14} /> Retry
                    </button>
                  </div>
                </div>
              )}

              {/* Zoomable Image Container */}
              <div 
                className={cn(
                  "w-full flex items-center justify-center transition-transform duration-200 ease-out",
                  isDesktop && scale <= 1 ? "h-auto" : "h-full"
                )}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                }}
              >
                <img
                  ref={imageRef}
                  src={resumeJpgUrl}
                  alt="Resume Preview"
                  className={cn(
                    "object-contain shadow-2xl pointer-events-none transition-opacity duration-300",
                    isDesktop ? "w-full max-w-[calc(100%-48px)] h-auto my-8" : "max-w-full max-h-full",
                    loading || error ? "opacity-0" : "opacity-100"
                  )}
                  onLoad={() => setLoading(false)}
                  onError={() => { setLoading(false); setError(true); }}
                />
              </div>

              {/* Floating Zoom Controls */}
              {!loading && !error && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 glass p-1.5 rounded-2xl border border-white/10 shadow-lg">
                  <button 
                    onClick={handleZoomOut}
                    disabled={scale <= MIN_SCALE}
                    className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/10 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <div className="px-3 min-w-[60px] text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      {Math.round(scale * 100)}%
                    </span>
                  </div>
                  <button 
                    onClick={handleZoomIn}
                    disabled={scale >= MAX_SCALE}
                    className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/10 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                  <div className="w-[1px] h-4 bg-white/10 mx-1" />
                  <button 
                    onClick={resetZoom}
                    className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/10 text-muted-foreground hover:text-primary transition-colors"
                    title="Reset Zoom"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Floating Action Menu (Bottom-Right) */}
            {!loading && !error && (
              <div className="absolute bottom-6 right-6 z-40 flex flex-col items-end gap-2" ref={dropdownRef}>
                <AnimatePresence>
                  {downloadOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="glass border border-white/10 rounded-2xl overflow-hidden shadow-2xl min-w-[160px] mb-2"
                    >
                      <button
                        onClick={() => handleDownload('pdf')}
                        disabled={isDownloading}
                        className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold hover:bg-white/10 transition-colors border-b border-white/5 text-left disabled:opacity-50"
                      >
                        <div className="flex items-center gap-3">
                          <FileText size={14} className="text-primary" />
                          Download PDF
                        </div>
                        {isDownloading && <Loader2 size={12} className="animate-spin" />}
                      </button>
                      <button
                        onClick={() => handleDownload('jpg')}
                        disabled={isDownloading}
                        className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold hover:bg-white/10 transition-colors text-left disabled:opacity-50"
                      >
                        <div className="flex items-center gap-3">
                          <ImageIcon size={14} className="text-secondary" />
                          Download JPG
                        </div>
                        {isDownloading && <Loader2 size={12} className="animate-spin" />}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={() => setDownloadOpen(!downloadOpen)}
                  disabled={isDownloading}
                  className={cn(
                    "w-12 h-12 rounded-2xl glass flex items-center justify-center text-foreground border border-white/10 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all shadow-xl active:scale-95 group",
                    isDownloading && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isDownloading ? (
                    <Loader2 size={20} className="animate-spin text-primary" />
                  ) : (
                    <Download size={20} className={cn("transition-transform", downloadOpen ? "scale-90" : "group-hover:translate-y-0.5")} />
                  )}
                </button>
              </div>
            )}
            
            {/* Quick Helper Hint */}
            {!loading && !error && (
              <div className="absolute bottom-6 left-6 z-10 pointer-events-none hidden md:block">
                <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full border border-white/5 opacity-40">
                  <Search size={12} />
                  <span className="text-[10px] font-medium">Ctrl + Scroll to Zoom</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
