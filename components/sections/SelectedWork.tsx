"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  stack: string;
  details: string;
};

const projects: Project[] = [
  {
    id: "drugparadigm",
    title: "DrugParadigm",
    description: "AI-powered drug discovery platform. Built the frontend and monitoring dashboards for a 15-node GPU research cluster, plus the load-testing setup that caught performance issues before researchers ever hit them.",
    stack: "React, SuperTokens, Playwright, JupyterHub, Docker",
    details: "I configured and managed JupyterHub gateway instances running on NVIDIA DGX clusters, implemented secure SSO with SuperTokens, and created end-to-end load simulations. The clean monitoring dashboards visualized live CPU/GPU temperatures, workloads, and memory utilization in real-time."
  },
  {
    id: "tesseract",
    title: "Tesseract",
    description: "An assessment platform that uses the Gemini API to generate and grade questions automatically, cutting manual grading work for faculty.",
    stack: "React, Redux, NestJS, Gemini API, PostgreSQL",
    details: "Built the Redux state slices coordinating real-time timer tracking, question sequencing, and autosaving. I also implemented a secure assessment-proctoring UI restricting copy-pasting, tab switching, and window resizing, combined with automated rubric grading pipelines."
  },
  {
    id: "catalyst",
    title: "Catalyst",
    description: "A React Native fitness app with an AI coach built on the Gemini API — tracks workouts and hydration, and nudges you when you're slipping.",
    stack: "React Native, Gemini API, SQLite",
    details: "Developed a responsive cross-platform layout optimized for mobile screens. The app connects users to a fine-tuned Gemini AI health coach for personalized diet and workout tips, utilizing local SQLite storage for zero-latency logging and local push notifications for customized hydration alerts."
  },
  {
    id: "trinetra",
    title: "Trinetra / Sanchit",
    description: "Academic management software running across multiple colleges, handling everything from grading workflows to cross-campus reporting.",
    stack: "React, NestJS, PostgreSQL, Tailwind",
    details: "Engineered a 5-level Role-Based Access Control (RBAC) security system and optimized complex PostgreSQL queries supporting active students across multiple campuses. The high-throughput data import utilities cut processing time for student records significantly."
  }
];

function ProjectItem({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="w-full py-20 md:py-32 border-b border-border-custom last:border-0 relative">
      <motion.div 
        style={{ y }}
        className={`flex flex-col ${isEven ? 'md:items-start md:text-left' : 'md:items-end md:text-right'} w-full`}
      >
        <h3 className="text-4xl md:text-6xl font-display text-text-primary mb-6 tracking-tight">
          {project.title}
        </h3>
        <p className="text-text-muted text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-8">
          {project.description}
        </p>
        <div className={`flex flex-col gap-6 w-full max-w-2xl ${isEven ? 'md:items-start' : 'md:items-end'}`}>
          <p className="text-sm text-text-muted font-mono tracking-wide">
            {project.stack}
          </p>
          <button 
            onClick={() => onOpen(project)}
            className="group flex items-center gap-2 text-sm uppercase tracking-widest text-accent-soft hover:text-text-primary transition-colors duration-300"
          >
            <span className="relative">
              View More
              <span className="absolute left-0 bottom-0 w-full h-[1px] bg-accent-soft group-hover:bg-text-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function SelectedWork() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section className="w-full py-24 px-6 md:px-12 bg-bg-primary overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-display text-text-primary">
            Selected Work
          </h2>
        </motion.div>

        <div className="flex flex-col">
          {projects.map((project, idx) => (
            <ProjectItem 
              key={project.id} 
              project={project} 
              index={idx} 
              onOpen={setActiveProject} 
            />
          ))}
        </div>
      </div>

      {/* Slide-in panel */}
      <AnimatePresence>
        {activeProject && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 bg-bg-primary/80 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              data-lenis-prevent
              className="fixed top-0 right-0 bottom-0 w-full md:w-[500px] bg-bg-elevated border-l border-border-custom z-50 p-8 md:p-12 overflow-y-auto"
            >
              <button 
                onClick={() => setActiveProject(null)}
                className="absolute top-8 right-8 text-text-muted hover:text-text-primary transition-colors"
              >
                <X size={24} />
              </button>
              <div className="mt-16">
                <h3 className="text-3xl font-display text-text-primary mb-6">
                  {activeProject.title}
                </h3>
                <p className="text-text-muted font-mono text-sm mb-8">
                  {activeProject.stack}
                </p>
                <div className="h-[1px] w-full bg-border-custom mb-8" />
                <h4 className="text-sm uppercase tracking-widest text-text-primary mb-4">
                  Details
                </h4>
                <p className="text-text-muted leading-relaxed font-light">
                  {activeProject.details}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
