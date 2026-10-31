'use client';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experience } from '@/lib/data';

export function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 bg-card/30 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold mb-4"
          >
            Professional Experience
          </motion.h2>
          <div className="w-16 md:w-20 h-1.5 bg-primary rounded-full" />
        </div>

        <div className="relative space-y-8 md:space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {experience.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              {/* Dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary bg-background shadow-lg shadow-primary/20 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Briefcase size={16} className="text-primary" />
              </div>
              
              {/* Content Card */}
              <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] glass p-5 md:p-8 rounded-2xl md:rounded-3xl transition-all group-hover:border-primary/50 ml-4 md:ml-0">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold leading-tight">{item.role}</h3>
                    <p className="text-primary font-semibold text-sm md:text-base">{item.company}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-muted-foreground bg-white/5 px-2.5 py-1 rounded-full w-fit shrink-0">
                    <Calendar size={12} />
                    {item.period}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">
                  <div className="flex items-center gap-1">
                    <MapPin size={12} />
                    <span>{item.location}</span>
                  </div>
                  <span className="hidden sm:inline mx-1">•</span>
                  <span>{item.type}</span>
                </div>

                <ul className="space-y-2 md:space-y-3">
                  {item.responsibilities.map((res, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-muted-foreground leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5 shrink-0" />
                      {res}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
