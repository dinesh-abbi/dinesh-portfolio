"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, X, ExternalLink } from "lucide-react";
import { projects, type Project } from "@/data/projects";

// Dedicated lists matching the resume exactly
const resumeHighlights: Record<string, string[]> = {
  drugparadigm: [
    "Designed secure auth architecture using SuperTokens for sensitive drug-discovery AI models inferencing on DGX GPU servers.",
    "Wrote and executed comprehensive Playwright load-testing suites across a 15-node JupyterHub cluster; identified and resolved 3 critical performance bottlenecks before production launch.",
    "Built real-time monitoring dashboards giving researchers visibility into GPU utilisation and model inference queues."
  ],
  tesseract: [
    "Built AI assessment engine that auto-generates contextual MCQs and assignments, auto-grades submissions, and provides role-specific dashboards for teachers, students, and admins.",
    "Shipped companion Project School app for milestone-driven project tracking; mentors can assign stages, review demos, and issue grades — all within a single interface."
  ],
  trinetra: [
    "Multi-tenant platform live across KMIT, NGIT, KMEC, and KMCE; serves 10,000+ students with a 5-level role hierarchy and cross-campus analytics.",
    "Eliminated manual record-keeping by centralising student data, assignment tracking, and teaching-quality metrics in a single unified system.",
    "Implemented granular access control ensuring data isolation between institutions while enabling aggregated director-level reporting."
  ],
  catalyst: [
    "Cross-platform mobile app with custom UI/UX, adaptive icons, and push notification reminders for workout and hydration goals.",
    "Integrated Gemini API as an in-app conversational wellness coach that responds to user activity data in context."
  ]
};

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const highlights = resumeHighlights[project.id] || [];

  return (
    <>
      <div 
        onClick={() => setOpen(true)}
        className="w-full py-16 border-b border-white/5 cursor-pointer group relative overflow-hidden transition-all duration-500 hover:bg-white/[0.01] px-6 md:px-12"
      >
        {/* Hover Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start relative z-10">
          
          {/* Index & Basic Metadata (Left) */}
          <div className="w-full lg:w-1/3 flex flex-col justify-between">
            <div>
              <span className="text-5xl md:text-7xl font-display font-light text-white/5 mb-4 block tracking-tighter group-hover:text-accent-blue/30 transition-colors">
                0{index + 1}
              </span>
              <p className="text-xs font-mono text-accent-blue tracking-[0.2em] uppercase mb-4">
                {project.subtitle}
              </p>
              <h3 className="text-2xl md:text-4xl font-display text-text-primary mb-6 group-hover:text-white transition-colors">
                {project.title}
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-mono text-text-muted border border-white/5 bg-white/5 rounded-full px-3 py-1 uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Description & Resume Bullets (Right) */}
          <div className="w-full lg:w-2/3 flex flex-col">
            <p className="text-text-subtle font-light leading-relaxed mb-8 text-base md:text-lg">
              {project.description}
            </p>

            {/* Bullet Points from Resume */}
            <ul className="space-y-4 mb-8">
              {highlights.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-light text-text-muted leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 flex-shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-auto border-t border-white/5 pt-6">
              <p className="text-xs font-mono text-text-muted tracking-wider">
                {project.stack.join(" · ")}
              </p>
              <div className="flex items-center gap-2 text-accent-blue text-sm font-medium group-hover:translate-x-2 transition-transform">
                <span>Case Study</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Slide-in detail panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#050810]/80 backdrop-blur-md z-45"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              data-lenis-prevent
              className="fixed top-0 right-0 bottom-0 w-full md:w-[600px] bg-[#080c14] border-l border-white/10 z-50 p-8 md:p-14 overflow-y-auto"
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
                <h3 className="text-3xl md:text-4xl font-display text-white mb-8">
                  {project.title}
                </h3>

                <div className="h-[1px] w-full bg-gradient-to-r from-accent-blue/30 via-accent-orange/20 to-transparent mb-10" />

                <h4 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-5">
                  Project Deep Dive
                </h4>
                <p className="text-text-subtle leading-relaxed font-light mb-10 text-base">
                  {project.detail}
                </p>

                <h4 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-5">
                  Core Highlights
                </h4>
                <ul className="space-y-4 mb-10">
                  {highlights.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-light text-text-muted leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-5">
                  Technical Stack
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
      <div className="pt-32 pb-16 px-6 md:px-12 max-w-6xl mx-auto border-b border-white/5">
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
            Production systems with real users, built end-to-end.
          </p>
        </motion.div>
      </div>

      {/* Clean, Open Rows Container */}
      <div className="relative w-full">
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
