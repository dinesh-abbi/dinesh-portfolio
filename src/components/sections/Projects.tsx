import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, CheckCircle2, ExternalLink } from "lucide-react";
import { projectsData, Project } from "../../data/projects";
import { use3DTilt } from "../../hooks/use3DTilt";

/* ── Single 3D-tilt card ── */
function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const { ref, onMouseMove, onMouseLeave } = use3DTilt(10);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={() => onOpen(project)}
      className="tilt-card group relative flex flex-col p-6 rounded-2xl border border-border-custom cursor-pointer overflow-hidden"
      style={{ background: "rgba(30,41,59,0.7)", backdropFilter: "blur(14px)", transformStyle: "preserve-3d" }}
    >
      {/* Dynamic shimmer spotlight */}
      <div
        className="shimmer-layer pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(180px circle at var(--shimmer-x, 50%) var(--shimmer-y, 50%), rgba(96,165,250,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Top border glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-blue-light transition-colors duration-300 leading-snug">
          {project.title}
        </h3>
        <ArrowUpRight
          size={18}
          className="text-text-secondary group-hover:text-accent-blue-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0 mt-0.5"
        />
      </div>

      <p className="relative z-10 text-text-secondary text-sm leading-relaxed mb-5 flex-grow select-text">
        {project.shortDescription}
      </p>

      {/* Metrics pills */}
      {project.metrics.length > 0 && (
        <div className="relative z-10 flex flex-wrap gap-1.5 mb-4">
          {project.metrics.slice(0, 2).map((m) => (
            <span key={m} className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-accent-blue/10 text-accent-blue-light border border-accent-blue/20">
              {m}
            </span>
          ))}
        </div>
      )}

      {/* Stack pills */}
      <div className="relative z-10 flex flex-wrap gap-1.5 mt-auto">
        {project.stack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 text-[10px] font-mono rounded bg-bg-primary/80 text-text-secondary border border-border-custom group-hover:border-accent-blue/20 transition-colors duration-300"
          >
            {tech}
          </span>
        ))}
        {project.stack.length > 4 && (
          <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-accent-blue/10 text-accent-blue-light font-bold">
            +{project.stack.length - 4}
          </span>
        )}
      </div>
    </div>
  );
}

/* ── Main Section ── */
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const openModal = useCallback((project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 px-6 md:px-12 bg-bg-primary">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 select-none">
          <p className="text-accent-blue-light font-mono text-sm tracking-widest uppercase mb-2">Portfolio</p>
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary">
              Featured Projects
            </h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-accent-blue/40 to-transparent" />
          </div>
        </div>

        {/* 3D Tilt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={openModal} />
          ))}
        </div>

        {/* Detailed Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                className="absolute inset-0 bg-bg-primary/85 backdrop-blur-xl"
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 20 }}
                transition={{ type: "spring", damping: 28, stiffness: 380 }}
                data-lenis-prevent
                className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl border border-white/10 p-7 md:p-9 shadow-2xl z-10 select-text"
                style={{ background: "rgba(15,23,42,0.96)", backdropFilter: "blur(24px)" }}
              >
                {/* Modal top glow */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-blue/60 to-transparent" />

                {/* Close */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 text-text-secondary hover:text-text-primary hover:bg-white/6 rounded-full transition-all duration-200"
                >
                  <X size={20} />
                </button>

                {/* Modal Header */}
                <div className="mb-6 pr-8">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedProject.metrics.map((m) => (
                      <span key={m} className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/25">
                        {m}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-text-primary leading-tight">
                    {selectedProject.title}
                  </h3>
                </div>

                <div className="space-y-7">
                  <div>
                    <h4 className="text-xs font-semibold text-accent-blue-light uppercase tracking-widest mb-2">Description</h4>
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed">{selectedProject.fullDescription}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-accent-blue-light uppercase tracking-widest mb-3">Key Contributions</h4>
                    <ul className="space-y-3">
                      {selectedProject.contributions.map((c, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                          <CheckCircle2 size={15} className="text-accent-blue-light mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-border-custom pt-6">
                    <h4 className="text-xs font-semibold text-accent-blue-light uppercase tracking-widest mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack.map((tech) => (
                        <span key={tech} className="px-3 py-1 text-xs font-mono rounded-lg bg-bg-secondary/80 text-text-primary border border-border-custom">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedProject.url && (
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-accent-blue-light hover:text-text-primary transition-colors font-medium"
                    >
                      <ExternalLink size={15} />
                      View Project
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
