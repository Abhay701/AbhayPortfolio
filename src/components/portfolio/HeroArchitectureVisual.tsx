'use client';
import { motion } from 'framer-motion';
import { 
  ClipboardList, 
  ShieldCheck, 
  Layers, 
  Box, 
  Layout, 
  Truck, 
  Database, 
  Lock, 
  Code2, 
  Zap,
  Activity,
  Users,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const modules = [
  { id: 'orders', icon: ClipboardList, label: 'Order Management', pos: 'top-[-10%] left-[10%]', color: 'text-blue-400' },
  { id: 'design', icon: ShieldCheck, label: 'Design & Approvals', pos: 'top-[15%] left-[-15%]', color: 'text-purple-400' },
  { id: 'production', icon: Layers, label: 'Production Tracking', pos: 'bottom-[15%] left-[-10%]', color: 'text-blue-500' },
  { id: 'inventory', icon: Box, label: 'Inventory & Stock', pos: 'top-[-10%] right-[10%]', color: 'text-cyan-400' },
  { id: 'dashboards', icon: Layout, label: 'Departmental Dashboards', pos: 'top-[15%] right-[-15%]', color: 'text-indigo-400' },
  { id: 'dispatch', icon: Truck, label: 'Dispatch & Delivery', pos: 'bottom-[15%] right-[-10%]', color: 'text-blue-300' },
];

const techIndicators = [
  { icon: Code2, label: 'Next.js Frontend', pos: 'top-[40%] left-[-25%]' },
  { icon: Database, label: 'Firestore Sync', pos: 'bottom-[40%] right-[-25%]' },
  { icon: Lock, label: 'RBAC Security', pos: 'bottom-[5%] left-[20%]' },
];

export function HeroArchitectureVisual() {
  return (
    <div className="relative w-full aspect-square max-w-2xl mx-auto flex items-center justify-center p-8">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-primary/5 rounded-full blur-[120px] animate-pulse" />
      
      {/* Animated Connection Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--primary)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Connection Paths from Center to Satellites */}
        {/* Logic-based paths using simple line coordinates for the 400x400 viewbox */}
        <motion.path 
          d="M 200 200 L 100 80 M 200 200 L 60 180 M 200 200 L 80 320 M 200 200 L 300 80 M 200 200 L 340 180 M 200 200 L 320 320"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="text-primary/40"
          initial={{ strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Central Platform Node */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 w-48 h-48 md:w-64 md:h-64 rounded-[2.5rem] glass border-2 border-primary/30 shadow-[0_0_50px_rgba(59,130,246,0.2)] flex flex-col items-center justify-center text-center p-6 group"
      >
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
          <Zap size={32} className="fill-current" />
        </div>
        <h3 className="text-sm md:text-lg font-bold uppercase tracking-widest text-primary mb-1">Enterprise</h3>
        <p className="text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-[0.3em]">Business Platform</p>
        
        {/* Pulsing Core */}
        <div className="absolute inset-0 rounded-[2.5rem] border border-primary/50 animate-ping opacity-20" />
      </motion.div>

      {/* Module Satellite Cards */}
      {modules.map((mod, i) => (
        <motion.div
          key={mod.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
          className={cn(
            "absolute z-30 glass p-3 md:p-4 rounded-2xl border-white/10 shadow-xl flex items-center gap-3 hover:border-primary/50 transition-all group cursor-default",
            mod.pos
          )}
          style={{ transform: `translateY(${Math.sin(i) * 10}px)` }} // Subtle organic drift
        >
          <div className={cn("w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors", mod.color)}>
            <mod.icon size={18} />
          </div>
          <span className="text-[10px] md:text-xs font-bold whitespace-nowrap hidden sm:block">{mod.label}</span>
        </motion.div>
      ))}

      {/* Tech Indicators */}
      {techIndicators.map((tech, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 + (i * 0.2) }}
          className={cn(
            "absolute z-10 flex items-center gap-2 text-muted-foreground/40 text-[9px] md:text-[10px] font-mono",
            tech.pos
          )}
        >
          <tech.icon size={14} />
          <span className="uppercase tracking-widest">{tech.label}</span>
        </motion.div>
      ))}

      {/* Premium Floating Metrics */}
      <motion.div 
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute -left-4 md:-left-12 top-1/4 z-40 glass px-4 py-3 rounded-2xl border-primary/20 shadow-xl flex items-center gap-3 backdrop-blur-md"
      >
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
          <Activity size={16} />
        </div>
        <div>
          <p className="text-[9px] text-muted-foreground leading-none mb-1 uppercase tracking-wider font-bold">Total Scale</p>
          <p className="text-sm font-bold leading-none">1,600+ Orders</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute -right-4 md:-right-12 bottom-1/4 z-40 glass px-4 py-3 rounded-2xl border-secondary/20 shadow-xl flex items-center gap-3 backdrop-blur-md"
      >
        <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
          <Users size={16} />
        </div>
        <div>
          <p className="text-[9px] text-muted-foreground leading-none mb-1 uppercase tracking-wider font-bold">Infrastructure</p>
          <p className="text-sm font-bold leading-none">9 Role Dashboards</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-40 glass px-4 py-3 rounded-2xl border-green-500/20 shadow-xl flex items-center gap-3 backdrop-blur-md whitespace-nowrap"
      >
        <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
          <CheckCircle2 size={16} />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Order-to-Dispatch Workflow</p>
      </motion.div>
    </div>
  );
}
