
'use client';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/data';

export function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Featured Projects
          </motion.h2>
          <div className="w-20 h-1.5 bg-primary rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`group glass rounded-[2.5rem] overflow-hidden flex flex-col ${project.featured ? 'md:col-span-2' : ''}`}
            >
              <div className={`grid grid-cols-1 ${project.featured ? 'lg:grid-cols-2' : ''} h-full`}>
                {/* Image Section */}
                <div className="relative h-64 lg:h-full min-h-[300px] overflow-hidden">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-all z-10" />
                  <img 
                    src={`https://picsum.photos/seed/${project.title}/1200/800`} 
                    alt={project.title}
                    data-ai-hint={project.imageHint}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {project.featured && (
                    <div className="absolute top-6 left-6 z-20">
                      <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold shadow-xl">
                        Featured Work
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">
                      {project.subtitle}
                    </p>
                    <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-10">
                      {project.tech.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-lg bg-white/5 text-xs font-medium border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {project.links?.live && (
                      <a 
                        href={project.links.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:translate-y-[-2px] transition-all"
                      >
                        Live Demo
                        <ArrowUpRight size={18} />
                      </a>
                    )}
                    {project.links?.other && (
                      <a 
                        href={project.links.other} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="glass px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/5 transition-all"
                      >
                        Visit Site
                        <ExternalLink size={18} />
                      </a>
                    )}
                    <button className="text-muted-foreground hover:text-primary transition-colors">
                      <Github size={24} />
                    </button>
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
