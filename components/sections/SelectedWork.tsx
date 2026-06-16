"use client";

import { useRef, useState } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "motion/react";
import { ArrowRight, X, ExternalLink } from "lucide-react";
import { projects, type Project } from "@/data/projects";

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const isEven = index % 2 === 0;
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        ref={ref}
        className="group relative border-t border-border-glass py-10 md:py-14 overflow-hidden cursor-pointer"
        onClick={() => setOpen(true)}
      >
        {/* Hover shimmer bg */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-card" />

        <motion.div
          style={{ y }}
          className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-start md:items-center gap-8 md:gap-16`}
        >
          {/* Index */}
          <span className="text-[11px] font-mono text-text-muted shrink-0 w-8">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Main content */}
          <div className={`flex-1 ${isEven ? "" : "md:text-right"}`}>
            <div className="flex items-center gap-3 mb-1.5 flex-wrap">
              {project.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-mono text-accent-blue border border-border-blue rounded-full px-2.5 py-0.5 uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-2xl md:text-3xl font-display text-text-primary mb-3 group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <p className="text-text-muted font-light leading-relaxed max-w-xl text-sm md:text-base">
              {project.description}
            </p>
          </div>

          {/* Stack + Arrow */}
          <div className={`shrink-0 flex flex-col gap-4 ${isEven ? "md:items-end" : ""}`}>
            <p className="text-[11px] font-mono text-text-muted leading-relaxed max-w-[180px] text-right">
              {project.stack.join(" · ")}
            </p>
            <div className="flex items-center gap-1.5 text-accent-blue text-xs font-medium group-hover:gap-3 transition-all">
              <span>View Details</span>
              <ArrowRight size={12} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Slide-in detail panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-bg-primary/80 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              data-lenis-prevent
              className="fixed top-0 right-0 bottom-0 w-full md:w-[520px] glass border-l border-border-glass z-50 p-8 md:p-12 overflow-y-auto"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-8 right-8 p-2 text-text-muted hover:text-text-primary hover:bg-bg-elevated rounded-full transition-colors"
              >
                <X size={18} />
              </button>

              <div className="mt-12">
                <p className="text-xs font-mono text-accent-blue tracking-[0.2em] uppercase mb-3">
                  {project.subtitle}
                </p>
                <h3 className="text-2xl md:text-3xl font-display text-text-primary mb-8">
                  {project.title}
                </h3>

                <div className="h-[1px] w-full bg-gradient-to-r from-accent-blue/30 via-accent-orange/20 to-transparent mb-8" />

                <h4 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-4">
                  Deep Dive
                </h4>
                <p className="text-text-subtle leading-relaxed font-light mb-10 text-sm">
                  {project.detail}
                </p>

                <h4 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-4">
                  Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="text-xs font-mono text-text-subtle px-3 py-1.5 border border-border-glass rounded-full"
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
    <section id="work" className="w-full py-24 md:py-32 px-6 md:px-12 bg-bg-primary">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="text-xs font-mono text-accent-blue tracking-[0.2em] uppercase mb-4">
              Selected Work
            </p>
            <h2 className="text-3xl md:text-4xl font-display text-text-primary">
              Projects that shipped.
            </h2>
          </div>
          <p className="text-text-muted font-light max-w-xs text-sm md:text-right">
            Production systems with real users, not demos.
          </p>
        </motion.div>

        <div className="border-b border-border-glass">
          {projects.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
