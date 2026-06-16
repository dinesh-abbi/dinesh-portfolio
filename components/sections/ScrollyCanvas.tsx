"use client";

import { useRef, useEffect } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "motion/react";

function useScrollCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>, progress: { get: () => number }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;
    const TOTAL_PARTICLES = 140;

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      radius: number;
      color: string;
      alpha: number;
    };

    const particles: Particle[] = Array.from({ length: TOTAL_PARTICLES }, () => ({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.4,
      color: Math.random() > 0.5 ? "#3b82f6" : "#f97316",
      alpha: Math.random() * 0.5 + 0.15,
    }));

    const draw = () => {
      const p = progress.get(); // 0 → 1
      const w = W();
      const h = H();

      ctx.clearRect(0, 0, w, h);

      // Deep cinematic base
      const bgGrad = ctx.createRadialGradient(w * 0.25, h * 0.35, 0, w * 0.25, h * 0.35, w * 0.8);
      bgGrad.addColorStop(0, `rgba(30, 58, 95, ${0.2 + p * 0.5})`); // Intensifies on scroll
      bgGrad.addColorStop(1, `#050810`);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Orange warp flare
      const ogGrad = ctx.createRadialGradient(w * (0.6 + p * 0.2), h * (0.5 + p * 0.3), 0, w * (0.6 + p * 0.2), h * (0.5 + p * 0.3), w * 0.55);
      ogGrad.addColorStop(0, `rgba(249, 115, 22, ${0.05 + p * 0.25})`);
      ogGrad.addColorStop(1, "transparent");
      ctx.fillStyle = ogGrad;
      ctx.fillRect(0, 0, w, h);

      // Accelerated particles
      particles.forEach((particle) => {
        // Particles fall faster as you scroll deeper (warp speed)
        particle.x += particle.vx * (1 + p * 4);
        particle.y += particle.vy * (1 + p * 4) + (p * 5);
        if (particle.x < 0) particle.x = w;
        if (particle.x > w) particle.x = 0;
        if (particle.y < 0) particle.y = h;
        if (particle.y > h) particle.y = 0;

        ctx.save();
        ctx.globalAlpha = particle.alpha * (0.5 + p * 1.5);
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 8 + p * 20;
        
        // Stretch particles vertically based on speed to create motion blur
        const stretch = 1 + (p * 8);
        ctx.beginPath();
        ctx.ellipse(particle.x, particle.y, particle.radius, particle.radius * stretch, 0, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.restore();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, progress]);
}

// Glass Panel 
function GlassPanel({
  children,
  opacity,
  y,
  align = "left",
}: {
  children: React.ReactNode;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  align?: "left" | "right" | "center";
}) {
  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute top-1/2 -translate-y-1/2 max-w-lg z-20 ${
        align === "right" ? "right-6 md:right-24" : align === "center" ? "left-1/2 -translate-x-1/2 text-center" : "left-6 md:left-24"
      }`}
    >
      <div className="glass p-8 md:p-12 rounded-3xl backdrop-blur-2xl bg-[#0d1422]/60 border border-white/5 shadow-2xl relative overflow-hidden">
        {/* Glow accent inside card */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-accent-blue/20 blur-3xl rounded-full pointer-events-none" />
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export default function ScrollyCanvas() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useScrollCanvas(canvasRef, scrollYProgress);

  // Background Massive Typography Parallax
  const bgTextY1 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const bgTextY2 = useTransform(scrollYProgress, [0, 1], ["20%", "-60%"]);

  // Condense ranges: total height is now 300vh instead of 500vh
  // Panel 1: 0%–30% scroll
  const panel1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.35], [0, 1, 1, 0]);
  const panel1Y = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.35], [60, 0, 0, -60]);

  // Panel 2: 35%–65% scroll
  const panel2Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
  const panel2Y = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [60, 0, 0, -60]);

  // Panel 3: 65%–100% scroll
  const panel3Opacity = useTransform(scrollYProgress, [0.65, 0.75, 0.9, 1], [0, 1, 1, 0]);
  const panel3Y = useTransform(scrollYProgress, [0.65, 0.75, 0.9, 1], [60, 0, 0, -60]);

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050810]">
        
        {/* Massive Background Outline Typography to fill empty space */}
        <div className="absolute inset-0 pointer-events-none z-0 flex flex-col justify-center overflow-hidden opacity-[0.03]">
          <motion.div style={{ y: bgTextY1 }} className="whitespace-nowrap font-display text-[20vw] leading-none font-bold text-transparent stroke-text">
            SYSTEM ARCHITECTURE
          </motion.div>
          <motion.div style={{ y: bgTextY2 }} className="whitespace-nowrap font-display text-[20vw] leading-none font-bold text-transparent stroke-text ml-[-10vw]">
            PRODUCTION READY
          </motion.div>
        </div>

        {/* Canvas Background Layer */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

        {/* Frosted Glass Panels */}
        <GlassPanel opacity={panel1Opacity} y={panel1Y} align="left">
          <p className="text-xs font-mono text-accent-blue tracking-[0.2em] uppercase mb-4">
            01 / Background
          </p>
          <h2 className="text-3xl md:text-5xl font-display text-text-primary leading-tight mb-6">
            3+ Years Building{" "}
            <span className="italic text-accent-soft block mt-1">At Scale.</span>
          </h2>
          <p className="text-text-subtle font-light leading-relaxed text-sm md:text-base">
            From enterprise platforms serving 10,000+ students to AI infrastructure on GPU clusters. I don't just write code; I design systems that hold up under pressure.
          </p>
        </GlassPanel>

        <GlassPanel opacity={panel2Opacity} y={panel2Y} align="right">
          <p className="text-xs font-mono text-accent-orange tracking-[0.2em] uppercase mb-4">
            02 / Approach
          </p>
          <h2 className="text-3xl md:text-5xl font-display text-text-primary leading-tight mb-6">
            End-to-End{" "}
            <span className="italic text-orange-400 block mt-1">Ownership.</span>
          </h2>
          <p className="text-text-subtle font-light leading-relaxed text-sm md:text-base">
            PostgreSQL schemas, REST APIs, middleware security, and responsive UI — I own the full lifecycle. No throwing code over the wall to another team.
          </p>
        </GlassPanel>

        <GlassPanel opacity={panel3Opacity} y={panel3Y} align="left">
          <p className="text-xs font-mono text-accent-soft tracking-[0.2em] uppercase mb-4">
            03 / Now
          </p>
          <h2 className="text-3xl md:text-5xl font-display text-text-primary leading-tight mb-6">
            Integrating AI{" "}
            <span className="italic text-accent-soft block mt-1">With Purpose.</span>
          </h2>
          <p className="text-text-subtle font-light leading-relaxed text-sm md:text-base">
            Moving beyond simple wrappers. I build AI features like Gemini-powered grading engines and context-aware health coaches that make real products demonstrably better.
          </p>
        </GlassPanel>

        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-blue via-accent-soft to-accent-orange z-30"
        />
      </div>
      
      {/* CSS for Outline Text */}
      <style dangerouslySetInnerHTML={{__html: `
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 1);
        }
      `}} />
    </section>
  );
}
