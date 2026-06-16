import { useState } from "react";
import { animate } from "animejs";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { projectsData, Project } from "../../data/projects";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Hover elevation driven by Anime.js
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    animate(e.currentTarget, {
      translateY: -8,
      borderColor: "rgba(59, 130, 246, 0.45)",
      boxShadow: "0 12px 30px -10px rgba(59, 130, 246, 0.25)",
      duration: 250,
      ease: "outQuad"
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    animate(e.currentTarget, {
      translateY: 0,
      borderColor: "rgba(255, 255, 255, 0.08)",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      duration: 250,
      ease: "outQuad"
    });
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    // Add overflow hidden to body to prevent double scrollbars
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-bg-primary">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12 select-none">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
            Featured Projects
          </h2>
          <div className="h-[1px] flex-grow bg-border-custom" />
        </div>

        {/* Masonry-style/responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              onClick={() => openModal(project)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="glass-card flex flex-col p-6 rounded-xl border border-border-custom cursor-pointer transition-all select-none"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-blue-light transition-colors">
                  {project.title}
                </h3>
                <ArrowUpRight size={18} className="text-text-secondary group-hover:text-accent-blue-light" />
              </div>

              <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow select-text">
                {project.shortDescription}
              </p>

              {/* Technologies Pills */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[10px] font-mono rounded bg-bg-secondary text-text-secondary border border-border-custom"
                  >
                    {tech}
                  </span>
                ))}
                {project.stack.length > 4 && (
                  <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-bg-secondary text-accent-blue-light font-bold">
                    +{project.stack.length - 4}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Project Modal Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
              {/* Modal Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                className="absolute inset-0 bg-bg-primary/80 backdrop-blur-md"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                data-lenis-prevent
                className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-card bg-bg-secondary/95 border border-border-custom rounded-xl p-6 md:p-8 shadow-2xl z-10 scrollbar-thin select-text"
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-text-secondary hover:text-text-primary p-2 hover:bg-bg-primary/50 rounded-full transition-all"
                  aria-label="Close Modal"
                >
                  <X size={20} />
                </button>

                {/* Modal Headers */}
                <div className="mb-6 select-none">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedProject.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="px-2 py-0.5 text-xs font-mono rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-text-primary">
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Scrollable Modal Content */}
                <div className="space-y-6">
                  {/* Detailed Description */}
                  <div>
                    <h4 className="text-sm font-semibold text-accent-blue-light uppercase tracking-wider mb-2 select-none">
                      Description
                    </h4>
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                      {selectedProject.fullDescription}
                    </p>
                  </div>

                  {/* Key Contributions */}
                  <div>
                    <h4 className="text-sm font-semibold text-accent-blue-light uppercase tracking-wider mb-3 select-none">
                      Key Contributions
                    </h4>
                    <ul className="space-y-3">
                      {selectedProject.contributions.map((contribution, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-sm md:text-base text-text-secondary">
                          <CheckCircle2 size={16} className="text-accent-blue-light mt-1 flex-shrink-0" />
                          <span className="leading-relaxed">{contribution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stack details */}
                  <div className="border-t border-border-custom pt-6">
                    <h4 className="text-sm font-semibold text-accent-blue-light uppercase tracking-wider mb-3 select-none">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-mono rounded bg-bg-primary text-text-primary border border-border-custom"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
