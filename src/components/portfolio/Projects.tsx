'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { profile } from '@/lib/data';
import { projectsData } from '@/lib/projects-data';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Projects() {
  const featuredProjects = Object.values(projectsData);

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4"
          >
            <h2 className="text-2xl md:text-5xl font-bold tracking-tight">
              Real-World <span className="text-gradient">Applications</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
              From understanding business requirements to building, testing and deploying complete applications — I develop solutions for real business operations.
            </p>
            <div className="w-16 md:w-20 h-1.5 bg-primary rounded-full mx-auto mt-4" />
          </motion.div>
        </div>

        {/* Contribution Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="glass rounded-2xl md:rounded-[2rem] p-6 md:p-10 mb-12 md:mb-16 border-primary/10 will-change-transform"
        >
          <h3 className="text-lg md:text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
              <CheckCircle2 className="text-primary" size={20} />
            </span>
            Full-Cycle Development Expertise
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {profile.contributions.map((contribution, idx) => (
              <div key={idx} className="flex items-start gap-3 p-2 md:p-3 rounded-xl hover:bg-white/5 transition-colors">
                <CheckCircle2 size={16} className="text-primary mt-1 shrink-0" />
                <span className="text-xs md:text-sm text-muted-foreground">{contribution}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {featuredProjects.map((project, idx) => {
            const isHalfWidth = idx > 0;
            const isFeatured = idx === 0;
            const firstScreenshot = project.screenshots[0]?.path || `https://picsum.photos/seed/${project.slug}/1200/800`;
            
            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.05 }}
                className={cn(
                  "group glass rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden flex flex-col h-full border border-white/5 will-change-transform",
                  isFeatured ? 'lg:col-span-12' : 'lg:col-span-6'
                )}
              >
                <div className={cn("grid grid-cols-1 h-full", isFeatured && 'lg:grid-cols-2')}>
                  {/* Image Section */}
                  <div className={cn(
                    "relative overflow-hidden bg-black/40",
                    isFeatured ? "h-64 sm:h-80 lg:h-full" : "h-48 sm:h-56",
                    isHalfWidth && "md:h-[220px]"
                  )}>
                    <Image 
                      src={firstScreenshot} 
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain transition-all duration-700"
                    />
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 flex flex-wrap gap-2">
                      <span className="bg-primary text-primary-foreground px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold shadow-xl flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className={cn(
                    "flex flex-col justify-between bg-gradient-to-br from-transparent to-primary/5",
                    isFeatured ? "p-6 md:p-12" : "p-5 md:p-8"
                  )}>
                    <div>
                      <div className="flex items-center gap-2 mb-2 md:mb-3">
                        <span className="text-primary font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">
                          {project.category}
                        </span>
                      </div>
                      <h3 className={cn(
                        "font-bold mb-3 md:mb-4 group-hover:text-primary transition-colors",
                        isFeatured ? "text-2xl md:text-4xl" : "text-xl md:text-3xl"
                      )}>
                        {project.title}
                      </h3>
                      <p className={cn(
                        "text-muted-foreground leading-relaxed mb-4 md:mb-6",
                        isFeatured ? "text-sm md:text-lg" : "text-xs md:text-base"
                      )}>
                        {project.description}
                      </p>
                      <div className={cn("flex flex-wrap gap-1.5 md:gap-2", isFeatured ? "mb-8 md:mb-10" : "mb-6")}>
                        {project.verifiedTech.map((t) => (
                          <span key={t} className="px-2 py-1 md:px-3 md:py-1.5 rounded-lg bg-white/5 text-[10px] md:text-xs font-medium border border-white/10 hover:border-primary/50 transition-colors">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <Link 
                        href={`/projects/${project.slug}`}
                        className="w-full sm:w-auto bg-primary text-primary-foreground px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all shadow-lg shadow-primary/20 active:scale-95 text-xs md:text-base"
                      >
                        Explore Project
                        <ArrowUpRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
