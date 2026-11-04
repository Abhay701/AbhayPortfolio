'use client';
import { motion } from 'framer-motion';

export function NavigationIndicator() {
  return (
    <motion.div
      initial={{ y: 0, opacity: 0, scale: 0.5 }}
      animate={{ 
        y: [0, -15, 0],
        opacity: 1,
        scale: 1
      }}
      transition={{
        y: {
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut"
        },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }}
      className="absolute -top-14 left-1/2 -translate-x-1/2 z-[60] pointer-events-none select-none text-4xl filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]"
      aria-hidden="true"
    >
      👇
    </motion.div>
  );
}
