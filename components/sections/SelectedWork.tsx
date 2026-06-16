"use client";

import { useRef, useState } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { projects, type Project } from "@/data/projects";

function StackedProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Calculate specific scroll tracking for this card
  const { scrollYProgress } = useScroll({ 
    target: cardRef,
    // Start tracking when the card hits the top of the viewport
    offset: ["start start", "end start"]
  });

  // Scale down the cards behind as you scroll past them
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95 - (total - index) * 0.01]);
  // Fade out cards as they get pushed back
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  // Top offset to create the stacking effect
  const top = `calc(10vh + ${index * 40}px)`;

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center sticky" style={{ top }}>
        <motion.div
          ref={cardRef}
          style={{ scale, opacity }}
          onClick={() => setOpen(true)}
          className="w-full max-w-5xl glass rounded-[2rem] p-8 md:p-14 cursor-pointer group hover:border-accent-blue/30 transition-colors shadow-2xl relative overflow-hidden"
        >
          {/* Accent glow on hover */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent-blue/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 relative z-10">
            {/* Left side: Index & Tags */}
            <div className="md:w-1/3 flex flex-col justify-between">
              <div>
                <span className="text-4xl md:text-6xl font-display text-white/10 font-bold tracking-tighter mb-4 block">
                  0{index + 1}
                </span>
                <p className="text-xs font-mono text-accent-blue tracking-[0.2em] uppercase mb-4">
                  {project.subtitle}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono text-text-muted border border-border-glass rounded-full px-3 py-1 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Content */}
            <div className="md:w-2/3 flex flex-col justify-center">
              <h3 className="text-3xl md:text-5xl font-display text-text-primary mb-6 group-hover:text-white transition-colors">
                {project.title}
              </h3>
              <p className="text-text-subtle font-light leading-relaxed mb-8 text-base md:text-lg">
                {project.description}
              </p>
              
              <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                <p className="text-xs font-mono text-text-muted">
                  {project.stack.join(" · ")}
                </p>
                <div className="flex items-center gap-2 text-accent-blue text-sm font-medium group-hover:translate-x-2 transition-transform">
                  <span>View Details</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Slide-in detail panel (kept from previous iteration but polished) */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#050810]/80 backdrop-blur-md z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              data-lenis-prevent
              className="fixed top-0 right-0 bottom-0 w-full md:w-[600px] glass border-l border-white/10 z-50 p-8 md:p-14 overflow-y-auto"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-8 right-8 p-3 text-text-muted hover:text-white hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mt-16">
                <p className="text-xs font-mono text-accent-blue tracking-[0.2em] uppercase mb-4">
                  {project.subtitle}
                </p>
                <h3 className="text-3xl md:text-4xl font-display text-white mb-10">
                  {project.title}
                </h3>

                <div className="h-[1px] w-full bg-gradient-to-r from-accent-blue/30 via-accent-orange/20 to-transparent mb-10" />

                <h4 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-5">
                  Deep Dive
                </h4>
                <p className="text-text-subtle leading-relaxed font-light mb-12 text-base">
                  {project.detail}
                </p>

                <h4 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-5">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="text-xs font-mono text-white/70 px-4 py-2 bg-white/5 border border-white/10 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default function SelectedWork() {
  return (
    <section id="work" className="w-full bg-[#050810] relative pb-32">
      {/* Title Section */}
      <div className="pt-32 pb-16 px-6 md:px-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-mono text-accent-blue tracking-[0.2em] uppercase mb-4">
            Selected Work
          </p>
          <h2 className="text-4xl md:text-6xl font-display text-text-primary">
            Projects that shipped.
          </h2>
          <p className="text-text-muted font-light mt-6 max-w-md text-lg">
            Production systems with real users, not weekend demos.
          </p>
        </motion.div>
      </div>

      {/* Stacked Cards Container */}
      <div className="relative w-full px-6 md:px-12 pb-32">
        {projects.map((project, i) => (
          <StackedProjectCard key={project.id} project={project} index={i} total={projects.length} />
        ))}
      </div>
    </section>
  );
}
