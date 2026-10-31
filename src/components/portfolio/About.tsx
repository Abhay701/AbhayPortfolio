
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
    <section id="about" className="py-24 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            About Me
          </motion.h2>
          <div className="w-20 h-1.5 bg-primary rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {profile.about}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <div key={i} className="glass p-5 rounded-2xl hover:border-primary/50 transition-colors">
                  <item.icon className="text-primary mb-3" size={24} />
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass p-8 rounded-3xl relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-6">Personal Highlights</h3>
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
                    <span className="text-muted-foreground">{text}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                    <GraduationCap className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{profile.education.degree}</p>
                    <p className="text-xs text-muted-foreground">{profile.education.school}</p>
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
