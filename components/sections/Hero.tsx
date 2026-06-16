"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";

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
            // Prevent layout shift when blur animates
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

      // Tagline fade after letters settle
      animate(".hero-tagline", {
        opacity: [0, 1],
        translateY: [16, 0],
        ease: "outCubic",
        duration: 900,
        delay: 1400,
      });

      // Scroll cue last
      animate(".hero-scroll-line", {
        opacity: [0, 1],
        scaleY: [0, 1],
        ease: "outCubic",
        duration: 700,
        delay: 2000,
      });
    };

    run();
  }, []);

  return (
    <>
      {/* Ambient background canvas */}
      <AmbientCanvas />

      {/* Cursor flashlight */}
      <CursorSpotlight />

      {/* Hidden dot grid — only visible through the spotlight */}
      <div
        aria-hidden
        className="fixed inset-0 -z-[5] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 100%, black 100%)",
        }}
      />

      {/* Main hero content */}
      <section
        className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden"
        aria-label="Dinesh Abbi — Portfolio"
      >
        {/* Name block — center stage */}
        <div className="relative z-20 flex flex-col items-center select-none px-4">
          {/* LINE 1 */}
          <div
            className="font-display font-medium tracking-[0.08em] text-[clamp(4.5rem,13vw,10.5rem)] leading-none text-[#ebebeb]"
            style={{ letterSpacing: "0.06em" }}
          >
            <NameLine text={LINE1} />
          </div>

          {/* LINE 2 — italic, slightly smaller to break symmetry */}
          <div
            className="font-display italic font-light tracking-[0.12em] text-[clamp(3.8rem,11.5vw,9.5rem)] leading-none mt-[-0.04em]"
            style={{ color: "#c8c8c8" }}
          >
            <NameLine text={LINE2} delay={LINE1.length * 55} />
          </div>
        </div>

        {/* Tagline — single line, centered, below name */}
        <p
          className="hero-tagline relative z-20 mt-12 text-sm md:text-base font-light tracking-[0.25em] uppercase text-[#4a5568] opacity-0"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Building systems that work.
        </p>

        {/* Scroll cue — thin pulsing line at bottom center */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20">
          <div
            className="hero-scroll-line origin-top opacity-0"
            style={{ width: 1, height: 56, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)" }}
          />
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut", delay: 2.2 }}
            className="text-[10px] font-mono tracking-[0.3em] text-[#2d3748] uppercase"
          >
            scroll
          </motion.div>
        </div>
      </section>
    </>
  );
}
