"use client";

import { motion } from "motion/react";
import { Database, Layout, Server, Cpu, Code2, Globe } from "lucide-react";

export default function WhatIDo() {
  return (
    <section className="w-full py-24 md:py-36 px-6 md:px-12 bg-[#050810] relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-accent-blue/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24 max-w-2xl"
        >
          <p className="text-xs font-mono text-accent-blue tracking-[0.2em] uppercase mb-4">
            Expertise
          </p>
          <h2 className="text-3xl md:text-5xl font-display text-text-primary leading-tight">
            I don't just write code. <br />
            <em className="not-italic text-text-muted">I architect solutions.</em>
          </h2>
        </motion.div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          
          {/* Box 1: Full Stack (Large) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 glass rounded-3xl p-8 md:p-10 relative overflow-hidden group flex flex-col justify-end"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
              <Server size={120} strokeWidth={1} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1422] to-transparent opacity-90" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-display text-white mb-3">Full-Stack Engineering</h3>
              <p className="text-text-muted text-sm leading-relaxed max-w-md">
                From PostgreSQL schema design to responsive React UIs and NestJS REST APIs. I own the entire vertical slice and don't hand off between layers.
              </p>
            </div>
          </motion.div>

          {/* Box 2: AI (Tall) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:row-span-2 glass rounded-3xl p-8 relative overflow-hidden group border-t-accent-orange/30 border-t-2 flex flex-col"
          >
            <div className="w-14 h-14 rounded-full bg-accent-orange/10 flex items-center justify-center mb-auto">
              <Cpu className="text-accent-orange" size={24} />
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-display text-white mb-3">AI-Integrated Products</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Moving beyond basic wrappers. I build AI features like Gemini-powered assessment engines and embedded coaches that make products demonstrably smarter as first-class citizens.
              </p>
            </div>
          </motion.div>

          {/* Box 3: Frontend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass rounded-3xl p-8 relative overflow-hidden group"
          >
            <Layout className="text-accent-soft mb-6" size={28} />
            <h3 className="text-lg font-medium text-white mb-2">Frontend & UI/UX</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              React, Next.js, and complex state management with Redux. Pixel-perfect implementations.
            </p>
          </motion.div>

          {/* Box 4: Infrastructure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass rounded-3xl p-8 relative overflow-hidden group"
          >
            <Database className="text-accent-blue mb-6" size={28} />
            <h3 className="text-lg font-medium text-white mb-2">Infrastructure</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Playwright load testing, JupyterHub cluster management, and resilient system architecture.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
