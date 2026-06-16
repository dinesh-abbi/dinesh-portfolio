"use client";

import { motion } from "motion/react";

const services = [
  {
    number: "01",
    title: "Full-Stack Engineering",
    body: "I design and build from database schema all the way to responsive UI. PostgreSQL, NestJS REST APIs, React frontends — I own the full stack and don't hand off between layers.",
  },
  {
    number: "02",
    title: "AI-Integrated Products",
    body: "From Gemini-powered assessment engines to embedded AI coaches — I build AI features as first-class parts of products, not bolted-on afterthoughts.",
  },
  {
    number: "03",
    title: "Infrastructure & Systems",
    body: "Playwright load testing, JupyterHub cluster management, Docker deployments. I make sure systems hold up when real users hit them at scale.",
  },
];

export default function WhatIDo() {
  return (
    <section className="w-full py-24 md:py-36 px-6 md:px-12 bg-bg-primary">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24 max-w-xl"
        >
          <p className="text-xs font-mono text-accent-blue tracking-[0.2em] uppercase mb-4">
            What I Do
          </p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary leading-tight">
            I specialize in building things that{" "}
            <em className="not-italic text-text-muted">actually work in production.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-border-glass">
          {services.map((s, i) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              className="group relative p-8 md:p-10 border-b md:border-b-0 md:border-r border-border-glass last:border-0 glass-hover overflow-hidden"
            >
              {/* Accent corner glow */}
              <div className="absolute top-0 left-0 w-[1px] h-0 group-hover:h-full bg-accent-blue transition-all duration-500 ease-out" />

              <p className="text-xs font-mono text-text-muted mb-6">{s.number}</p>
              <h3 className="text-lg font-medium text-text-primary mb-4 group-hover:text-white transition-colors">
                {s.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed font-light">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
