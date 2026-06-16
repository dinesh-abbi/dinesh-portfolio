"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

const HeroShape = dynamic(() => import("@/components/three/HeroShape"), {
  ssr: false,
});

const TITLE = "Dinesh Abbi";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Anime.js v4 character reveal
  useEffect(() => {
    const load = async () => {
      const { animate } = await import("animejs");

      animate(".hero-char", {
        translateY: [60, 0],
        opacity: [0, 1],
        ease: "outExpo",
        duration: 1400,
        delay: (_el: Element, i: number) => 80 + i * 55,
      });

      animate(".hero-sub", {
        opacity: [0, 1],
        translateY: [24, 0],
        ease: "outCubic",
        duration: 900,
        delay: 900,
      });

      animate(".hero-meta", {
        opacity: [0, 1],
        translateY: [16, 0],
        ease: "outCubic",
        duration: 700,
        delay: 1200,
      });

      animate(".hero-cta", {
        opacity: [0, 1],
        translateY: [12, 0],
        ease: "outCubic",
        duration: 700,
        delay: 1400,
      });
    };
    load();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-bg-primary"
    >
      {/* Castimedia cinematic background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50vw] h-[70vh] rounded-full opacity-[0.07] blur-[120px] bg-accent-orange" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[60vh] rounded-full opacity-[0.06] blur-[100px] bg-accent-blue" />
        <div className="absolute top-[30%] left-[30%] w-[30vw] h-[30vh] rounded-full opacity-[0.04] blur-[80px] bg-accent-blue" />
      </div>

      {/* 3D canvas — right side */}
      <div className="absolute right-0 top-0 bottom-0 w-[55%] lg:w-[50%] pointer-events-none">
        <HeroShape />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-20">
        <div className="max-w-2xl">
          {/* Label */}
          <p className="hero-meta opacity-0 inline-flex items-center gap-2 text-xs font-mono text-accent-blue tracking-[0.2em] uppercase mb-8">
            <span className="w-6 h-[1px] bg-accent-blue" />
            Software Developer · Full-Stack
          </p>

          {/* Name */}
          <h1 className="hero-name flex flex-wrap text-[clamp(3.5rem,8vw,6.5rem)] font-display font-medium leading-[0.95] tracking-tight text-text-primary mb-8">
            {TITLE.split("").map((char, i) => (
              <span
                key={i}
                className="hero-char inline-block opacity-0"
                style={{ whiteSpace: char === " " ? "pre" : "normal" }}
              >
                {char}
              </span>
            ))}
          </h1>

          {/* Tagline */}
          <p className="hero-sub opacity-0 text-xl md:text-2xl text-text-subtle font-light leading-relaxed max-w-xl mb-10">
            I build full-stack systems end-to-end —{" "}
            <em className="not-italic text-text-muted">
              and increasingly, integrate AI into real products.
            </em>
          </p>

          {/* CTAs */}
          <div className="hero-cta opacity-0 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-accent-blue text-white text-sm font-medium rounded-full hover:bg-blue-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
            >
              See My Work
              <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-border-glass text-text-subtle text-sm font-medium rounded-full hover:border-border-blue hover:text-text-primary transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>

          {/* Tech stack pill row */}
          <div className="hero-meta opacity-0 flex flex-wrap gap-2 mt-12">
            {["React", "TypeScript", "NestJS", "PostgreSQL", "React Native", "Gemini API"].map((t) => (
              <span
                key={t}
                className="text-[11px] font-mono text-text-muted px-3 py-1 border border-border-glass rounded-full hover:border-border-blue hover:text-text-subtle transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-transparent via-border-blue to-transparent"
        />
      </div>
    </section>
  );
}
