"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Database, Layout, Server, Cpu, Bot } from "lucide-react";

// Terminal typing animation component
function TerminalEffect() {
  const lines = [
    "> initializing cluster...",
    "> node 1: online",
    "> node 2: online",
    "> syncing volumes...",
    "> deploy success"
  ];
  
  const [currentLines, setCurrentLines] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < lines.length) {
      const timer = setTimeout(() => {
        setCurrentLines(prev => [...prev, lines[index]]);
        setIndex(index + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      const reset = setTimeout(() => {
        setCurrentLines([]);
        setIndex(0);
      }, 2000);
      return () => clearTimeout(reset);
    }
  }, [index, lines]);

  return (
    <div className="font-mono text-[10px] text-accent-blue/80 opacity-60 bg-black/40 p-4 rounded-xl border border-white/5 absolute top-6 right-6 w-48 shadow-inner">
      {currentLines.map((line, i) => (
        <div key={i} className="mb-1">{line}</div>
      ))}
      <div className="animate-pulse inline-block w-2 h-3 bg-accent-blue/80 ml-1" />
    </div>
  );
}

// Flow animation component
function DataFlowEffect() {
  return (
    <div className="absolute top-0 right-0 bottom-0 w-64 pointer-events-none overflow-hidden opacity-20 group-hover:opacity-40 transition-opacity duration-700">
      <div className="absolute top-10 right-20 w-32 h-1 bg-gradient-to-r from-transparent to-accent-blue rounded-full overflow-hidden">
        <motion.div
          animate={{ x: [-100, 100] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-10 h-full bg-white shadow-[0_0_10px_white]"
        />
      </div>
      <div className="absolute top-24 right-10 w-48 h-1 bg-gradient-to-r from-transparent to-accent-soft rounded-full overflow-hidden">
        <motion.div
          animate={{ x: [-150, 150] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 0.5 }}
          className="w-16 h-full bg-white shadow-[0_0_10px_white]"
        />
      </div>
      <div className="absolute top-36 right-24 w-24 h-1 bg-gradient-to-r from-transparent to-accent-orange rounded-full overflow-hidden">
        <motion.div
          animate={{ x: [-80, 80] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear", delay: 1 }}
          className="w-8 h-full bg-white shadow-[0_0_10px_white]"
        />
      </div>
    </div>
  );
}

// AI Pulse Node
function AINodeEffect() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
      <div className="relative w-48 h-48">
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute inset-0 border border-accent-orange rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.5 }}
          className="absolute inset-4 border border-accent-orange/60 rounded-full"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="absolute inset-8 border border-dashed border-accent-orange/40 rounded-full"
        />
      </div>
    </div>
  );
}

// BLE Signal waves
function BLESignalEffect() {
  return (
    <div className="absolute top-1/2 right-12 -translate-y-1/2 flex items-center gap-1.5 opacity-20 group-hover:opacity-50 transition-opacity">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          animate={{ height: [8, 32, 8] }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "easeInOut",
            delay: i * 0.15
          }}
          className="w-1 bg-accent-blue rounded-full"
        />
      ))}
    </div>
  );
}

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
            <DataFlowEffect />
            <div className="absolute top-8 right-8 text-white/20 group-hover:text-accent-blue/40 transition-colors z-10">
              <Server size={48} strokeWidth={1} />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1422] via-[#0d1422]/80 to-transparent opacity-90" />
            
            <div className="relative z-10 max-w-md">
              <h3 className="text-2xl font-display text-white mb-3">Full-Stack Engineering</h3>
              <p className="text-text-muted text-sm leading-relaxed">
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
            <AINodeEffect />
            <div className="w-14 h-14 rounded-full bg-accent-orange/10 border border-accent-orange/20 flex items-center justify-center mb-auto relative z-10 shadow-[0_0_20px_rgba(249,115,22,0.2)]">
              <Cpu className="text-accent-orange" size={24} />
            </div>
            <div className="mt-8 relative z-10">
              <h3 className="text-xl font-display text-white mb-3 group-hover:text-accent-orange transition-colors">AI-Integrated Products</h3>
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
            className="glass rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-end"
          >
            {/* Interactive Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1422] to-transparent opacity-90" />
            
            <div className="absolute top-8 right-8">
              <Layout className="text-accent-soft opacity-40 group-hover:opacity-100 transition-opacity" size={32} strokeWidth={1.5} />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-display text-white mb-2">Frontend & UI/UX</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                React, Next.js, and complex state management with Redux. Pixel-perfect implementations.
              </p>
            </div>
          </motion.div>

          {/* Box 4: Infrastructure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-end"
          >
            <TerminalEffect />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1422] to-transparent opacity-90" />
            
            <div className="absolute top-8 left-8">
              <Database className="text-accent-blue opacity-40 group-hover:opacity-100 transition-opacity" size={32} strokeWidth={1.5} />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-display text-white mb-2 mt-12">Infrastructure</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Playwright load testing, JupyterHub cluster management, and resilient system architecture.
              </p>
            </div>
          </motion.div>

          {/* Box 5: Robotics & Hardware (Wide, bottom row) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-3 glass rounded-3xl p-8 md:p-10 relative overflow-hidden group flex flex-col justify-end"
          >
            <BLESignalEffect />
            <div className="absolute top-8 left-8 text-white/20 group-hover:text-accent-blue/40 transition-colors z-10">
              <Bot size={40} strokeWidth={1} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1422] via-[#0d1422]/80 to-transparent opacity-90" />

            <div className="relative z-10 max-w-2xl">
              <h3 className="text-xl font-display text-white mb-3">Robotics & Hardware Integration</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Engineered and programmed bipedal, humanoid, and quadruped robots from scratch using Arduino Nano and ESP32-CAM. Developed custom Android apps to act as wireless remote controls over BLE, calibrated servos, and designed instructional curriculums.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
