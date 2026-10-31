'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { profile } from '@/lib/data';
import { projectsData } from '@/lib/projects-data';
import Link from 'next/link';

export function Projects() {
  const featuredProjects = Object.values(projectsData);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Real-World <span className="text-gradient">Applications</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              From understanding business requirements to building, testing and deploying complete applications — I develop solutions for real business operations.
            </p>
            <div className="w-20 h-1.5 bg-primary rounded-full mx-auto mt-4" />
          </motion.div>
        </div>

        {/* Contribution Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-[2rem] p-8 md:p-10 mb-16 border-primary/10"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <CheckCircle2 className="text-primary" size={20} />
            </span>
            Full-Cycle Development Expertise
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {profile.contributions.map((contribution, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <CheckCircle2 size={16} className="text-primary mt-1 shrink-0" />
                <span className="text-sm text-muted-foreground">{contribution}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`group glass rounded-[2.5rem] overflow-hidden flex flex-col h-full border border-white/5 ${
                idx === 0 ? 'lg:col-span-12' : 'lg:col-span-6'
              }`}
            >
              <div className={`grid grid-cols-1 ${idx === 0 ? 'lg:grid-cols-2' : ''} h-full`}>
                {/* Image Section */}
                <div className="relative h-64 lg:h-full min-h-[320px] overflow-hidden">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-all z-10" />
                  <img 
                    src={`https://picsum.photos/seed/${project.slug}/1200/800`} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-2">
                    <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-12 flex flex-col justify-between bg-gradient-to-br from-transparent to-primary/5">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-primary font-bold text-xs uppercase tracking-[0.2em]">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-6 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-10">
                      {project.verifiedTech.map((t) => (
                        <span key={t} className="px-3 py-1.5 rounded-lg bg-white/5 text-xs font-medium border border-white/10 hover:border-primary/50 transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <Link 
                      href={`/projects/${project.slug}`}
                      className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:translate-y-[-2px] transition-all shadow-lg shadow-primary/20 active:scale-95"
                    >
                      Explore Project
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}