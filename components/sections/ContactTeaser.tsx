"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactTeaser() {
  return (
    <section className="w-full py-32 px-6 md:px-12 bg-bg-primary text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl mx-auto flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-5xl font-display text-text-primary mb-8 tracking-tight">
          Want to build something? Let's talk.
        </h2>
        <Link 
          href="/contact"
          className="inline-block px-8 py-4 border border-border-custom hover:border-accent-soft text-text-primary hover:bg-bg-elevated transition-colors duration-300 rounded-full font-light tracking-wide text-sm"
        >
          Get in touch
        </Link>
      </motion.div>
    </section>
  );
}
