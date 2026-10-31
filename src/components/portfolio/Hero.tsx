
'use client';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Download } from 'lucide-react';
import { profile } from '@/lib/data';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 hero-gradient -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-semibold text-primary mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for Opportunities
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
              Hi, I'm <span className="text-gradient">Abhay Kumar</span>
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {["Full Stack Developer", "React.js Developer", "Next.js Developer"].map((t) => (
                <span key={t} className="text-lg md:text-xl text-muted-foreground border-r last:border-0 border-muted pr-4">
                  {t}
                </span>
              ))}
            </div>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              {profile.intro}
            </p>

            <div className="flex items-center gap-2 text-muted-foreground mb-10">
              <MapPin size={18} className="text-primary" />
              <span>{profile.location}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#projects" className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all shadow-lg shadow-primary/20">
                View My Projects
                <ArrowRight size={20} />
              </a>
              <a href="#contact" className="glass text-foreground px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
                Contact Me
              </a>
              <button className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors px-4 py-2 text-sm font-semibold">
                <Download size={18} />
                Resume
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass relative group p-1">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:opacity-100 transition-opacity" />
              <img 
                src="https://picsum.photos/seed/dev/800/800" 
                alt="Developer illustration"
                data-ai-hint="developer programming"
                className="w-full h-full object-cover rounded-[1.4rem]"
              />
              <div className="absolute bottom-6 left-6 glass p-4 rounded-2xl">
                <p className="text-xs text-muted-foreground mb-1">Experience</p>
                <p className="text-xl font-bold">13+ Months</p>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
