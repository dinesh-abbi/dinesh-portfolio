"use client";

import { useEffect, useRef } from "react";

type Orb = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  alpha: number;
};

export default function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let W = 0;
    let H = 0;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // 4 large slow-moving ambient orbs — no hard edges
    const orbs: Orb[] = [
      { x: W * 0.2,  y: H * 0.3,  vx: 0.08, vy: 0.04,  r: W * 0.5, color: "20,35,80",   alpha: 0.22 },
      { x: W * 0.8,  y: H * 0.6,  vx: -0.06, vy: 0.05, r: W * 0.45, color: "60,20,10",   alpha: 0.12 },
      { x: W * 0.5,  y: H * 0.1,  vx: 0.04, vy: 0.07,  r: W * 0.4, color: "10,20,60",   alpha: 0.16 },
      { x: W * 0.3,  y: H * 0.85, vx: 0.05, vy: -0.04, r: W * 0.35, color: "40,15,5",    alpha: 0.09 },
    ];

    const draw = () => {
      // Deep background
      ctx.fillStyle = "#050810";
      ctx.fillRect(0, 0, W, H);

      // Animate and draw orbs
      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;
        // Gentle bounce at boundaries
        if (orb.x < -orb.r * 0.3 || orb.x > W + orb.r * 0.3) orb.vx *= -1;
        if (orb.y < -orb.r * 0.3 || orb.y > H + orb.r * 0.3) orb.vy *= -1;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grad.addColorStop(0, `rgba(${orb.color}, ${orb.alpha})`);
        grad.addColorStop(1, `rgba(${orb.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none w-full h-full"
    />
  );
}
