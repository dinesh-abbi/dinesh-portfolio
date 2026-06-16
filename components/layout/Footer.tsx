import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full py-10 border-t border-border-glass">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-text-muted font-mono">
          © {year} Dinesh Abbi — built with Next.js, hosted on Vercel
        </p>
        <div className="flex items-center gap-5 text-text-muted">
          <a
            href="https://github.com/dinesh-abbi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-blue transition-colors"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com/in/dinesh-abbi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-blue transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:abhidinesh0215@gmail.com"
            className="hover:text-accent-blue transition-colors"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
