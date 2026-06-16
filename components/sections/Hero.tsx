"use client";

import { useEffect } from "react";
import anime from "animejs";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Lazy load the 3D canvas so it doesn't block initial page render
const HeroShape = dynamic(() => import("../three/HeroShape"), { ssr: false });

export default function Hero() {
  const nameText = "Dinesh Abbi.";
  const nameChars = Array.from(nameText);

  useEffect(() => {
    anime.timeline({ loop: false })
      .add({
        targets: ".hero-name-char",
        translateY: [40, 0],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 100 + 40 * i,
      })
      .add({
        targets: ".hero-subtitle",
        opacity: [0, 1],
        translateY: [20, 0],
        easing: "easeOutCubic",
        duration: 800,
      }, "-=600")
      .add({
        targets: ".hero-scroll",
        opacity: [0, 1],
        easing: "easeOutCubic",
        duration: 800,
      }, "-=400");
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center overflow-hidden">
      <HeroShape />

      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-center">
        <h1 className="hero-name flex flex-wrap text-6xl md:text-8xl lg:text-[7rem] font-display text-text-primary leading-tight mb-6 tracking-tight">
          {nameChars.map((char, index) => (
            <span
              key={index}
              className="hero-name-char inline-block opacity-0"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </span>
          ))}
        </h1>

        <p className="hero-subtitle opacity-0 max-w-2xl text-lg md:text-xl text-text-muted font-light leading-relaxed tracking-wide">
          I build software systems, end to end — and lately, I'm teaching myself what's next in AI.
        </p>
      </div>

      <div className="hero-scroll opacity-0 absolute bottom-12 left-6 md:left-12 flex flex-col gap-2 items-center pointer-events-none">
        <span className="text-[10px] uppercase tracking-widest text-text-muted font-mono rotate-90 origin-left translate-y-8">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-border-custom overflow-hidden mt-6">
          <motion.div
            className="w-full h-full bg-accent-blue"
            animate={{ translateY: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}
