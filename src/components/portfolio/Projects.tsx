'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { profile } from '@/lib/data';
import { projectsData } from '@/lib/projects-data';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { GuideState } from '@/hooks/use-navigation-guide';
import { NavigationIndicator } from './NavigationIndicator';
import { useTheme } from '@/providers/theme-provider';

interface ProjectsProps {
  guideState?: GuideState;
  onExploreProjectClick?: () => void;
}

export function Projects({ guideState, onExploreProjectClick }: ProjectsProps) {
  const { theme } = useTheme();
  const isCyberpunk = theme === 'cyberpunk';
  const featuredProjects = Object.values(projectsData);

  return (
    <section id="projects" className="py-16 md:py-24 scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4"
          >
            {isCyberpunk && (
              <span className="text-xs font-mono text-primary tracking-wider">{"// 04. $ ./deploy --projects"}</span>
            )}
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
          className="glass rounded-2xl md:rounded-[2rem] p-6 md:p-10 mb-12 md:mb-16 border border-border will-change-transform"
        >
          <h3 className="text-lg md:text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
              <CheckCircle2 className="text-primary" size={20} />
            </span>
            Full-Cycle Development Expertise
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {profile.contributions.map((contribution, idx) => (
              <div key={idx} className="flex items-start gap-3 p-2 md:p-3 rounded-xl hover:bg-primary/10 transition-colors">
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
            const isMacroPrintPack = project.slug === 'macro-print-pack';
            const firstScreenshot = project.screenshots[0]?.path || `https://picsum.photos/seed/${project.slug}/1200/800`;
            
            return (
              <motion.div
                key={project.slug}
                id={idx === 0 ? "macro-print-pack" : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.05 }}
                className={cn(
                  "group glass rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden flex flex-col h-full border border-border/80 shadow-md will-change-transform",
                  isFeatured ? 'lg:col-span-12' : 'lg:col-span-6',
                  idx === 0 && "scroll-mt-28",
                  isMacroPrintPack && "max-sm:min-h-0"
                )}
              >
                <div className={cn("grid grid-cols-1 h-full", isFeatured && 'lg:grid-cols-2')}>
                  {/* Image Section */}
                  <div className={cn(
                    "p-3 sm:p-5 lg:p-6 bg-muted/20 border-b lg:border-b-0 lg:border-r border-border/60 flex items-center justify-center",
                    isFeatured ? "min-h-[200px] sm:min-h-[340px] lg:min-h-full" : "min-h-[220px] sm:min-h-[260px]",
                    isHalfWidth && "md:min-h-[240px]",
                    isMacroPrintPack && "max-sm:min-h-[160px] max-sm:p-3"
                  )}>
                    <div className={cn(
                      "relative w-full h-full rounded-xl overflow-hidden bg-[#0d1117] border border-border/60 shadow-lg flex items-center justify-center",
                      isFeatured ? "min-h-[160px] sm:min-h-[260px] lg:min-h-[320px]" : "min-h-[180px]",
                      isMacroPrintPack && "max-sm:min-h-[140px]"
                    )}>
                      <Image 
                        src={firstScreenshot} 
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain p-1 transition-all duration-700 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className={cn(
                    "flex flex-col justify-between bg-gradient-to-br from-transparent to-primary/5",
                    isFeatured ? "p-5 md:p-12" : "p-5 md:p-8",
                    isMacroPrintPack && "max-sm:p-4"
                  )}>
                    <div>
                      {/* Status Badge & Project Number */}
                      <div className="flex items-center justify-between mb-3 md:mb-4">
                        <span className="bg-[#22C55E] text-[#052E16] px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-xs font-bold shadow-lg shadow-green-500/20 flex items-center gap-1.5">
                          <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white animate-pulse" />
                          {project.status}
                        </span>
                        
                        <span className="text-lg md:text-2xl font-black text-primary/30 tabular-nums select-none">
                          {idx + 1}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-2 md:mb-3">
                        <span className="text-primary font-bold text-[9px] md:text-xs uppercase tracking-[0.2em]">
                          {project.category}
                        </span>
                      </div>
                      <h3 className={cn(
                        "font-bold mb-2 md:mb-4 group-hover:text-primary transition-colors text-foreground",
                        isFeatured ? "text-xl md:text-4xl" : "text-lg md:text-3xl",
                        isMacroPrintPack && "max-sm:text-lg max-sm:mb-1"
                      )}>
                        {project.title}
                      </h3>
                      <p className={cn(
                        "text-muted-foreground leading-relaxed mb-4 md:mb-6",
                        isFeatured ? "text-xs md:text-lg" : "text-[10px] md:text-base",
                        isMacroPrintPack && "max-sm:text-[11px] max-sm:mb-3 max-sm:leading-tight"
                      )}>
                        {project.description}
                      </p>
                      <div className={cn("flex flex-wrap gap-1 md:gap-2", isFeatured ? "mb-6 md:mb-10" : "mb-6", isMacroPrintPack && "max-sm:mb-4")}>
                        {project.verifiedTech.map((t) => (
                          <span key={t} className="px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-md md:rounded-lg bg-muted/40 text-foreground text-[8px] md:text-xs font-medium border border-border hover:border-primary/50 transition-colors shadow-2xs">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        {idx === 0 && guideState === 'project-guide' && (
                          <NavigationIndicator targetSelector='[data-guide="project-btn"]' />
                        )}
                        <Link 
                          href={idx === 0 && guideState === 'project-guide' ? `/projects/${project.slug}?guide=walkthrough` : `/projects/${project.slug}`}
                          data-guide={idx === 0 ? "project-btn" : undefined}
                          onClick={idx === 0 ? onExploreProjectClick : undefined}
                          className="w-full sm:w-auto bg-primary text-primary-foreground px-5 py-2.5 md:px-8 md:py-4 rounded-lg md:rounded-2xl font-bold flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all shadow-lg shadow-primary/20 active:scale-95 text-[10px] md:text-base"
                        >
                          {isCyberpunk ? "$ ./explore --project" : "Explore Project"}
                          <ArrowUpRight size={16} />
                        </Link>
                      </div>
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
