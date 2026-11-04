'use client';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, FileText, Activity, Users, CheckCircle2 } from 'lucide-react';
import { profile } from '@/lib/data';

interface HeroProps {
  onResumeClick?: () => void;
}

export function Hero({ onResumeClick }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 hero-gradient -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-semibold text-primary mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for Opportunities
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4">
              Hi, I'm <span className="text-gradient">Abhay Kumar</span>
            </h1>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
              {["Full Stack Developer", "React.js Developer", "Next.js Developer"].map((t) => (
                <span key={t} className="text-base md:text-lg lg:text-xl text-muted-foreground border-r last:border-0 border-muted pr-4">
                  {t}
                </span>
              ))}
            </div>

            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              {profile.intro}
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground mb-10">
              <MapPin size={18} className="text-primary" />
              <span>{profile.location}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#projects" className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all shadow-lg shadow-primary/20 active:scale-95">
                View My Projects
                <ArrowRight size={20} />
              </a>
              <a href="#contact" className="w-full sm:w-auto glass text-foreground px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-all active:scale-95">
                Contact Me
              </a>
              <button 
                onClick={onResumeClick}
                className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors px-4 py-2 text-sm font-semibold active:scale-95"
              >
                <FileText size={18} />
                Resume
              </button>
            </div>
          </motion.div>

          {/* Premium ERP Product Showcase Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative px-4 lg:px-0"
          >
            <div className="relative aspect-[4/3] w-full max-w-2xl mx-auto">
              {/* Main Dashboard Frame - KB Print HUB */}
              <motion.div 
                whileHover={{ y: -5, rotateX: 2, rotateY: -2 }}
                className="relative z-20 w-full h-full rounded-2xl glass border border-white/10 shadow-2xl overflow-hidden p-1.5"
              >
                <div className="w-full h-full rounded-xl overflow-hidden relative bg-[#0d1117] group">
                   {/* Browser Toolbar UI Overlay */}
                   <div className="absolute top-0 left-0 w-full h-6 bg-white/5 border-b border-white/5 flex items-center px-3 gap-1.5 z-30">
                      <div className="w-2 h-2 rounded-full bg-red-500/30" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
                      <div className="w-2 h-2 rounded-full bg-green-500/30" />
                      <div className="ml-2 px-2 py-0.5 rounded bg-white/5 text-[8px] text-muted-foreground font-mono">kb-print-hub.app</div>
                   </div>
                   <div className="pt-6 w-full h-full">
                      <img 
                        src="/projects/kb-print-hub/Home%20Page_1.png" 
                        alt="KB Print HUB Dashboard"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>

              {/* Secondary Overlapping Panel - Macro Print Pack */}
              <motion.div 
                initial={{ x: 40, y: 40, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-6 -right-6 w-1/2 aspect-video z-30 glass border border-primary/30 rounded-xl overflow-hidden shadow-2xl hidden sm:block"
              >
                <div className="absolute inset-0 bg-primary/5 z-10" />
                <img 
                  src="/projects/Dashboard_1.png" 
                  alt="Macro Print Pack Dashboard"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating Metric Badges */}
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="absolute -left-4 sm:-left-12 top-1/4 z-40 glass px-4 py-3 rounded-2xl border-primary/20 shadow-xl flex items-center gap-3 backdrop-blur-md"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Activity size={16} />
                </div>
                <div>
                  <p className="text-[9px] text-muted-foreground leading-none mb-1 uppercase tracking-wider font-bold">Total Activity</p>
                  <p className="text-sm font-bold leading-none">1,600+ Orders</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="absolute -right-4 sm:-right-12 top-10 z-40 glass px-4 py-3 rounded-2xl border-secondary/20 shadow-xl flex items-center gap-3 backdrop-blur-md"
              >
                <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                  <Users size={16} />
                </div>
                <div>
                  <p className="text-[9px] text-muted-foreground leading-none mb-1 uppercase tracking-wider font-bold">Access Control</p>
                  <p className="text-sm font-bold leading-none">9 Dashboards</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="absolute -bottom-12 left-1/4 z-40 glass px-4 py-3 rounded-2xl border-green-500/20 shadow-xl flex items-center gap-3 backdrop-blur-md hidden sm:flex"
              >
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">End-to-End Workflow Built</p>
              </motion.div>
              
              {/* Professional Experience Badge */}
              <div className="absolute bottom-4 left-4 z-40 glass p-3 rounded-xl border-white/5 hidden lg:block">
                <p className="text-[10px] text-muted-foreground mb-0.5 uppercase tracking-widest font-bold">Industry Experience</p>
                <p className="text-lg font-bold">13+ Months</p>
              </div>

              {/* Decorative Background Accents */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
