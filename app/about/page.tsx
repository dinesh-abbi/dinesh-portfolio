"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    role: "Software Developer",
    entity: "Teleparadigm",
    date: "2023 — Present",
  },
  {
    role: "B.Tech in Computer Science",
    entity: "University",
    date: "2019 — 2023",
  }
];

const techList = [
  "React", "Next.js", "TypeScript", "Node.js", "NestJS", "PostgreSQL", 
  "Python", "Tailwind CSS", "Docker", "Framer Motion", "React Native"
];

export default function AboutPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="w-full pt-32 pb-24 px-6 md:px-12 bg-bg-primary min-h-screen flex flex-col items-center">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-3xl flex flex-col gap-16 md:gap-24"
      >
        <motion.div variants={item}>
          <h1 className="text-4xl md:text-5xl font-display text-text-primary mb-8 tracking-tight">
            About
          </h1>
          <div className="flex flex-col gap-6 text-text-muted text-lg font-light leading-relaxed">
            <p>
              I build full-stack systems from the ground up. Currently at Teleparadigm, my work revolves around enterprise EdTech platforms, AI-powered assessment tools, and orchestrating robust GPU infrastructures for pharmaceutical research.
            </p>
            <p>
              My approach to engineering is straightforward: prioritize efficiency, write clean code, and keep security in mind from day one. I care deeply about the user experience, but I know that a great interface is only as good as the resilient backend supporting it.
            </p>
            <p>
              Outside of building robust products for work, I spend my time exploring what's next in AI, fine-tuning workflows, and optimizing complex systems just to see how fast they can go.
            </p>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <h2 className="text-2xl font-display text-text-primary mb-8">
            Experience
          </h2>
          <div className="flex flex-col md:flex-row w-full relative">
            {/* Animated horizontal line for desktop */}
            <div className="hidden md:block absolute top-[11px] left-0 w-full h-[1px] bg-border-custom overflow-hidden">
              <motion.div 
                className="w-full h-full bg-accent-soft origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
              />
            </div>
            
            {/* Animated vertical line for mobile */}
            <div className="md:hidden absolute left-[5px] top-0 h-full w-[1px] bg-border-custom overflow-hidden">
              <motion.div 
                className="w-full h-full bg-accent-soft origin-top"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-12 md:gap-8 w-full z-10">
              {timeline.map((entry, idx) => (
                <div key={idx} className="flex flex-col pl-6 md:pl-0 pt-0 md:pt-8 relative flex-1">
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-auto md:top-[-4px] top-[6px] w-3 h-3 bg-bg-primary border-2 border-accent-soft rounded-full" />
                  
                  <h3 className="text-lg font-medium text-text-primary mb-1">
                    {entry.role}
                  </h3>
                  <p className="text-text-primary mb-2">{entry.entity}</p>
                  <p className="text-sm font-mono text-text-muted">{entry.date}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <h2 className="text-2xl font-display text-text-primary mb-6">
            Technologies
          </h2>
          <div className="flex flex-wrap items-center gap-y-3 gap-x-2 text-text-muted font-light leading-relaxed">
            {techList.map((tech, idx) => (
              <span key={idx} className="flex items-center">
                {tech}
                {idx !== techList.length - 1 && (
                  <span className="mx-3 text-border-custom text-xs">●</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
