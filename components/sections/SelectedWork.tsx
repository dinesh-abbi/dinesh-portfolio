"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { projects, type Project } from "@/data/projects";

// Accurate, exact highlights from the 3 resumes
const resumeHighlights: Record<string, string[]> = {
  trinetra: [
    "Multi-tenant platform live across KMIT, NGIT, KMEC, and KMCE; serves 10,000+ students with a 5-level role hierarchy and cross-campus analytics.",
    "Eliminated manual record-keeping by centralising student data, assignment tracking, and teaching-quality metrics in a single unified system.",
    "Designed NestJS schema-driven backend with role-isolated data access and RESTful APIs consumed by the React frontend."
  ],
  drugparadigm: [
    "Implemented SuperTokens authentication and session management for sensitive drug-discovery AI research workflows on DGX GPU servers.",
    "Authored and executed Playwright load-testing suites across a 15-node JupyterHub cluster, identifying 3 critical performance bottlenecks pre-launch.",
    "Built real-time monitoring dashboards giving researchers live visibility into GPU utilisation and inference queues."
  ],
  tesseract: [
    "Built AI assessment engine that auto-generates contextual MCQs and assignments, auto-grades submissions, and provides role-specific dashboards.",
    "Shipped companion Project School app for milestone-driven project tracking; mentors can assign stages, review demos, and issue grades."
  ],
  "vv-kaksha": [
    "Built complex drag-and-drop puzzle mechanics with real-time feedback, optimised for low-powered tablet hardware.",
    "Delivered as a PWA with offline capability; achieved full responsive coverage across all breakpoints."
  ],
  roboparadigm: [
    "Converted a robot model from Blender to GLB format and rendered it live in the browser using Three.js.",
    "Built scroll-driven Hero section animation and designed Project Highlights card layout using Framer Motion."
  ],
  "applied-robotics": [
    "Engineered and programmed bipedal, humanoid, and quadruped robots from scratch using Arduino Nano and ESP32-CAM.",
    "Built wireless Android control interfaces students use to operate robots over BLE."
  ],
  catalyst: [
    "Cross-platform mobile app with custom UI/UX, adaptive icons, and push notification reminders.",
    "Integrated Gemini API as an in-app conversational wellness coach that responds to user activity data in context."
  ]
};

function ProjectBlock({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const highlights = resumeHighlights[project.id] || [];

  return (
    <>
      <div 
        onClick={() => setOpen(true)}
        className="w-full py-20 border-b border-white/5 cursor-pointer group relative overflow-hidden transition-all duration-500 hover:bg-white/[0.01]"
      >
        {/* Soft Background Radial Glow on Hover */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
          {/* Index Number */}
          <span className="text-4xl md:text-5xl font-mono text-accent-blue/30 group-hover:text-accent-blue/80 transition-colors duration-500 mb-4 block">
            0{index + 1}
          </span>
          
          {/* Subtitle */}
          <p className="text-[10px] font-mono text-accent-orange tracking-[0.25em] uppercase mb-3">
            {project.subtitle}
          </p>

          {/* Title */}
          <h3 className="text-3xl md:text-5xl font-display text-text-primary mb-6 group-hover:text-white transition-colors duration-500 tracking-tight">
            {project.title}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[9px] font-mono text-text-muted border border-white/5 bg-white/5 rounded-full px-3 py-1 uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-text-subtle font-light leading-relaxed text-base md:text-lg mb-8 max-w-2xl">
            {project.description}
          </p>

          {/* Key Bullet Highlights */}
          <ul className="space-y-4 mb-10 text-left max-w-xl">
            {highlights.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-sm font-light text-text-muted leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 flex-shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Stack & Call-to-action */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 mt-4 border-t border-white/5 pt-6 max-w-2xl">
            <p className="text-[11px] font-mono text-text-muted tracking-wider">
              {project.stack.join(" · ")}
            </p>
            <div className="flex items-center gap-2 text-accent-blue text-xs font-mono uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">
              <span>View Case Study</span>
              <ArrowRight size={12} />
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
      <div className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto text-center border-b border-white/5">
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
          <p className="text-text-muted font-light mt-6 max-w-md mx-auto text-base md:text-lg">
            Production systems with real users, built end-to-end.
          </p>
        </motion.div>
      </div>

      {/* Clean, Centered Blocks Container */}
      <div className="relative w-full">
        {projects.map((project, i) => (
          <ProjectBlock key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
