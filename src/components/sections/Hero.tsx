import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { animate, createTimeline, stagger } from "animejs";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameText = "Dinesh Abbi";
  const nameChars = Array.from(nameText);

  // Floating Particle Canvas driven by Anime.js
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(canvas.width / 15), 90);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          alpha: Math.random() * 0.5 + 0.2
        });
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Use Anime.js update loop to tick and draw particles
    const tick = animate({}, {
      duration: Infinity,
      autoplay: true,
      onUpdate: () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p) => {
          // Update position
          p.x += p.vx;
          p.y += p.vy;

          // Boundaries checking (wrap around)
          if (p.x < 0) p.x = canvas.width;
          else if (p.x > canvas.width) p.x = 0;

          if (p.y < 0) p.y = canvas.height;
          else if (p.y > canvas.height) p.y = 0;

          // Draw particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(96, 165, 250, ${p.alpha})`; // Light blue color
          ctx.fill();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(59, 130, 246, ${0.07 * (1 - dist / 100)})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      tick.pause();
    };
  }, []);

  // Text Entrance Timings
  useEffect(() => {
    const tl = createTimeline({
      defaults: { ease: "outCubic" }
    });

    tl.add(".hero-greet", {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 700
    })
    .add(".hero-name-char", {
      opacity: [0, 1],
      translateY: [15, 0],
      scale: [0.8, 1],
      delay: stagger(60),
      duration: 350
    }, "+=100")
    .add(".hero-role", {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 650
    }, "+=200")
    .add(".hero-ctas", {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 550
    }, "-=300")
    .add(".hero-scroll-btn", {
      opacity: [0, 1],
      duration: 500
    }, "-=200");

    // Bouncing scroll indicator loop using Anime.js
    animate(".hero-scroll-arrow", {
      translateY: [0, 8],
      duration: 1000,
      direction: "alternate",
      loop: true,
      ease: "inOutSine"
    });
  }, []);

  return (
    <section className="relative w-full h-[calc(100vh-80px)] min-h-[600px] flex items-center justify-center px-6 md:px-12 bg-bg-primary overflow-hidden select-none">
      {/* Canvas for Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
        {/* Greeting */}
        <p className="hero-greet opacity-0 text-accent-blue-light font-mono text-lg md:text-xl font-medium tracking-widest mb-4">
          Hi, I'm
        </p>

        {/* Character by character typing name */}
        <h1 className="hero-name flex flex-wrap justify-center text-5xl md:text-8xl font-bold tracking-tight text-text-primary mb-6">
          {nameChars.map((char, index) => (
            <span
              key={index}
              className="hero-name-char inline-block opacity-0 select-text"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Role line */}
        <p className="hero-role opacity-0 text-text-secondary text-lg md:text-2xl font-medium tracking-wide max-w-2xl mb-10 select-text">
          Software Developer <span className="text-accent-blue font-light">·</span> Full Stack <span className="text-accent-blue font-light">·</span> AI Systems
        </p>

        {/* CTA Buttons */}
        <div className="hero-ctas opacity-0 flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/projects"
            className="w-full sm:w-auto px-8 py-3.5 bg-accent-blue hover:bg-accent-blue-light text-text-primary font-medium rounded-lg shadow-lg shadow-accent-blue/25 hover:shadow-accent-blue-light/35 flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            View My Work
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-3.5 bg-bg-secondary hover:bg-bg-secondary/80 text-text-primary border border-border-custom hover:border-accent-blue font-medium rounded-lg flex items-center justify-center transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Get In Touch
          </Link>
        </div>
      </div>

      {/* Scroll indicator bouncing arrow */}
      <div className="hero-scroll-btn opacity-0 absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 z-10 pointer-events-none">
        <span className="text-xs font-mono text-text-secondary/60 tracking-widest uppercase">
          Scroll
        </span>
        <ChevronDown className="hero-scroll-arrow text-accent-blue-light" size={24} />
      </div>
    </section>
  );
}
