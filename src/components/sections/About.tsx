import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { Download, Calendar, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import { skillsData, techCategoriesData, timelineData } from "../../data/skills";
import { use3DTilt } from "../../hooks/use3DTilt";

/* ── Skill bar with glow fill ── */
function SkillBar({ name, percentage }: { name: string; percentage: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-medium">
        <span className="text-text-primary">{name}</span>
        <span className="text-accent-blue-light font-mono text-xs">{percentage}%</span>
      </div>
      <div className="relative h-[6px] w-full bg-bg-secondary rounded-full overflow-hidden border border-border-custom">
        <div
          className="skill-bar-fill h-full rounded-full"
          style={{
            width: "0%",
            background: "linear-gradient(90deg, #3b82f6, #60a5fa, #93c5fd)",
            boxShadow: "0 0 8px rgba(96, 165, 250, 0.6)",
          }}
          data-width={percentage}
        />
      </div>
    </div>
  );
}

/* ── Tech category card with 3D tilt ── */
function TechCard({ category }: { category: { title: string; items: string[] } }) {
  const { ref, onMouseMove, onMouseLeave } = use3DTilt(8);
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative p-6 rounded-2xl border border-border-custom overflow-hidden"
      style={{ background: "rgba(30,41,59,0.7)", backdropFilter: "blur(12px)", transformStyle: "preserve-3d" }}
    >
      {/* Shimmer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(140px circle at var(--shimmer-x, 50%) var(--shimmer-y, 50%), rgba(96,165,250,0.10) 0%, transparent 70%)"
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <h4 className="relative z-10 text-xs font-bold text-text-primary uppercase tracking-widest mb-4 border-b border-border-custom pb-2">
        {category.title}
      </h4>
      <div className="relative z-10 flex flex-wrap gap-2">
        {category.items.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-bg-primary/80 text-accent-blue-light border border-border-custom group-hover:border-accent-blue/25 transition-colors duration-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          animate(".skill-bar-fill", {
            width: (el: HTMLElement) => el.getAttribute("data-width") + "%",
            duration: 1400,
            delay: stagger(110),
            ease: "outPower3",
          });
        }
      },
      { threshold: 0.1 }
    );
    if (skillsContainerRef.current) observer.observe(skillsContainerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full py-20 px-6 md:px-12 bg-bg-primary">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-14 select-none">
          <p className="text-accent-blue-light font-mono text-sm tracking-widest uppercase mb-2">Background</p>
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary">About Me</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-accent-blue/40 to-transparent" />
          </div>
        </div>

        {/* Bio + Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Skill Bars */}
          <div ref={skillsContainerRef} className="lg:col-span-6 space-y-5">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-accent-blue-light mb-6 select-none">
              <Sparkles size={16} className="text-accent-blue" />
              Core Competencies
            </h3>
            {skillsData.map((s) => (
              <SkillBar key={s.name} name={s.name} percentage={s.percentage} />
            ))}
          </div>

          {/* Bio text */}
          <div className="lg:col-span-6 space-y-5 select-text">
            <h3 className="text-lg font-semibold text-accent-blue-light select-none">Professional Summary</h3>
            <p className="text-text-secondary leading-relaxed text-[1.05rem]">
              I build full-stack systems end-to-end — from architecture to deployment. Currently at{" "}
              <strong className="text-text-primary font-medium">Teleparadigm</strong>, I specialize in enterprise EdTech platforms, AI-powered assessment tools, and robust GPU scheduling infrastructures for pharmaceutical research.
            </p>
            <p className="text-text-secondary leading-relaxed">
              My engineering approach prioritizes efficiency, clean code, and security. Whether optimizing complex SQL indices, scaling multi-GPU workloads, or implementing responsive interfaces, I focus on seamless systems that genuinely move the needle.
            </p>

            {/* Resume Button with 3D tilt */}
            <div className="pt-2 select-none">
              <a
                href="/resume.pdf"
                download="Dinesh_Abbi_Resume.pdf"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-text-primary border border-border-custom hover:border-accent-blue bg-bg-secondary/60 hover:bg-accent-blue/10 transition-all duration-300"
              >
                <Download size={16} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
                Download Resume
              </a>
            </div>
          </div>
        </div>

        {/* Tech Stack Grid */}
        <div className="mb-20">
          <h3 className="text-lg font-semibold text-accent-blue-light mb-8 select-none">Detailed Tech Stack</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" style={{ perspective: "1200px" }}>
            {techCategoriesData.map((cat) => (
              <TechCard key={cat.title} category={cat} />
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-lg font-semibold text-accent-blue-light mb-8 select-none">Timeline</h3>
          <div className="relative border-l border-border-custom ml-4 md:ml-6 space-y-10">
            {timelineData.map((item, i) => {
              const isWork = item.company.includes("Teleparadigm");
              return (
                <div key={i} className="relative pl-8 md:pl-10 select-text group">
                  {/* Node */}
                  <span className="absolute -left-5 top-1 flex items-center justify-center w-10 h-10 rounded-full bg-bg-secondary border border-border-custom text-accent-blue shadow-md group-hover:border-accent-blue/60 group-hover:shadow-accent-blue/20 transition-all duration-300 select-none">
                    {isWork ? <Briefcase size={15} /> : <GraduationCap size={15} />}
                  </span>

                  {/* Card */}
                  <div className="relative p-6 rounded-2xl border border-border-custom group-hover:border-accent-blue/25 transition-all duration-400 overflow-hidden"
                    style={{ background: "rgba(30,41,59,0.55)", backdropFilter: "blur(8px)" }}>
                    {/* Top line glow */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-blue/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2 select-none">
                      <h4 className="text-lg font-bold text-text-primary">{item.role}</h4>
                      <div className="flex items-center gap-1.5 text-xs text-text-secondary font-mono">
                        <Calendar size={13} className="text-accent-blue-light" />
                        {item.duration}
                      </div>
                    </div>
                    <h5 className="text-sm font-semibold text-accent-blue-light mb-3 select-none">{item.company}</h5>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
