'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from './ThemeSwitcher';

interface NavbarProps {
  onResumeClick?: () => void;
}

export function Navbar({ onResumeClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          if (isScrolled !== scrolled) {
            setScrolled(isScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleResumeClick = () => {
    setIsOpen(false);
    if (onResumeClick) onResumeClick();
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className={cn(
      "fixed top-0 w-full z-[100] transition-all duration-300",
      scrolled || isOpen ? "glass py-3" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.a 
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-primary tracking-tighter"
          >
            AK<span className="text-foreground">.</span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
            
            <div className="flex items-center gap-4 border-l border-white/10 pl-8">
              <ThemeSwitcher />
              <motion.button
                onClick={handleResumeClick}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-all active:scale-95"
              >
                <FileText size={16} />
                Resume
              </motion.button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeSwitcher />
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground p-2" aria-label="Toggle menu">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full glass border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-8 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block px-4 py-5 text-lg font-medium text-muted-foreground hover:text-primary border-b border-white/5 active:bg-white/5 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-6">
                <button 
                  onClick={handleResumeClick}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform text-base"
                >
                  <FileText size={20} />
                  View Resume
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
