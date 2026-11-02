'use client';
import { useState, useMemo } from 'react';
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
  Layers
} from 'lucide-react';
import { projectsData } from '@/lib/projects-data';
import { ProjectGallery } from '@/components/portfolio/ProjectGallery';
import { DevelopmentTimeline } from '@/components/portfolio/DevelopmentTimeline';
import { ERPProductWalkthrough } from '@/components/portfolio/ERPProductWalkthrough';
import { Badge } from '@/components/ui/badge';

export default function CaseStudyPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const project = projectsData[slug];
  
  const [isWalkthroughActive, setIsWalkthroughActive] = useState(false);

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

  return (
    <main className="min-h-screen pb-24">
      {/* Header Section */}
      <section className="relative py-20 overflow-hidden bg-card/30">
        <div className="absolute inset-0 hero-gradient -z-10 opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => router.push('/#projects')}
            className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12"
          >
            <div className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:-translate-x-1 transition-transform">
              <ArrowLeft size={16} />
            </div>
            Back to Projects
          </button>

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

      {/* Product Walkthrough Call-to-Action */}
      {isMacroPrintPack && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
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
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Inside Macro PrintHub – Complete ERP Workflow</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Explore how a complete printing and packaging ERP manages employees, attendance, customer orders, job cards, manufacturing, inventory, payroll and dispatch through a unified platform.
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
              {isWalkthroughActive && isMacroPrintPack && (
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

            {/* Attendance System Spotlight */}
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

            {/* Default Gallery (For Manual Browsing) */}
            <ProjectGallery 
              screenshots={project.screenshots} 
              categories={project.screenshotCategories} 
            />
          </div>

          <aside className="lg:col-span-4 space-y-8">
            {/* Tech Stack */}
            <div className="glass p-8 rounded-[2rem] sticky top-24 border-white/5">
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
      
      {/* Walkthrough Summary (Displayed at bottom of page for MPP) */}
      {isMacroPrintPack && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="glass p-12 rounded-[3rem] text-center border-white/10">
            <h2 className="text-3xl font-bold mb-4">Macro PrintHub – Complete ERP Ecosystem</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              An end-to-end ERP solution designed to streamline printing and packaging operations, employee management, attendance, order processing, production tracking and business administration.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
               {["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase", "Firestore", "Auth"].map(t => (
                 <span key={t} className="text-sm font-bold text-primary">{t}</span>
               ))}
            </div>
            <button 
              onClick={() => setIsWalkthroughActive(true)}
              className="px-8 py-4 rounded-2xl glass hover:bg-white/5 transition-all font-bold flex items-center gap-2 mx-auto"
            >
              Explore Screenshots Again <ArrowRight size={18} />
            </button>
          </div>
        </section>
      )}
    </main>
  );
}