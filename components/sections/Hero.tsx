"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";

// Load 3D and heavy interactive elements client-side only
const ParticleField = dynamic(() => import("@/components/three/ParticleField"), { ssr: false });
const CursorSpotlight = dynamic(() => import("@/components/ui/CursorSpotlight"), { ssr: false });
const AmbientCanvas = dynamic(() => import("@/components/ui/AmbientCanvas"), { ssr: false });

export default function Hero() {
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const run = async () => {
      const { animate, stagger } = await import("animejs");

      // Open Hero elements entrance animation
      animate(".hero-open-el", {
        opacity: [0, 1],
        translateY: [30, 0],
        filter: ["blur(10px)", "blur(0px)"],
        ease: "outExpo",
        duration: 1400,
        delay: stagger(120, { start: 300 }),
      });

      // Bottom details entrance
      animate(".hero-details-el", {
        opacity: [0, 0.95],
        translateY: [20, 0],
        ease: "outCubic",
        duration: 1000,
        delay: 1000,
      });

      // Marquee fade in
      animate(".hero-marquee", {
        opacity: [0, 1],
        translateY: [20, 0],
        ease: "outCubic",
        duration: 1000,
        delay: 1200,
      });
    };

    run();
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#050810]">
      {/* 1. Ambient Background Layer */}
      <AmbientCanvas />

      {/* 2. Interactive 3D Particles Layer */}
      <ParticleField />

      {/* 3. Cursor Flashlight Layer */}
      <CursorSpotlight />

      {/* 4. Open Typography Layer */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-16 pb-24 text-left pointer-events-none">
        
        {/* Top bar */}
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto pointer-events-auto">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            <span className="font-display font-bold text-white text-sm tracking-wider">DA</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-orange"></span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-white/95 uppercase">System Online</span>
          </div>
        </div>

        {/* Center Text (Open & Elegant) */}
        <div className="max-w-4xl mx-auto text-center pointer-events-auto mt-24">
          <h1 className="hero-open-el opacity-0 text-4xl md:text-6xl lg:text-7xl font-display font-light text-white tracking-tight leading-none mb-3">
            Dinesh Abbi
          </h1>
          <p className="hero-open-el opacity-0 text-accent-blue font-mono text-xs md:text-sm uppercase tracking-[0.35em] mb-8">
            Systems Architect · AI Integrator
          </p>
          
          <div className="hero-open-el opacity-0 h-[1px] w-32 bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent mx-auto mb-8" />
          
          <p className="hero-open-el opacity-0 text-text-subtle font-light text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Building resilient, full-stack enterprise systems and scaling AI compute infrastructure for real-world impact.
          </p>
        </div>

        {/* Bottom Details Grid */}
        <div className="w-full pointer-events-auto max-w-6xl mx-auto border-t border-white/5 pt-8 hero-details-el opacity-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 text-center md:text-left">
            <div>
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block mb-2">Core Tech</span>
              <span className="text-sm font-light text-white/90">React · Next.js · Redux</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block mb-2">Backend</span>
              <span className="text-sm font-light text-white/90">NestJS · Node.js · APIs</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block mb-2">Compute & AI</span>
              <span className="text-sm font-light text-white/90">Gemini · GPU Clusters</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block mb-2">Databases</span>
              <span className="text-sm font-light text-white/90">PostgreSQL · MySQL</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Infinite Marquee Bottom Banner */}
      <div className="hero-marquee absolute bottom-0 left-0 w-full overflow-hidden border-t border-white/5 bg-[#050810]/80 backdrop-blur-md py-3 opacity-0 z-30 pointer-events-none">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex whitespace-nowrap text-[11px] font-mono tracking-[0.3em] uppercase text-[#4a5568]"
        >
          {Array(4)
            .fill("SOFTWARE ENGINEER · FULL STACK · AI INTEGRATION · SYSTEM ARCHITECTURE · ")
            .join("")}
        </motion.div>
      </div>
    </section>
  );
}
