import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-bg-primary border-t border-border-custom py-8 px-6 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Info Text */}
        <div className="text-sm text-text-secondary text-center md:text-left">
          <p>© {currentYear} Dinesh Abbi. All rights reserved.</p>
          <p className="text-xs text-text-secondary/70 mt-1 font-mono">
            Built with React + Vite · Hosted on Vercel
          </p>
        </div>

        {/* Social Icons Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/dinesh-abbi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-accent-blue-light transition-colors p-2"
            aria-label="GitHub Profile"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://linkedin.com/in/dinesh-abbi" // Standardized link path
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-accent-blue-light transition-colors p-2"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href="mailto:abhidinesh0215@gmail.com"
            className="text-text-secondary hover:text-accent-blue-light transition-colors p-2"
            aria-label="Send Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
