"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { name: "Work", path: "/#work" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg-primary/70 backdrop-blur-xl border-b border-border-glass py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-2.5">
          <Image
            src="/icon.png"
            alt="DA"
            width={30}
            height={30}
            className="rounded opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </Link>

        <nav className="flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-200 group ${
                  isActive ? "text-text-primary" : "text-text-muted hover:text-text-subtle"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[1px] bg-accent-blue transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-4 py-2 rounded-full border border-border-glass text-text-subtle hover:text-text-primary hover:border-border-blue transition-all duration-300"
          >
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
}
