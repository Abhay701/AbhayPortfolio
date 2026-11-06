'use client';

import { useState } from 'react';
import { Navbar } from '@/components/portfolio/Navbar';
import { Hero } from '@/components/portfolio/Hero';
import { About } from '@/components/portfolio/About';
import { Skills } from '@/components/portfolio/Skills';
import { Experience } from '@/components/portfolio/Experience';
import { Projects } from '@/components/portfolio/Projects';
import { Contact } from '@/components/portfolio/Contact';
import { Footer } from '@/components/portfolio/Footer';
import { ResumeModal } from '@/components/portfolio/ResumeModal';
import { useNavigationGuide } from '@/hooks/use-navigation-guide';

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { state, completeStepOne, advanceToWalkthrough } = useNavigationGuide();

  return (
    <main className="relative bg-background">
      <Navbar onResumeClick={() => setIsResumeOpen(true)} />
      <Hero 
        onResumeClick={() => setIsResumeOpen(true)} 
        guideState={state}
        onViewProjectsClick={completeStepOne}
      />
      <About />
      <Skills />
      <Experience />
      <Projects 
        guideState={state}
        onExploreProjectClick={advanceToWalkthrough}
      />
      <Contact />
      <Footer />
      
      {/* Resume Preview Modal */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />
      
      {/* Global Background Accents */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-20 overflow-hidden transform-gpu">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[60px] md:blur-[120px] transform-gpu" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[60px] md:blur-[120px] transform-gpu" />
      </div>
    </main>
  );
}
