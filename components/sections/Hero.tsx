"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

// Load 3D and heavy interactive elements client-side only
const ParticleField = dynamic(() => import("@/components/three/ParticleField"), { ssr: false });
const CursorSpotlight = dynamic(() => import("@/components/ui/CursorSpotlight"), { ssr: false });
const AmbientCanvas = dynamic(() => import("@/components/ui/AmbientCanvas"), { ssr: false });

export default function Hero() {
  const hasAnimated = useRef(false);

  // 3D Tilt effect for the HUD Card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(useSpring(mouseY, { stiffness: 150, damping: 20 }), [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(useSpring(mouseX, { stiffness: 150, damping: 20 }), [-0.5, 0.5], [-15, 15]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const run = async () => {
      const { animate, stagger } = await import("animejs");

      // HUD elements entrance animation
      animate(".hud-element", {
        opacity: [0, 1],
        translateY: [20, 0],
        filter: ["blur(10px)", "blur(0px)"],
        ease: "outExpo",
        duration: 1200,
        delay: stagger(100, { start: 400 }),
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
    <section className="relative w-full h-screen overflow-hidden bg-[#050810] perspective-[1000px]">
      {/* 1. Ambient Background Layer */}
      <AmbientCanvas />

      {/* 2. Interactive 3D Particles Layer */}
      <ParticleField />

      {/* 3. Cursor Flashlight Layer */}
      <CursorSpotlight />

      {/* 4. Sleek HUD Card Layer */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        
        {/* The 3D tilting container — enable pointer events here so it tracks mouse */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="pointer-events-auto relative w-full max-w-sm md:max-w-md cursor-crosshair"
        >
          {/* Glass Card */}
          <div className="glass bg-[#0d1422]/70 backdrop-blur-3xl rounded-[2rem] p-8 md:p-10 border border-white/10 shadow-[0_0_80px_rgba(59,130,246,0.15)] relative overflow-hidden group">
            
            {/* Top right animated pulse */}
            <div className="absolute top-8 right-8 flex items-center gap-2 hud-element opacity-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-orange"></span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">System Online</span>
            </div>

            {/* Profile Avatar/Logo */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue/20 to-transparent border border-accent-blue/30 flex items-center justify-center mb-8 hud-element opacity-0 shadow-inner">
              <span className="font-display font-bold text-white text-xl tracking-wider">DA</span>
            </div>

            {/* Name & Title */}
            <div className="hud-element opacity-0">
              <h1 className="text-3xl md:text-4xl font-display text-white tracking-wide mb-2">
                Dinesh Abbi
              </h1>
              <p className="text-accent-blue font-mono text-xs uppercase tracking-[0.2em] mb-6">
                Systems Architect · AI Integrator
              </p>
            </div>

            <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent mb-6 hud-element opacity-0" />

            {/* Micro Data Grid */}
            <div className="grid grid-cols-2 gap-4 hud-element opacity-0">
              <div>
                <p className="text-[10px] text-text-muted font-mono uppercase tracking-widest mb-1">Stack</p>
                <p className="text-sm text-text-primary font-light">React 19 / Next.js</p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted font-mono uppercase tracking-widest mb-1">Backend</p>
                <p className="text-sm text-text-primary font-light">Node / PostgreSQL</p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted font-mono uppercase tracking-widest mb-1">AI</p>
                <p className="text-sm text-text-primary font-light">Gemini / LLMs</p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted font-mono uppercase tracking-widest mb-1">Location</p>
                <p className="text-sm text-text-primary font-light">Hyderabad</p>
              </div>
            </div>

            {/* Interactive Glow that follows mouse inside card */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-accent-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none" 
            />
          </div>
        </motion.div>
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
