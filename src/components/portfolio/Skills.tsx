'use client';
import { motion } from 'framer-motion';
import { skills } from '@/lib/data';

export function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold mb-4"
          >
            Technical Skills
          </motion.h2>
          <div className="w-16 md:w-20 h-1.5 bg-primary rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {skills.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-5 md:p-6 rounded-2xl md:rounded-3xl hover:translate-y-[-5px] transition-all"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center mb-5 md:mb-6 shrink-0">
                <category.icon className="text-primary" size={20} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">{category.category}</h3>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {category.items.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-2.5 py-1.5 rounded-lg bg-white/5 text-[10px] md:text-xs font-medium text-muted-foreground border border-white/5 hover:border-primary/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
