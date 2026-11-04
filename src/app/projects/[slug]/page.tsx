'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Briefcase, 
  LayoutList, 
  Play, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Database,
  Users,
  Settings,
  ClipboardCheck,
  Truck,
  FileText,
  Package
} from 'lucide-react';
import { projectsData } from '@/lib/projects-data';
import { ProjectGallery } from '@/components/portfolio/ProjectGallery';
import { DevelopmentTimeline } from '@/components/portfolio/DevelopmentTimeline';
import { ERPProductWalkthrough } from '@/components/portfolio/ERPProductWalkthrough';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function CaseStudyPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const project = projectsData[slug];
  
  const [isWalkthroughActive, setIsWalkthroughActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <button 
          onClick={() => router.push('/#projects')}
          className="text-primary flex items-center gap-2 hover:underline"
        >
          <ArrowLeft size={18} /> Back to Portfolio
        </button>
      </div>
    );
  }

  const isMacroPrintPack = slug === 'macro-print-pack';
  const isKBPrintHub = slug === 'kb-print-hub';
  const isERP = isMacroPrintPack || isKBPrintHub;

  return (
    <main className="min-h-screen pb-24">
      

      {/* Responsive Compact Sticky Back Button */}
      {isScrolled && (
        <div className="fixed inset-x-0 top-0 z-[110] md:inset-x-auto md:top-4 md:left-4">
          <div
            className="bg-background/95 backdrop-blur-md border-b border-border md:bg-transparent md:backdrop-blur-none md:border-0"
            style={{ paddingTop: 'env(safe-area-inset-top)' }}
          >
            <div className="h-14 flex items-center px-4 md:h-auto md:px-0">
              <button
                type="button"
                aria-label="Back to Projects"
                onClick={() => router.push('/#projects')}
                className="w-10 h-10 shrink-0 rounded-full glass border border-white/10 shadow-lg flex items-center justify-center text-foreground transition-transform active:scale-95"
              >
                <ArrowLeft size={18} />
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Header Section */}
      <section className="relative py-20 overflow-hidden bg-card/30">
        <div className="absolute inset-0 hero-gradient -z-10 opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 h-8">

          <div className={cn(
  "relative z-[1] transition-opacity duration-200",
isScrolled ? "invisible" : "visible"
)}>

              <button 
                onClick={() => router.push('/#projects')}
                className={cn(
                  "group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300",
                  isScrolled ? "bg-background/80 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-xl md:bg-transparent md:p-0 md:border-0" : ""
                )}
              >
                <div className={cn(
                  "rounded-full glass flex items-center justify-center transition-all duration-300",
                  isScrolled ? "w-10 h-10 md:w-8 md:h-8" : "w-8 h-8"
                )}>
                  <ArrowLeft size={16} />
                </div>
                <span className={cn(
                  "transition-all duration-300 origin-left overflow-hidden whitespace-nowrap text-sm font-medium",
                  isScrolled ? "w-0 opacity-0 md:w-auto md:opacity-100" : "w-auto opacity-100"
                )}>
                  Back to Projects
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {project.category}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1.5 bg-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {project.status}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                {project.overview}
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="glass p-6 rounded-3xl border-white/5">
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                  <Calendar size={16} className="text-primary" />
                  <span>{project.period}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Briefcase size={16} className="text-primary" />
                  <span>Full Stack Development</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Metrics Section */}
      {project.metrics && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {project.metrics.map((metric, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-3xl border-white/5 text-center group hover:border-primary/30 transition-all"
              >
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                  {metric.value}
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Product Walkthrough Call-to-Action */}
      {isERP && project.screenshots.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 md:p-12 rounded-[2.5rem] border-primary/30 bg-primary/5 shadow-2xl overflow-hidden relative"
          >
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <Zap size={120} className="text-primary" />
             </div>
             
             <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl text-center lg:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Inside {project.title} – Complete ERP Workflow</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Explore the complete production workflow, management modules, and department coordination through a guided interactive walkthrough.
                  </p>
                </div>
                <button 
                  onClick={() => setIsWalkthroughActive(true)}
                  className="bg-primary text-primary-foreground px-10 py-5 rounded-[2rem] font-bold text-lg flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
                >
                  <Play className="fill-current" size={24} />
                  Start Product Walkthrough
                </button>
             </div>
          </motion.div>
        </section>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-24">
            
            {/* Interactive Walkthrough Modal */}
            <AnimatePresence>
              {isWalkthroughActive && (
                <ERPProductWalkthrough 
                  screenshots={project.screenshots} 
                  onClose={() => setIsWalkthroughActive(false)} 
                />
              )}
            </AnimatePresence>

            {/* Problem & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass p-8 rounded-[2rem] border-white/5">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-destructive" />
                  The Problem
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.businessProblem}
                </p>
              </div>
              <div className="glass p-8 rounded-[2rem] border-primary/10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  The Solution
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.businessSolution}
                </p>
              </div>
            </div>

            {/* Attendance System Spotlight (Macro Print Pack) */}
            {isMacroPrintPack && (
              <section className="space-y-8">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-primary rounded-full" />
                  QR Attendance System Logic
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: ShieldCheck, title: "Access Restriction", desc: "Gateman access is strictly restricted to the scanner module only." },
                    { icon: Zap, title: "Real-time Sync", desc: "Firestore ensures attendance logs are synced across all admin dashboards instantly." },
                    { icon: Layers, title: "ID Logic", desc: "Unique QR IDs generated for each employee, verified against central records." }
                  ].map((item, i) => (
                    <div key={i} className="glass p-6 rounded-2xl border-white/5 text-center">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                        <item.icon size={24} />
                      </div>
                      <h4 className="font-bold mb-2">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Role-Based Spotlight (KB Print Hub) */}
            {isKBPrintHub && (
              <section className="space-y-8">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-primary rounded-full" />
                  9 Role-Based Dashboards & Access Control
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {[
                    { icon: Settings, title: "Administrator", desc: "Complete control over users, roles, permissions, settings and business operations." },
                    { icon: ClipboardCheck, title: "Order Builder", desc: "Creates customer orders, configures packaging specifications and initiates the production workflow." },
                    { icon: ShieldCheck, title: "Designer", desc: "Manages assigned design jobs, artwork updates and design approval stages." },
                    { icon: Layers, title: "Kappa", desc: "Manages Kappa department production queues, assigned jobs and processing updates." },
                    { icon: FileText, title: "Paper", desc: "Handles paper processing tasks, material preparation and production progress." },
                    { icon: LayoutList, title: "Screen", desc: "Manages screen printing jobs, department queues and printing progress." },
                    { icon: Package, title: "Jar", desc: "Handles jar-related production tasks, assigned orders and departmental updates." },
                    { icon: Truck, title: "Dispatch", desc: "Manages completed orders, dispatch readiness, delivery scheduling and final fulfilment." },
                    { icon: Database, title: "Stock & Inventory", desc: "Monitors raw materials, available quantities, stock allocation and inventory control." }
                  ].map((item, i) => (
                    <div key={i} className="glass p-6 rounded-2xl border-white/5">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                        <item.icon size={20} />
                      </div>
                      <h4 className="font-bold mb-2">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Role & Ownership */}
            <DevelopmentTimeline />

            {/* Modules */}
            <section>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-primary rounded-full" />
                Key Modules & Functionality
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.modules.map((mod, i) => (
                  <div key={i} className="flex gap-4 p-6 glass rounded-2xl border-white/5 hover:border-primary/20 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <mod.icon className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{mod.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{mod.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Data Privacy & Confidentiality Notice */}
            <div className="glass p-6 md:p-8 rounded-[2rem] border-white/5 bg-white/5">
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                <ShieldCheck size={20} className="text-primary" />
                Data Privacy & Confidentiality Notice
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                The screenshots displayed in this portfolio represent the actual user interface, design, and workflows of the applications I developed. However, all records, names, figures, and business-related information shown in these screenshots are illustrative/demo data rather than actual company data.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This information has been replaced or anonymized to protect client confidentiality, maintain data privacy, and prevent the exposure of sensitive business information. The original application functionality and UI design remain representative of the actual systems.
              </p>
            </div>

            {/* Default Gallery (For Manual Browsing) */}
            <ProjectGallery 
              screenshots={project.screenshots} 
              categories={project.screenshotCategories} 
            />
          </div>

          <aside className="lg:col-span-4 self-start sticky top-24 space-y-8 z-30">
            {/* Tech Stack */}
            <div className="glass p-8 rounded-[2rem] border-white/5">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <LayoutList size={20} className="text-primary" />
                Verified Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.verifiedTech.map(tech => (
                  <span 
                    key={tech}
                    className="px-4 py-2 rounded-xl glass border border-white/10 text-sm font-medium hover:border-primary/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/10">
                <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                  Need more details?
                </h4>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Due to the nature of business operations, some internal modules are not publicly accessible. Let's discuss the technical architecture in a scheduled call.
                </p>
                <button 
                  onClick={() => router.push('/#contact')}
                  className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold hover:translate-y-[-2px] transition-all shadow-lg shadow-primary/20 active:scale-95"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
      
      {/* ERP Ecosystem Summary */}
      {isERP && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="glass p-12 rounded-[3rem] text-center border-white/10">
            <h2 className="text-3xl font-bold mb-4">{project.title} – Complete ERP Ecosystem</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              An end-to-end business application designed to solve complex operational challenges, coordinate multi-departmental workflows, and provide data-driven insights through a unified real-time platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
               {project.verifiedTech.map(t => (
                 <span key={t} className="text-sm font-bold text-primary">{t}</span>
               ))}
            </div>
            <button 
              onClick={() => setIsWalkthroughActive(true)}
              className="px-8 py-4 rounded-2xl glass hover:bg-white/5 transition-all font-bold flex items-center gap-2 mx-auto"
            >
              Explore Walkthrough Again <ArrowRight size={18} />
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
