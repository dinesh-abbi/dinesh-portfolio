"use client";

import { useRef, useEffect } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "motion/react";

// Procedural canvas animation — scrubbed by scroll progress (Castimedia mechanic)
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

      // Cinematic dual-tone background — blue top left, orange bottom right
      const bgGrad = ctx.createRadialGradient(w * 0.25, h * 0.35, 0, w * 0.25, h * 0.35, w * 0.8);
      bgGrad.addColorStop(0, `rgba(30, 58, 95, ${0.4 + p * 0.3})`);
      bgGrad.addColorStop(1, `rgba(8, 12, 20, 1)`);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Orange warm accent — scrubbed by scroll
      const ogGrad = ctx.createRadialGradient(w * (0.6 + p * 0.2), h * (0.5 + p * 0.3), 0, w * (0.6 + p * 0.2), h * (0.5 + p * 0.3), w * 0.55);
      ogGrad.addColorStop(0, `rgba(249, 115, 22, ${0.08 + p * 0.1})`);
      ogGrad.addColorStop(1, "transparent");
      ctx.fillStyle = ogGrad;
      ctx.fillRect(0, 0, w, h);

      // Particles — speed + glow intensity driven by scroll
      particles.forEach((particle) => {
        particle.x += particle.vx * (1 + p * 2);
        particle.y += particle.vy * (1 + p * 2);
        if (particle.x < 0) particle.x = w;
        if (particle.x > w) particle.x = 0;
        if (particle.y < 0) particle.y = h;
        if (particle.y > h) particle.y = 0;

        ctx.save();
        ctx.globalAlpha = particle.alpha * (0.5 + p * 0.8);
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 8 + p * 16;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.restore();
      });

      // Horizon line — expands on scroll
      const lineW = w * (0.15 + p * 0.7);
      const lineX = (w - lineW) / 2;
      const lineY = h * 0.62;
      const lineGrad = ctx.createLinearGradient(lineX, 0, lineX + lineW, 0);
      lineGrad.addColorStop(0, "transparent");
      lineGrad.addColorStop(0.4, `rgba(59, 130, 246, ${0.4 + p * 0.4})`);
      lineGrad.addColorStop(0.6, `rgba(249, 115, 22, ${0.3 + p * 0.3})`);
      lineGrad.addColorStop(1, "transparent");
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(lineX, lineY);
      ctx.lineTo(lineX + lineW, lineY);
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, progress]);
}

// Overlay text panel shown at a specific scroll range
function TextPanel({
  children,
  opacity,
  x,
  align = "left",
}: {
  children: React.ReactNode;
  opacity: MotionValue<number>;
  x: MotionValue<number>;
  align?: "left" | "right" | "center";
}) {
  return (
    <motion.div
      style={{ opacity, x }}
      className={`absolute top-1/2 -translate-y-1/2 max-w-sm z-10 ${
        align === "right" ? "right-16 text-right" : align === "center" ? "left-1/2 -translate-x-1/2 text-center" : "left-16"
      }`}
    >
      {children}
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

  // Panel 1: 0%–25% scroll
  const panel1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.28], [0, 1, 1, 0]);
  const panel1X = useTransform(scrollYProgress, [0, 0.1], [-40, 0]);

  // Panel 2: 30%–55% scroll
  const panel2Opacity = useTransform(scrollYProgress, [0.3, 0.38, 0.5, 0.58], [0, 1, 1, 0]);
  const panel2X = useTransform(scrollYProgress, [0.3, 0.38], [40, 0]);

  // Panel 3: 60%–85% scroll
  const panel3Opacity = useTransform(scrollYProgress, [0.6, 0.68, 0.8, 0.88], [0, 1, 1, 0]);
  const panel3X = useTransform(scrollYProgress, [0.6, 0.68], [-40, 0]);

  return (
    <section ref={sectionRef} className="relative h-[500vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Canvas fills the entire sticky viewport */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Overlay text panels — Castimedia spec: 0% left · 30% right · 60% left */}
        <TextPanel opacity={panel1Opacity} x={panel1X} align="left">
          <p className="text-xs font-mono text-accent-blue tracking-[0.2em] uppercase mb-3">
            01 / Background
          </p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary leading-tight mb-4">
            3+ Years Building{" "}
            <span className="italic text-accent-soft">Production Systems</span>
          </h2>
          <p className="text-text-muted font-light leading-relaxed text-sm">
            From enterprise platforms serving 10,000+ students to AI infrastructure on GPU clusters — I build things that scale.
          </p>
        </TextPanel>

        <TextPanel opacity={panel2Opacity} x={panel2X} align="right">
          <p className="text-xs font-mono text-accent-orange tracking-[0.2em] uppercase mb-3">
            02 / Approach
          </p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary leading-tight mb-4">
            End-to-End{" "}
            <span className="italic text-orange-400">Ownership</span>
          </h2>
          <p className="text-text-muted font-light leading-relaxed text-sm">
            Schema design, REST APIs, security, responsive UI — I own the full lifecycle and ship on time.
          </p>
        </TextPanel>

        <TextPanel opacity={panel3Opacity} x={panel3X} align="left">
          <p className="text-xs font-mono text-accent-soft tracking-[0.2em] uppercase mb-3">
            03 / Now
          </p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary leading-tight mb-4">
            Integrating{" "}
            <span className="italic text-accent-soft">AI into Real Products</span>
          </h2>
          <p className="text-text-muted font-light leading-relaxed text-sm">
            From Gemini-powered grading engines to wellness coaches — I build AI features that make real products meaningfully smarter.
          </p>
        </TextPanel>

        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-blue via-accent-soft to-accent-orange"
        />
      </div>
    </section>
  );
}
