'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Loader2, FileText, AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const resumeJpgUrl = '/Abhay_Kumar_Resume.jpg';
  const resumePdfUrl = '/Abhay_Kumar_Resume.pdf';

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset states when closed
      setLoading(true);
      setError(false);
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

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePdfUrl;
    link.download = 'Abhay_Kumar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const retryLoad = () => {
    setLoading(true);
    setError(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col glass rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-card/50"
          >
            {/* Animated Glow Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem]">
              <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] animate-pulse" />
              <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[100px] animate-pulse delay-700" />
            </div>

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between p-6 md:px-8 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <FileText className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Resume Preview</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Abhay Kumar | Full Stack Developer</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all active:scale-95"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="relative z-10 flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center custom-scrollbar">
              {loading && !error && (
                <div className="flex flex-col items-center justify-center py-24 gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-20 h-20 rounded-full border-t-2 border-r-2 border-primary relative z-10"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="animate-spin text-primary" size={24} />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold mb-2">Preparing Your Resume...</p>
                    <p className="text-sm text-muted-foreground">High quality preview is being rendered</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
                  <div className="w-20 h-20 rounded-3xl bg-destructive/10 flex items-center justify-center text-destructive">
                    <AlertCircle size={40} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Failed to Load Preview</h4>
                    <p className="text-muted-foreground max-w-xs mx-auto mb-6">There was an issue loading the resume preview image. You can still download the PDF below.</p>
                    <button
                      onClick={retryLoad}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all font-bold"
                    >
                      <RefreshCw size={18} />
                      Retry Preview
                    </button>
                  </div>
                </div>
              )}

              <img
                src={resumeJpgUrl}
                alt="Abhay Kumar Resume Preview"
                className={cn(
                  "w-full h-auto object-contain rounded-xl shadow-2xl transition-opacity duration-500",
                  loading || error ? "opacity-0" : "opacity-100"
                )}
                onLoad={() => setLoading(false)}
                onError={() => {
                  setLoading(false);
                  setError(true);
                }}
              />
            </div>

            {/* Footer Action Bar */}
            <div className="relative z-10 p-6 md:px-8 bg-white/5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto min-w-[220px] bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all shadow-lg shadow-primary/20 active:scale-95"
              >
                <Download size={20} />
                Download PDF
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl glass font-bold hover:bg-white/10 transition-all active:scale-95"
              >
                Close Preview
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
