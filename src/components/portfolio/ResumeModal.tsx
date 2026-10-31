'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Loader2, FileText, AlertCircle, RefreshCw, ImageIcon, Check } from 'lucide-react';
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const resumeJpgUrl = '/Abhay_Kumar_Resume.jpg';
  const resumePdfUrl = '/Abhay_Kumar_Resume.pdf';

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setLoading(true);
      setError(false);
      setDownloadOpen(false);
      setIsDownloading(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Handle outside click for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDownloadOpen(false);
      }
    };
    if (downloadOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [downloadOpen]);

  const handleDownload = async (type: 'pdf' | 'jpg') => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    const url = type === 'pdf' ? resumePdfUrl : resumeJpgUrl;
    const filename = type === 'pdf' ? 'Abhay_Kumar_Resume.pdf' : 'Abhay_Kumar_Resume.jpg';
    
    try {
      // 1. Fetch the asset as a blob
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${filename} (Status: ${response.status})`);
      }

      const blob = await response.blob();
      
      // 2. Create a temporary object URL
      const blobUrl = window.URL.createObjectURL(blob);
      
      // 3. Create a temporary anchor element and trigger download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      // 4. Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      
      toast({
        title: "Download Started",
        description: `${filename} is being saved to your device.`,
      });
      
      setDownloadOpen(false);
    } catch (err) {
      console.error('Download process failed:', err);
      
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: `Could not download the ${type.toUpperCase()} file. Please try again later.`,
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const retryLoad = () => {
    setLoading(true);
    setError(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-5xl h-full max-h-[96vh] flex flex-col glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-card/60"
          >
            {/* Minimal Header */}
            <div className="relative z-10 flex items-center justify-between px-4 py-2 md:px-6 md:py-3 border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <FileText className="text-primary" size={16} />
                </div>
                <div>
                  <h3 className="text-xs md:text-sm font-bold leading-none mb-0.5">Resume Preview</h3>
                  <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest leading-none">Abhay Kumar | Full Stack Developer</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-white/10 transition-all active:scale-95"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Area - Maximized */}
            <div className="relative z-10 flex-1 overflow-y-auto p-2 md:p-4 custom-scrollbar flex flex-col items-center">
              {loading && !error && (
                <div className="flex flex-col items-center justify-center h-full py-20 gap-4">
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary"
                    />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground animate-pulse">Preparing Your Resume...</p>
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center justify-center h-full py-20 gap-4 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive">
                    <AlertCircle size={32} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Failed to Load Preview</h4>
                    <p className="text-sm text-muted-foreground mb-4">The resume preview image could not be loaded.</p>
                    <button
                      onClick={retryLoad}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 transition-all text-sm font-bold"
                    >
                      <RefreshCw size={14} />
                      Retry Preview
                    </button>
                  </div>
                </div>
              )}

              <img
                src={resumeJpgUrl}
                alt="Abhay Kumar Resume Preview"
                className={cn(
                  "max-w-full h-auto object-contain rounded-lg shadow-xl transition-opacity duration-300 mb-4",
                  loading || error ? "opacity-0" : "opacity-100"
                )}
                onLoad={() => setLoading(false)}
                onError={() => {
                  setLoading(false);
                  setError(true);
                }}
              />
            </div>

            {/* Subtle Floating Download Icon + Dropdown */}
            {!loading && !error && (
              <div className="absolute bottom-6 right-6 z-20 flex flex-col items-end gap-2" ref={dropdownRef}>
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
                  title="Download Options"
                >
                  {isDownloading ? (
                    <Loader2 size={20} className="animate-spin text-primary" />
                  ) : (
                    <Download size={20} className={cn("transition-transform", downloadOpen ? "scale-90" : "group-hover:translate-y-0.5")} />
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
