"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";

// Load 3D and heavy interactive elements client-side only
const ParticleField = dynamic(() => import("@/components/three/ParticleField"), { ssr: false });
const CursorSpotlight = dynamic(() => import("@/components/ui/CursorSpotlight"), { ssr: false });
const AmbientCanvas = dynamic(() => import("@/components/ui/AmbientCanvas"), { ssr: false });

// Split name into two rows with per-character spans
const LINE1 = "DINESH";
const LINE2 = "ABBI";

function NameLine({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <div className="flex items-center justify-center overflow-hidden">
      {text.split("").map((char, i) => (
        <span
          key={`${text}-${i}`}
          className="hero-char inline-block"
          style={{
            opacity: 0,
            filter: "blur(20px)",
            display: "inline-block",
            willChange: "opacity, filter, letter-spacing",
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const run = async () => {
      const { animate, stagger } = await import("animejs");

      // Character blur-condense reveal — the main event
      animate(".hero-char", {
        opacity: [0, 1],
        filter: ["blur(20px)", "blur(0px)"],
        ease: "outExpo",
        duration: 1200,
        delay: stagger(55, { start: 200 }),
      });

      // Tagline fade
      animate(".hero-tagline", {
        opacity: [0, 1],
        translateY: [16, 0],
        ease: "outCubic",
        duration: 900,
        delay: 1400,
      });

      // Marquee fade in
      animate(".hero-marquee", {
        opacity: [0, 1],
        translateY: [20, 0],
        ease: "outCubic",
        duration: 1000,
        delay: 1800,
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

      {/* 4. Typography Layer */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center select-none px-4">
          <div
            className="font-display font-medium tracking-[0.08em] text-[clamp(4.5rem,13vw,10.5rem)] leading-none text-[#ebebeb] mix-blend-exclusion"
            style={{ letterSpacing: "0.06em" }}
          >
            <NameLine text={LINE1} />
          </div>

          <div
            className="font-display italic font-light tracking-[0.12em] text-[clamp(3.8rem,11.5vw,9.5rem)] leading-none mt-[-0.04em] mix-blend-exclusion"
            style={{ color: "#c8c8c8" }}
          >
            <NameLine text={LINE2} delay={LINE1.length * 55} />
          </div>
        </div>

        <p
          className="hero-tagline mt-12 text-sm md:text-base font-light tracking-[0.25em] uppercase text-[#718096] opacity-0"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Building systems that work.
        </p>
      </div>

      {/* 5. Infinite Marquee Bottom Banner */}
      <div className="hero-marquee absolute bottom-0 left-0 w-full overflow-hidden border-t border-white/5 bg-black/40 backdrop-blur-md py-3 opacity-0 z-30">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex whitespace-nowrap text-[11px] font-mono tracking-[0.3em] uppercase text-[#4a5568]"
        >
          {Array(4)
            .fill("SOFTWARE DEVELOPER · FULL STACK · AI INTEGRATION · SYSTEM ARCHITECTURE · ")
            .join("")}
        </motion.div>
      </div>
    </section>
  );
}
