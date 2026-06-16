"use client";

import { useRef, useEffect } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "motion/react";
import { Database, Code2, Network } from "lucide-react";

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

// Massive Split-Screen Glass Panel
function SplitGlassPanel({
  opacity,
  y,
  step,
  title,
  highlight,
  description,
  metrics,
  Icon,
}: {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  step: string;
  title: string;
  highlight: string;
  description: string;
  metrics: string[];
  Icon: any;
}) {
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl px-6 md:px-0 z-20"
    >
      <div className="glass p-0 rounded-3xl backdrop-blur-2xl bg-[#0d1422]/70 border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Content */}
        <div className="p-10 md:p-14 md:w-3/5 relative z-10 border-r border-white/5">
          <p className="text-xs font-mono text-accent-blue tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-accent-blue" />
            {step}
          </p>
          <h2 className="text-3xl md:text-5xl font-display text-text-primary leading-tight mb-6">
            {title}{" "}
            <span className="italic text-accent-soft block mt-2">{highlight}</span>
          </h2>
          <p className="text-text-subtle font-light leading-relaxed text-sm md:text-lg mb-8">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            {metrics.map((metric, i) => (
              <div key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                {metric}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Visual Graphic */}
        <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-black/40 to-black/80 items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)]" />
          <div className="relative z-10 w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.2)]">
             <Icon size={48} className="text-accent-blue opacity-80" strokeWidth={1} />
          </div>
          
          {/* Decorative Code Lines */}
          <div className="absolute top-12 right-12 opacity-20">
            {Array.from({length: 6}).map((_, i) => (
              <div key={i} className="h-1 bg-accent-blue rounded-full mb-3" style={{ width: Math.random() * 60 + 40 + 'px' }} />
            ))}
          </div>
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

  // Condense ranges: total height is 300vh
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
            ENTERPRISE SCALE
          </motion.div>
          <motion.div style={{ y: bgTextY2 }} className="whitespace-nowrap font-display text-[20vw] leading-none font-bold text-transparent stroke-text ml-[-10vw]">
            AI INFRASTRUCTURE
          </motion.div>
        </div>

        {/* Canvas Background Layer */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

        {/* Frosted Glass Panels */}
        <SplitGlassPanel 
          opacity={panel1Opacity} 
          y={panel1Y} 
          step="01 / Infrastructure"
          title="Building the Backbone of"
          highlight="Tesseract & Trinetra."
          description="Designed secure authentication with SuperTokens and built real-time cluster tracking. Tesseract auto-generates, assigns, and grades MCQs across multiple engineering colleges. I don't build toys; I build systems running live across KMIT, NGIT, KMEC, and KMCE."
          metrics={["10,000+ Students", "Real-Time Tracking", "SuperTokens Auth"]}
          Icon={Network}
        />

        <SplitGlassPanel 
          opacity={panel2Opacity} 
          y={panel2Y} 
          step="02 / Research"
          title="Scaling Compute for"
          highlight="DrugParadigm & Tantrik."
          description="Built the entire frontend and monitoring dashboards for a 15-node GPU cluster dedicated to Alzheimer's research using Autodock Vina. Processed massive ligand-protein docking streams and visualized complex data at scale."
          metrics={["15 GPU Nodes", "Autodock Vina", "Data Visualization"]}
          Icon={Database}
        />

        <SplitGlassPanel 
          opacity={panel3Opacity} 
          y={panel3Y} 
          step="03 / Integration"
          title="Embedding AI with"
          highlight="Catalyst."
          description="A cross-platform React Native app with an embedded Gemini AI wellness coach. It tracks workouts, hydration, and nudges you when you're slipping. AI isn't a wrapper here; it's the core contextual driver of the user experience."
          metrics={["React Native", "Gemini AI", "Context-Aware"]}
          Icon={Code2}
        />

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
