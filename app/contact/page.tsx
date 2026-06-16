"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success("Message sent. I'll get back to you soon.");
      reset();
    } catch {
      toast.error("Something went wrong. Try emailing me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <div className="w-full pt-32 pb-28 px-6 md:px-12 bg-bg-primary min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="mb-14 md:mb-20">
            <p className="text-xs font-mono text-accent-blue tracking-[0.2em] uppercase mb-5">
              Contact
            </p>
            <h1 className="text-4xl md:text-5xl font-display text-text-primary leading-tight">
              Let's build something together.
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
            {/* Form */}
            <motion.form
              variants={item}
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-8"
            >
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-mono text-text-muted uppercase tracking-widest">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  placeholder="Your name"
                  className="w-full bg-transparent border-b border-border-glass pb-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue transition-colors text-sm"
                />
                {errors.name && (
                  <span className="text-red-400 text-xs font-mono">{errors.name.message}</span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-mono text-text-muted uppercase tracking-widest">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="you@example.com"
                  className="w-full bg-transparent border-b border-border-glass pb-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue transition-colors text-sm"
                />
                {errors.email && (
                  <span className="text-red-400 text-xs font-mono">{errors.email.message}</span>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-mono text-text-muted uppercase tracking-widest">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message")}
                  placeholder="What's on your mind?"
                  className="w-full bg-transparent border-b border-border-glass pb-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue transition-colors resize-none text-sm"
                />
                {errors.message && (
                  <span className="text-red-400 text-xs font-mono">{errors.message.message}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="self-start flex items-center gap-2.5 px-7 py-3.5 bg-accent-blue text-white text-sm font-medium rounded-full disabled:opacity-50 hover:bg-blue-400 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={13} />
              </button>
            </motion.form>

            {/* Contact info */}
            <motion.div variants={item} className="flex flex-col gap-8">
              <div>
                <p className="text-xs font-mono text-accent-blue tracking-[0.2em] uppercase mb-6">
                  Direct Contact
                </p>
                <div className="flex flex-col gap-5 text-sm">
                  <a
                    href="mailto:abhidinesh0215@gmail.com"
                    className="flex items-center gap-3 text-text-muted hover:text-text-primary transition-colors group"
                  >
                    <Mail size={15} className="text-text-muted group-hover:text-accent-blue transition-colors shrink-0" />
                    abhidinesh0215@gmail.com
                  </a>
                  <div className="flex items-center gap-3 text-text-muted">
                    <Phone size={15} className="shrink-0" />
                    +91 798 996 8262
                  </div>
                  <div className="flex items-center gap-3 text-text-muted">
                    <MapPin size={15} className="shrink-0" />
                    Hyderabad, India
                  </div>
                </div>
              </div>

              <div className="h-[1px] w-full bg-gradient-to-r from-accent-blue/20 to-transparent" />

              <div>
                <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-5">
                  Find me on
                </p>
                <div className="flex flex-col gap-4">
                  <a
                    href="https://github.com/dinesh-abbi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-text-muted hover:text-text-primary transition-colors text-sm group"
                  >
                    <Github size={15} className="group-hover:text-accent-blue transition-colors" />
                    github.com/dinesh-abbi
                  </a>
                  <a
                    href="https://linkedin.com/in/dinesh-abbi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-text-muted hover:text-text-primary transition-colors text-sm group"
                  >
                    <Linkedin size={15} className="group-hover:text-accent-blue transition-colors" />
                    linkedin.com/in/dinesh-abbi
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
