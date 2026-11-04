'use client';
import { motion } from 'framer-motion';

export function NavigationIndicator() {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0, scale: 0.5 }}
      animate={{ 
        y: [0, -10, 0],
        opacity: 1,
        scale: 1,
        x: 0
      }}
      transition={{
        y: {
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut"
        },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
        x: { duration: 0.3 }
      }}
      className="z-[60] pointer-events-none select-none text-3xl md:text-4xl filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] shrink-0"
      aria-hidden="true"
    >
      👇
    </motion.div>
  );
}
