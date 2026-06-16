"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Full-Stack Engineering",
    description: "Building resilient web applications from database architecture to responsive interfaces. Focusing on type safety, scalable patterns, and flawless user experiences.",
  },
  {
    title: "AI-Integrated Products",
    description: "Embedding large language models into existing workflows. Generating context-aware assessments, automated grading, and personalized coaching interfaces.",
  },
  {
    title: "Infrastructure & Systems",
    description: "Deploying and managing high-performance environments. Orchestrating multi-GPU workloads, configuring secure gateways, and ensuring uptime for demanding research applications.",
  },
];

export default function WhatIDo() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="w-full py-32 px-6 md:px-12 bg-bg-primary">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 md:mb-24 max-w-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-6">
            What I do
          </h2>
          <p className="text-text-muted text-lg leading-relaxed font-light">
            I specialize in bridging the gap between complex backend systems and intuitive frontend interfaces. Whether it's training pipelines or user dashboards, I write code that works, scales, and stays out of the user's way.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item} className="flex flex-col relative pl-6">
              {/* Thin left border accent */}
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border-custom overflow-hidden">
                <motion.div
                  className="w-full h-full bg-accent-soft origin-top"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: "easeInOut" }}
                />
              </div>
              <h3 className="text-xl font-medium text-text-primary mb-4">{service.title}</h3>
              <p className="text-text-muted leading-relaxed font-light text-sm md:text-base">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
