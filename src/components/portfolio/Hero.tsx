'use client';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, FileText } from 'lucide-react';
import { profile } from '@/lib/data';
import { HeroArchitectureVisual } from './HeroArchitectureVisual';
import { NavigationIndicator } from './NavigationIndicator';
import { GuideState } from '@/hooks/use-navigation-guide';

import { useTheme } from '@/providers/theme-provider';

interface HeroProps {
  onResumeClick?: () => void;
  guideState?: GuideState;
  onViewProjectsClick?: () => void;
}

export function Hero({ onResumeClick, guideState, onViewProjectsClick }: HeroProps) {
  const { theme } = useTheme();
  const isCyberpunk = theme === 'cyberpunk';

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 hero-gradient -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left order-1"
          >
            {/* Terminal Window Header when Cyberpunk Theme is active */}
            {isCyberpunk && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-primary/30 bg-black/60 text-primary font-mono text-xs mb-4 shadow-sm"
              >
                <div className="flex items-center gap-1.5 mr-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                </div>
                <span className="text-muted-foreground">$</span>
                <span>whoami --verbose</span>
              </motion.div>
            )}

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-border text-[10px] md:text-xs font-semibold text-primary mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {isCyberpunk ? "[STATUS: AVAILABLE_FOR_OPPORTUNITIES]" : "Available for Opportunities"}
            </motion.div>
            
            <h1 className="text-3xl xs:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4 tracking-tight">
              {isCyberpunk ? (
                <>
                  <span className="text-muted-foreground font-mono text-2xl xs:text-3xl md:text-4xl block mb-2">&gt; dev.init()</span>
                  Hi, I'm <span className="text-gradient drop-shadow-[0_0_15px_rgba(57,255,20,0.4)]">Abhay Kumar</span>
                  <span className="inline-block w-2.5 h-7 md:h-12 ml-1 bg-primary animate-pulse align-middle" />
                </>
              ) : (
                <>
                  Hi, I'm <span className="text-gradient">Abhay Kumar</span>
                </>
              )}
            </h1>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-y-2 mb-6">
              {["Full Stack Developer", "React.js Developer", "Next.js Developer"].map((t, i) => (
                <span key={t} className={`text-sm md:text-lg lg:text-xl text-muted-foreground ${i !== 2 ? 'border-r border-border pr-4 mr-4' : ''}`}>
                  {isCyberpunk ? `// ${t}` : t}
                </span>
              ))}
            </div>

            <p className="text-sm md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {profile.intro}
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground mb-10">
              <MapPin size={18} className="text-primary" />
              <span className="text-sm md:text-base">{profile.location}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-3 w-full sm:w-auto justify-center lg:justify-start">
                {guideState === 'hero-guide' && (
                  <NavigationIndicator targetSelector='[data-guide="hero-btn"]' />
                )}
                <a 
                  href="#macro-print-pack" 
                  data-guide="hero-btn"
                  onClick={onViewProjectsClick}
                  className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all shadow-lg shadow-primary/20 active:scale-95 text-sm md:text-base"
                >
                  {isCyberpunk ? "$ ./view-projects" : "View My Projects"}
                  <ArrowRight size={20} />
                </a>
              </div>
              <div className="flex w-full sm:w-auto gap-4">
                <a href="#contact" className="hidden md:flex flex-1 sm:flex-none glass border border-border text-foreground px-6 py-4 rounded-xl font-bold items-center justify-center gap-2 hover:bg-primary/10 transition-all active:scale-95 text-sm md:text-base">
                  Contact
                </a>
                <a href="#contact-form" className="flex md:hidden flex-1 sm:flex-none glass border border-border text-foreground px-6 py-4 rounded-xl font-bold items-center justify-center gap-2 hover:bg-primary/10 transition-all active:scale-95 text-sm md:text-base">
                  Contact
                </a>
                <button 
                  onClick={onResumeClick}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors px-4 py-2 text-sm font-semibold active:scale-95"
                >
                  <FileText size={18} />
                  Resume
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[500px] lg:max-w-none px-4 lg:px-0 order-2 lg:order-2 mx-auto"
          >
            <HeroArchitectureVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
