'use client';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { developmentSteps } from '@/lib/projects-data';

export function DevelopmentTimeline() {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
        <span className="w-1.5 h-8 bg-primary rounded-full" />
        My Role & Development Ownership
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {developmentSteps.map((step, idx) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center gap-4 p-4 rounded-2xl glass border border-white/5 hover:border-primary/20 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {step.id}
            </div>
            <span className="text-sm md:text-base font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              {step.title}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}