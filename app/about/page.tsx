"use client";

import { motion } from "motion/react";

const timeline = [
  {
    year: "2019",
    role: "B.Tech — Computer Science & Engineering",
    org: "Keshav Memorial Institute of Technology (JNTUH)",
    location: "Hyderabad",
    detail: "Focused on data structures, algorithms, and systems programming. Graduated 2023.",
  },
  {
    year: "2023",
    role: "Software Developer",
    org: "Teleparadigm",
    location: "Hyderabad, TG",
    detail: "Jul 2023 – Present. Building multi-tenant platforms, AI-integrated EdTech, and GPU research infrastructure.",
  },
];

const tech = [
  "JavaScript", "TypeScript", "Python", "C/C++",
  "React.js", "Redux", "Next.js", "Vite", "React Native",
  "NestJS", "RESTful APIs", "Node.js", "PostgreSQL", "MySQL",
  "Playwright", "Docker", "Git", "CI/CD", "JupyterHub",
  "Gemini API", "SuperTokens", "Tailwind CSS", "PWA",
];

const certs = [
  { name: "Meta Front-End Developer", issuer: "Meta · Coursera" },
  { name: "Data Science & Engineering", issuer: "NPTEL" },
  { name: "Data Structures & Algorithms", issuer: "Great Learning" },
];

export default function AboutPage() {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <div className="w-full pt-32 pb-28 px-6 md:px-12 bg-bg-primary min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-20 md:gap-28"
        >
          {/* Bio */}
          <motion.div variants={item}>
            <p className="text-xs font-mono text-accent-blue tracking-[0.2em] uppercase mb-6">
              About
            </p>
            <h1 className="text-4xl md:text-5xl font-display text-text-primary mb-10 leading-tight">
              Dinesh Abbi
            </h1>
            <div className="grid md:grid-cols-2 gap-8 text-text-muted font-light leading-relaxed text-base">
              <p>
                I'm a Software Developer at Teleparadigm (Jul 2023 – present), where I build enterprise web platforms, AI-powered EdTech tools, and secure research infrastructure. My work spans the full stack — from PostgreSQL schema design and NestJS APIs to React frontends and mobile apps.
              </p>
              <p>
                Before that, I completed my B.Tech in Computer Science & Engineering at Keshav Memorial Institute of Technology (KMIT, JNTUH) in Hyderabad in 2023. I've shipped systems that serve 10,000+ students across 4 colleges and AI infrastructure running on GPU clusters. I care about code quality, testing discipline, and shipping on time.
              </p>
            </div>
            <p className="mt-6 text-text-muted font-light leading-relaxed">
              Lately I've been deepening my work in AI integration — building features with the Gemini API that make products meaningfully smarter rather than superficially "AI-powered." I'm interested in the intersection of robust backend systems and intelligent frontends.
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div variants={item}>
            <p className="text-xs font-mono text-accent-blue tracking-[0.2em] uppercase mb-10">
              Timeline
            </p>
            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-[14px] left-0 right-0 h-[1px] bg-border-glass overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent-blue to-accent-orange origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-12 md:gap-0 relative z-10">
                {timeline.map((entry) => (
                  <div key={entry.year} className="flex-1 md:pr-8">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-accent-blue bg-bg-primary shrink-0" />
                      <span className="text-xs font-mono text-accent-blue">{entry.year}</span>
                    </div>
                    <h3 className="text-base font-medium text-text-primary mb-1">{entry.role}</h3>
                    <p className="text-sm text-text-subtle mb-1">{entry.org}</p>
                    <p className="text-xs font-mono text-text-muted mb-3">{entry.location}</p>
                    <p className="text-sm text-text-muted font-light leading-relaxed">{entry.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tech */}
          <motion.div variants={item}>
            <p className="text-xs font-mono text-accent-blue tracking-[0.2em] uppercase mb-6">
              Technologies
            </p>
            <div className="flex flex-wrap items-center gap-x-0 gap-y-2 text-text-muted font-light text-sm leading-loose">
              {tech.map((t, i) => (
                <span key={t} className="flex items-center">
                  <span className="hover:text-text-subtle transition-colors">{t}</span>
                  {i < tech.length - 1 && (
                    <span className="mx-3 text-border-glass text-[10px]">●</span>
                  )}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div variants={item}>
            <p className="text-xs font-mono text-accent-blue tracking-[0.2em] uppercase mb-8">
              Certifications
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {certs.map((c) => (
                <div
                  key={c.name}
                  className="glass glass-hover rounded-lg p-5"
                >
                  <p className="text-sm font-medium text-text-primary mb-1.5">{c.name}</p>
                  <p className="text-xs font-mono text-text-muted">{c.issuer}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
