
'use client';
import { Mail, Github, Linkedin, ArrowUp } from 'lucide-react';
import { profile } from '@/lib/data';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-white/5 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-primary mb-2">AK<span className="text-foreground">.</span></h2>
            <p className="text-muted-foreground text-sm max-w-xs">
              Full Stack Developer specializing in modern web applications and ERP solutions.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:text-primary transition-all">
              <Github size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:text-primary transition-all">
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${profile.email}`} className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:text-primary transition-all">
              <Mail size={20} />
            </a>
          </div>

          <button 
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full glass flex items-center justify-center hover:border-primary transition-all group"
          >
            <ArrowUp size={20} className="group-hover:translate-y-[-2px] transition-transform" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest pt-8 border-t border-white/5">
          <p>© {currentYear} Abhay Kumar. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
