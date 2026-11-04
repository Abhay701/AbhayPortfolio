'use client';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Code, Terminal } from 'lucide-react';
import { profile } from '@/lib/data';

export function About() {
  const highlights = [
    { icon: GraduationCap, label: "B.Tech CSE", value: "CGC Landran" },
    { icon: Briefcase, label: "Experience", value: "13 Months" },
    { icon: Code, label: "Focus", value: "ERP Solutions" },
    { icon: Terminal, label: "Stack", value: "Full Stack" },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-card/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-2xl md:text-4xl font-bold mb-4"
          >
            About Me
          </motion.h2>
          <div className="w-16 md:w-20 h-1.5 bg-primary rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6 will-change-transform"
          >
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {profile.about}
            </p>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {highlights.map((item, i) => (
                <div key={i} className="glass p-4 md:p-5 rounded-2xl hover:border-primary/50 transition-colors transform-gpu">
                  <item.icon className="text-primary mb-3" size={20} />
                  <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-xs md:text-sm lg:text-base font-bold truncate">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative w-full will-change-transform"
          >
            <div className="glass p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden transform-gpu">
              <h3 className="text-xl md:text-2xl font-bold mb-6">Personal Highlights</h3>
              <ul className="space-y-4">
                {[
                  "Computer Science Engineering graduate",
                  "Over a year of professional experience",
                  "Specialized in real-world ERP systems",
                  "Strong foundation in React & Next.js ecosystem",
                  "Proven track record in building secure auth modules"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span className="text-sm md:text-base text-muted-foreground">{text}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl glass flex items-center justify-center shrink-0">
                    <GraduationCap className="text-primary" size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm font-bold truncate">{profile.education.degree}</p>
                    <p className="text-[10px] md:text-xs text-muted-foreground truncate">{profile.education.school}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
