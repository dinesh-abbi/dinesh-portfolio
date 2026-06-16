import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { Download, Calendar, Briefcase, GraduationCap } from "lucide-react";
import { skillsData, techCategoriesData, timelineData } from "../../data/skills";

export default function About() {
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          
          // Animate skill bar widths staggered using Anime.js
          animate(".skill-bar-fill", {
            width: (el: HTMLElement) => {
              return el.getAttribute("data-width") + "%";
            },
            duration: 1200,
            delay: stagger(100),
            ease: "outPower3"
          });
        }
      },
      { threshold: 0.1 }
    );

    if (skillsContainerRef.current) {
      observer.observe(skillsContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-bg-primary">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12 select-none">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
            About Me
          </h2>
          <div className="h-[1px] flex-grow bg-border-custom" />
        </div>

        {/* Bio + Skills split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Side: Skill Bars */}
          <div ref={skillsContainerRef} className="lg:col-span-6 space-y-6">
            <h3 className="text-xl font-semibold text-accent-blue-light mb-6 select-none">
              Technical Core Competencies
            </h3>
            <div className="space-y-5">
              {skillsData.map((skill) => (
                <div key={skill.name} className="space-y-2 select-text">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-text-primary">{skill.name}</span>
                    <span className="text-text-secondary font-mono">{skill.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-bg-secondary rounded-full overflow-hidden border border-border-custom select-none">
                    <div
                      className="skill-bar-fill h-full bg-accent-blue rounded-full"
                      style={{ width: "0%" }}
                      data-width={skill.percentage}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Bio Text */}
          <div className="lg:col-span-6 space-y-6 select-text">
            <h3 className="text-xl font-semibold text-accent-blue-light select-none">
              Professional Summary
            </h3>
            <p className="text-text-secondary leading-relaxed text-lg">
              I build full-stack systems end-to-end — from architecture to deployment.
              Currently at <strong className="text-text-primary font-medium">Teleparadigm</strong>, I specialize in building enterprise EdTech platforms, AI-powered assessment tools, and robust GPU scheduling infrastructures for pharmaceutical research applications.
            </p>
            <p className="text-text-secondary leading-relaxed">
              My engineering approach prioritizes efficiency, clean code practices, and security. Whether optimization of complex SQL indices, scaling multi-GPU workloads, or implementing responsive interfaces, I focus on delivering seamless systems.
            </p>

            {/* Resume Button */}
            <div className="pt-4 select-none">
              <a
                href="/resume.pdf"
                download="Dinesh_Abbi_Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 bg-bg-secondary hover:bg-bg-secondary/80 text-text-primary border border-border-custom hover:border-accent-blue rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Download size={18} />
                Download Resume
              </a>
            </div>
          </div>
        </div>

        {/* Tech Stack Pills Grid */}
        <div className="mb-20 select-text">
          <h3 className="text-xl font-semibold text-accent-blue-light mb-8 select-none">
            Detailed Tech Stack
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techCategoriesData.map((category) => (
              <div
                key={category.title}
                className="glass-card p-6 rounded-xl border border-border-custom hover:border-accent-blue/45 transition-colors duration-300"
              >
                <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4 border-b border-border-custom pb-2 select-none">
                  {category.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono rounded bg-bg-secondary text-accent-blue-light border border-border-custom hover:border-accent-blue-light/50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline (Work History & Education) */}
        <div>
          <h3 className="text-xl font-semibold text-accent-blue-light mb-8 select-none">
            Timeline
          </h3>
          <div className="relative border-l border-border-custom ml-4 md:ml-6 space-y-12">
            {timelineData.map((item, index) => {
              const isWork = item.company.includes("Teleparadigm");
              return (
                <div key={index} className="relative pl-8 md:pl-10 select-text">
                  {/* Timeline Node Icon */}
                  <span className="absolute -left-5 top-1 flex items-center justify-center w-10 h-10 rounded-full bg-bg-secondary border border-border-custom text-accent-blue shadow-md select-none">
                    {isWork ? <Briefcase size={16} /> : <GraduationCap size={16} />}
                  </span>

                  {/* Timeline Box */}
                  <div className="glass-card p-6 rounded-xl hover:border-accent-blue/30 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3 select-none">
                      <h4 className="text-lg font-bold text-text-primary">
                        {item.role}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-text-secondary font-mono">
                        <Calendar size={14} className="text-accent-blue-light" />
                        {item.duration}
                      </div>
                    </div>
                    
                    <h5 className="text-sm font-semibold text-accent-blue-light mb-4 select-none">
                      {item.company}
                    </h5>
                    
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
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
