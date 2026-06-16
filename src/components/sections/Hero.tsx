import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { animate, createTimeline, stagger } from "animejs";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useMagneticHover } from "../../hooks/useMagneticHover";

/* ─── Particle Configuration ─── */
const PARTICLE_COUNT_DIVISOR = 12;
const MAX_PARTICLES = 110;
const CONNECTION_DIST = 130;
const MOUSE_REPEL_DIST = 100;
const MOUSE_REPEL_STRENGTH = 2.5;

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const nameText = "Dinesh Abbi";
  const nameChars = Array.from(nameText);

  const primaryBtn = useMagneticHover(0.4);
  const secondaryBtn = useMagneticHover(0.4);

  /* ─── Interactive Particle Canvas ─── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Particle = {
      x: number; y: number;
      radius: number;
      vx: number; vy: number;
      baseVx: number; baseVy: number;
      alpha: number;
      hue: number;
    };

    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor(canvas.width / PARTICLE_COUNT_DIVISOR), MAX_PARTICLES);
      for (let i = 0; i < count; i++) {
        const bvx = (Math.random() - 0.5) * 0.45;
        const bvy = (Math.random() - 0.5) * 0.45;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2.2 + 0.8,
          vx: bvx, vy: bvy,
          baseVx: bvx, baseVy: bvy,
          alpha: Math.random() * 0.55 + 0.15,
          hue: 200 + Math.random() * 40, // blue-cyan range
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const tick = animate({}, {
      duration: Infinity,
      autoplay: true,
      onUpdate: () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const mouse = mouseRef.current;

        particles.forEach((p) => {
          // Mouse repulsion
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_REPEL_DIST) {
            const force = (MOUSE_REPEL_DIST - dist) / MOUSE_REPEL_DIST;
            p.vx += (dx / dist) * force * MOUSE_REPEL_STRENGTH * 0.08;
            p.vy += (dy / dist) * force * MOUSE_REPEL_STRENGTH * 0.08;
          }
          // Ease back to base velocity
          p.vx += (p.baseVx - p.vx) * 0.04;
          p.vy += (p.baseVy - p.vy) * 0.04;

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = canvas.width;
          else if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          else if (p.y > canvas.height) p.y = 0;

          // Draw particle with glow
          const closeness = dist < MOUSE_REPEL_DIST ? (1 - dist / MOUSE_REPEL_DIST) : 0;
          const r = p.radius + closeness * 1.5;
          const a = Math.min(p.alpha + closeness * 0.4, 1);
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${a})`;
          ctx.fill();
          if (closeness > 0.2) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = `hsla(${p.hue}, 100%, 70%, ${closeness * 0.6})`;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < CONNECTION_DIST) {
              const opacity = (1 - d / CONNECTION_DIST) * 0.18;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`;
              ctx.lineWidth = 0.7;
              ctx.stroke();
            }
          }
        }
      }
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      tick.pause();
    };
  }, []);

  /* ─── Clip-path text reveal entrance ─── */
  useEffect(() => {
    const tl = createTimeline({ defaults: { ease: "outCubic" } });

    tl.add(".hero-greet", {
      clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
      opacity: [0, 1],
      duration: 800,
    })
    .add(".hero-name-char", {
      opacity: [0, 1],
      translateY: [40, 0],
      rotateX: [90, 0],
      scale: [0.6, 1],
      delay: stagger(55),
      duration: 500,
    }, "-=200")
    .add(".hero-role", {
      clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
      opacity: [0, 1],
      duration: 700,
    }, "-=100")
    .add(".hero-tags", {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: stagger(80),
      duration: 450,
    }, "-=400")
    .add(".hero-ctas", {
      opacity: [0, 1],
      translateY: [25, 0],
      duration: 550,
    }, "-=300")
    .add(".hero-scroll-btn", {
      opacity: [0, 1],
      duration: 400,
    }, "-=200");

    // Looping scroll bounce
    animate(".hero-scroll-arrow", {
      translateY: [0, 9],
      duration: 1100,
      direction: "alternate",
      loop: true,
      ease: "inOutSine",
    });

    // Ambient glow pulse on the hero bg orb
    animate(".hero-orb", {
      scale: [1, 1.15, 1],
      opacity: [0.25, 0.45, 0.25],
      duration: 5000,
      loop: true,
      ease: "inOutSine",
    });
  }, []);

  return (
    <section className="relative w-full h-[calc(100vh-80px)] min-h-[640px] flex items-center justify-center px-6 md:px-12 bg-bg-primary overflow-hidden select-none">
      {/* Canvas — interactive particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      />

      {/* Ambient radial glows */}
      <div className="hero-orb absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)" }}
      />
      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)" }}
      />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">

        {/* Greeting — clip-path reveal */}
        <div className="overflow-hidden mb-3">
          <p className="hero-greet opacity-0 text-accent-blue-light font-mono text-base md:text-lg font-medium tracking-[0.3em] uppercase">
            Hi, I'm
          </p>
        </div>

        {/* Name — char-by-char 3D flip */}
        <h1 className="hero-name flex flex-wrap justify-center text-6xl md:text-9xl font-extrabold tracking-tight text-text-primary mb-5 leading-none"
          style={{ perspective: "600px" }}>
          {nameChars.map((char, i) => (
            <span
              key={i}
              className="hero-name-char inline-block opacity-0 select-text"
              style={{
                whiteSpace: char === " " ? "pre" : "normal",
                transformOrigin: "center bottom",
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Role — clip-path reveal */}
        <div className="overflow-hidden mb-6">
          <p className="hero-role opacity-0 text-text-secondary text-xl md:text-2xl font-light tracking-wide">
            Software Developer &nbsp;
            <span className="text-accent-blue">·</span>&nbsp; Full Stack &nbsp;
            <span className="text-accent-blue">·</span>&nbsp; AI Systems
          </p>
        </div>

        {/* Tag pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {["Python", "React", "Node.js", "PostgreSQL", "GPU Infra"].map((tag) => (
            <span
              key={tag}
              className="hero-tags opacity-0 px-3 py-1 text-xs font-mono rounded-full border border-accent-blue/30 bg-accent-blue/8 text-accent-blue-light"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Buttons with magnetic effect */}
        <div className="hero-ctas opacity-0 flex flex-col sm:flex-row items-center gap-4">
          <span
            ref={primaryBtn.ref as React.RefObject<HTMLSpanElement>}
            onMouseMove={primaryBtn.onMouseMove as unknown as React.MouseEventHandler<HTMLSpanElement>}
            onMouseLeave={primaryBtn.onMouseLeave}
            className="inline-block"
          >
            <Link
              to="/projects"
              className="relative group px-8 py-3.5 bg-accent-blue text-white font-semibold rounded-full shadow-lg shadow-accent-blue/30 hover:shadow-accent-blue/50 flex items-center gap-2 transition-shadow duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent-blue via-blue-400 to-accent-blue bg-[length:200%] group-hover:bg-right-center transition-all duration-500 opacity-0 group-hover:opacity-100 rounded-full" />
              <span className="relative">View My Work</span>
              <ArrowRight size={17} className="relative group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </span>

          <span
            ref={secondaryBtn.ref as React.RefObject<HTMLSpanElement>}
            onMouseMove={secondaryBtn.onMouseMove as unknown as React.MouseEventHandler<HTMLSpanElement>}
            onMouseLeave={secondaryBtn.onMouseLeave}
            className="inline-block"
          >
            <Link
              to="/contact"
              className="group px-8 py-3.5 border border-border-custom hover:border-accent-blue text-text-primary font-semibold rounded-full flex items-center gap-2 backdrop-blur-sm bg-white/3 hover:bg-accent-blue/8 transition-all duration-300"
            >
              Get In Touch
            </Link>
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-btn opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10 pointer-events-none">
        <span className="text-[10px] font-mono text-text-secondary/50 tracking-[0.25em] uppercase">Scroll</span>
        <ChevronDown className="hero-scroll-arrow text-accent-blue-light/70" size={22} />
      </div>
    </section>
  );
}
