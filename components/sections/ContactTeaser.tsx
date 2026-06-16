"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function ContactTeaser() {
  return (
    <section className="w-full py-32 md:py-40 px-6 md:px-12 bg-bg-primary overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-6xl mx-auto text-center relative"
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] rounded-full opacity-[0.05] blur-[100px] bg-accent-blue" />
        </div>

        <p className="text-xs font-mono text-accent-blue tracking-[0.2em] uppercase mb-6">
          Let's Build
        </p>
        <h2 className="text-4xl md:text-6xl font-display text-text-primary leading-tight mb-8 max-w-2xl mx-auto text-balance">
          Want to build something?{" "}
          <em className="not-italic text-text-muted">Let's talk.</em>
        </h2>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-3 px-8 py-4 border border-border-glass hover:border-border-blue text-text-primary text-sm font-medium rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]"
        >
          Get in Touch
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </section>
  );
}
