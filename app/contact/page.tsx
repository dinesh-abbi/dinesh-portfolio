"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send message");
      
      toast.success("Message sent. I'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="w-full pt-32 pb-24 px-6 md:px-12 bg-bg-primary min-h-screen flex flex-col items-center">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-5xl"
      >
        <motion.div variants={item} className="mb-16 md:mb-24">
          <h1 className="text-4xl md:text-5xl font-display text-text-primary mb-6 tracking-tight">
            Contact
          </h1>
          <p className="text-text-muted text-lg font-light leading-relaxed max-w-2xl">
            Want to build something? Let's talk.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <motion.div variants={item}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm text-text-primary">Name</label>
                <input
                  {...register("name")}
                  id="name"
                  type="text"
                  className="w-full bg-transparent border-b border-border-custom px-0 py-2 text-text-primary focus:outline-none focus:border-accent-soft transition-colors"
                  placeholder="Your Name"
                />
                {errors.name && <span className="text-red-400 text-xs mt-1">{errors.name.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm text-text-primary">Email</label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  className="w-full bg-transparent border-b border-border-custom px-0 py-2 text-text-primary focus:outline-none focus:border-accent-soft transition-colors"
                  placeholder="you@example.com"
                />
                {errors.email && <span className="text-red-400 text-xs mt-1">{errors.email.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm text-text-primary">Message</label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={4}
                  className="w-full bg-transparent border-b border-border-custom px-0 py-2 text-text-primary focus:outline-none focus:border-accent-soft transition-colors resize-none"
                  placeholder="What's on your mind?"
                />
                {errors.message && <span className="text-red-400 text-xs mt-1">{errors.message.message}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="self-start px-8 py-3 border border-border-custom hover:border-accent-soft text-text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-elevated transition-colors duration-300 rounded-full font-light tracking-wide text-sm flex items-center gap-2"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          <motion.div variants={item} className="flex flex-col gap-8">
            <h2 className="text-xl font-display text-text-primary">Connect</h2>
            <div className="flex flex-col gap-4 text-text-muted font-light">
              <a href="mailto:abhidinesh0215@gmail.com" className="hover:text-text-primary transition-colors hover:underline underline-offset-4 decoration-border-custom">
                abhidinesh0215@gmail.com
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors hover:underline underline-offset-4 decoration-border-custom">
                LinkedIn
              </a>
              <a href="https://github.com/dinesh-abbi" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors hover:underline underline-offset-4 decoration-border-custom">
                GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
